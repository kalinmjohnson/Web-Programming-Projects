using System;
using Mario.Entities;
using Mario.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Mario.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MarioLevelController : Controller
	{
        private readonly IMarioService marioService;

        public MarioLevelController(IMarioService marioService)
		{
			this.marioService = marioService;

        }

        [HttpGet("{move}")]
        public async Task<IActionResult> GetAsync(string move)
        {

            Console.WriteLine(move);
            if (move.Equals("walk") || move.Equals("jump") || move.Equals("wait") || move.Equals("run"))
            {
                MessageEntity returnMessage;                
                try
                {
                    returnMessage = new MessageEntity(await marioService.ServerRequestAsync(move));
                } catch 
                {
                    returnMessage = new MessageEntity("Mario is dead", true);
                }

                return Json(returnMessage); 
            } else
            {
                return Json("Bad move! Please try again: " + move);
            }
        }

    }
}

