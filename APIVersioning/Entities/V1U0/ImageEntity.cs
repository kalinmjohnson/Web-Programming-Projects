using CloudStorage.Models;
using System.ComponentModel.DataAnnotations;

namespace CloudStorage.Entities.V1U0
{
    public class ImageEntity
    {
        public ImageEntity()
        {

        }

        public ImageEntity(ImageModel imageModel)
        {
            this.Name = imageModel.Name;
            this.Id = imageModel.Id;
        }

        [MinLength(3)]
        public string Name { get; set; }

        public string Id { get; internal set; }

        public string UploadUrl { get; internal set; }

        public ImageModel ToModel()
        {
            return new ImageModel()
            {
                Name = this.Name,
                Id = Guid.NewGuid().ToString()
            };
        }
    }
}