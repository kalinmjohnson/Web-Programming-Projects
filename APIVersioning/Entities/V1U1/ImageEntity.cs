using CloudStorage.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CloudStorage.Entities.V1U1
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
            this.Description = imageModel.Description;
        }

        [MinLength(3)]
        public string Name { get; set; }

        public string Id { get; internal set; }

        [Required]
        [MinLength(5)]
        public string Description { get; set; }

        public string UploadUrl { get; internal set; }

        public ImageModel ToModel()
        {
            return new ImageModel()
            {
                Name = this.Name,
                Description = this.Description,
                Id = Guid.NewGuid().ToString(),
            };
        }
    }
}