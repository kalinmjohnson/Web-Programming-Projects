using Microsoft.AspNetCore.Mvc;
using Portal.Entities;
using Portal.Services;
using System.Net;
using System.Security.Claims;
using Microsoft.Extensions.Primitives;

namespace Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        private readonly ISecurityProvider securityProvider;
        private readonly UserDatabase userDatabase;


        public LoginController(ISecurityProvider securityProvider, UserDatabase userDatabase) {
            this.securityProvider = securityProvider;
            this.userDatabase = userDatabase;
        }

        // This will be POST in your assignment
        [HttpPost]
        public IActionResult Login(UserEntity userEntity)
        {

            if (!userDatabase.inDatabase(userEntity.ToModel()))
            {
                return StatusCode((int)HttpStatusCode.NotFound);
            }

            if (!userDatabase.validatePassword(userEntity.ToModel()))
            {
                return StatusCode((int)HttpStatusCode.Forbidden);
            }

            var claims = new List<Claim>() { new Claim("username", userEntity.Username) };

            var token = this.securityProvider.GetToken(claims);

            return new ContentResult()
            {
                Content = token,
            };
        }
    }
}
