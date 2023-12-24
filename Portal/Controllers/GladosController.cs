using Microsoft.AspNetCore.Mvc;
using Portal.Filters;
using Portal.Services;

namespace Portal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [TypeFilter(typeof(AuthorizationFilter))]
    public class GladosController : Controller
    {
        private readonly IGenerateQuoteService generateQuote;

        public GladosController(IGenerateQuoteService generateQuote)
        {
            this.generateQuote = generateQuote;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Json(generateQuote.getQuote());
        }
    }
}
