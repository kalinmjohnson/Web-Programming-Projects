using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using Portal.Services;

namespace Portal.Filters
{
    public class AuthorizationFilter : IAuthorizationFilter
    {
        private readonly ISecurityProvider securityProvider;

        public AuthorizationFilter(ISecurityProvider securityProvider) {
            this.securityProvider = securityProvider;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue("Authorization", out StringValues authorizationHeader))
            {
                // if here, we didn't get an authorization header, return 401
                context.Result = new StatusCodeResult((int)HttpStatusCode.Unauthorized);
                return;
            }

            var authorization = authorizationHeader.ToString();

            if (!authorization.StartsWith("Bearer ")) {
                // if here, the format of the header was incorrect, return 401
                context.Result = new StatusCodeResult((int)HttpStatusCode.Unauthorized);
                return;
            }

            // this is substring, strip off the Bearer
            authorization = authorization[7..];

            if (!this.securityProvider.ValidateToken(authorization)) {
                // the token is not valid, return 401
                context.Result = new StatusCodeResult((int)HttpStatusCode.Unauthorized);
                return;
            }

            // if we get here, the user is authorized
        }
    }
}
