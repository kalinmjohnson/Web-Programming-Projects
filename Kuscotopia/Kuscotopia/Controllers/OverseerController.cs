using System.Net;
using Common.Services;
using Kuscotopia.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Kuscotopia.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OverseerController : Controller
    {
        private readonly IQueueService queueService;

        public OverseerController(IQueueService queueService)
        {
            this.queueService = queueService;
        }


        [HttpPost]
        public async Task<JsonResult> PostAsync([FromBody] Input input)
        {
            await this.queueService.QueueWorkAsync(input.WorkCount);

            return Json(HttpStatusCode.Created);

        }

         
    }
}