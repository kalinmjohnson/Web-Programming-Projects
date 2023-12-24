using Gargoyles.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using System.Net;

namespace Gargoyles.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class GargoylesController : Controller
    {
        private readonly GargoyleDatabase gargoyleDatabase;

        public GargoylesController(GargoyleDatabase gargoyleDatabase)
        {
            this.gargoyleDatabase = gargoyleDatabase;
        }

        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            
            var exists = this.gargoyleDatabase.InDictionary(name);
            if (!exists)
            {
                return NotFound();
            }
            
            var gargoleModel = this.gargoyleDatabase.Get(name);
            if (gargoleModel == null)
            {
                return NotFound();
            }

            if (gargoleModel != null)
            {
                if (Request.Headers.TryGetValue("if-match", out StringValues ifMatch))
                {
                    if (gargoleModel.ETag() == ifMatch)
                    {
                        return StatusCode((int)HttpStatusCode.NotModified);
                    }
                }
                
            }

            Response.Headers["ETag"] = gargoleModel.ETag();

            return Json(new GargoyleEntity(gargoleModel));
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Json(gargoyleDatabase.GetAll());
        }

        [HttpPost]
        public IActionResult Post([FromBody] GargoyleEntity entity)
        {
            var added = this.gargoyleDatabase.Add(entity.ToModel());

            if (added)
            {
                return Json(entity);
            } else
            {
                return StatusCode((int)HttpStatusCode.Forbidden);
            }
            
        }

        [HttpPut]
        public IActionResult Put([FromBody] GargoyleEntity entity)
        {
            var gargoleModel = this.gargoyleDatabase.Get(entity.Name);

            if (gargoleModel != null)
            {
                if (Request.Headers.TryGetValue("if-match", out StringValues ifMatch)) {
                    if (gargoleModel.ETag() != ifMatch && ifMatch != "*")
                    {
                        return StatusCode((int)HttpStatusCode.PreconditionFailed);
                    }
                }
                else
                {
                    return StatusCode((int) HttpStatusCode.PreconditionFailed);
                }
            }

            gargoleModel = entity.ToModel();
            this.gargoyleDatabase.AddOrReplace(entity.ToModel());

            return Json(new GargoyleEntity(gargoleModel));
        }

        [HttpPatch]
        public IActionResult Patch([FromBody] GargoyleEntity entity)
        {
            var gargoleModel = this.gargoyleDatabase.Get(entity.Name);

            if (gargoleModel != null)
            {
                if (Request.Headers.TryGetValue("if-match", out StringValues ifMatch))
                {
                    if (gargoleModel.ETag() != ifMatch && ifMatch != "*")
                    {
                        return StatusCode((int)HttpStatusCode.PreconditionFailed);
                    }
                }
                else
                {
                    return StatusCode((int)HttpStatusCode.PreconditionFailed);
                }
            }

            // This is where if changes and the if statements will live
            // The name doesn't change, only the other three attributes change
            if (String.IsNullOrWhiteSpace(entity.Color))
            {
                entity.Color = gargoleModel.Color;
            }
            if (String.IsNullOrWhiteSpace(entity.Size))
            {
                entity.Size = gargoleModel.Size;
            }
            if (String.IsNullOrWhiteSpace(entity.Gender))
            {
                entity.Gender = gargoleModel.Gender;
            }

            gargoleModel = entity.ToModel();
            this.gargoyleDatabase.AddOrReplace(gargoleModel);

            return Json(new GargoyleEntity(gargoleModel));                
        }
    }
}
