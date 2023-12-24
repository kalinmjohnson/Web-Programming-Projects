using Microsoft.AspNetCore.Mvc;
using System.Net;
using CloudStorage.Services;
using CloudStorage.Entities.V1U0;
using Asp.Versioning;

namespace CloudStorage.Controllers.V1U0
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class ImagesController : Controller
    {
        private readonly IImageTableStorage imageTableStorage;

        public ImagesController(IImageTableStorage imageTableStorage)
        {
            this.imageTableStorage = imageTableStorage;
        }

        [HttpGet]
        public IAsyncEnumerable<ImageEntity> GetAsync()
        {
            return imageTableStorage.GetAllImagesAsync().Select(image => new ImageEntity(image));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(string id)
        {
            var imageModel = await this.imageTableStorage.GetAsync(id);

            // check to make sure imageModel is not null
            // if it is null (i.e. it doesn't exist), return not found

            if (imageModel == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound);
            }

            // set Cache-Control header here, it is in seconds; should be cached for seven hours
            // Make sure the format of the header is correct. There is more to the header's value than just an int.
            Response.Headers["Cache-Control"] = "public,max-age=" + 25200;

            // return actual download url in the Location header
            Response.Headers["Location"] = imageTableStorage.GetDownloadUrl(imageModel);

            // OK is not the correct status code here. Update it.
            return StatusCode((int)HttpStatusCode.TemporaryRedirect);
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] ImageEntity imageEntity)
        {
            // Convert the image entity into an image model, then add it into the database.
            // Remember to set the username property on the image model before it is added.

            var imageModel = imageEntity.ToModel();
            imageModel.UserName = "kalinjohnson";
            await imageTableStorage.AddOrUpdateAsync(imageModel);

            // Return a new image entity to the client. Set the uploadUrl first so they can start the image upload.
            // Be careful here to return a new image entity based on the image model that you created, and not the image entity that was sent to your controller.

            var imageEntityReturn = new ImageEntity(imageModel);
            imageEntityReturn.UploadUrl = imageTableStorage.GetUploadUrl(imageEntityReturn.Id);
            return Json(imageEntityReturn);
        }

        [HttpPut("{id}/uploadComplete")]
        public async Task<IActionResult> UploadCompleteAsync(string id)
        {
            // Get the image model from the database by its id.

            var imageModel = await this.imageTableStorage.GetAsync(id);

            // check to make sure image model is not null
            // if it is null (i.e. it doesn't exist), return a NotFound status code

            if (imageModel == null)
            {
                return StatusCode((int)HttpStatusCode.NotFound);
            }

            // Set UploadComplete to true on the imageModel and then save it.
            imageModel.UploadComplete = true;
            await imageTableStorage.AddOrUpdateAsync(imageModel);

            // Convert the image model into an ImageEntity and return it as JSON.
            return Json(new ImageEntity(imageModel));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await this.imageTableStorage.DeleteAsync(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }

        [HttpDelete]
        public async Task<IActionResult> PurgeAsync()
        {
            await this.imageTableStorage.PurgeAsync();
            return StatusCode((int)HttpStatusCode.NoContent);
        }
    }
}