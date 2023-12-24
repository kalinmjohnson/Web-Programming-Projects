using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Gargoyles.Models;

namespace Gargoyles.Entities
{
    public class GargoyleEntity
    {
        public GargoyleEntity() { 
        
        }

        public GargoyleEntity(GargoyleModel model)
        {
            this.Name = model.Name;
            this.Color = model.Color;
            this.Size = model.Size;
            this.Gender = model.Gender;
        }

        public GargoyleEntity(string Name, string Color, string Size, string Gender)
        {
            this.Name = Name;
            this.Color = Color;
            this.Size = Size;
            this.Gender = Gender;
        }

        [Required]
        [MinLength(3)]
        public string? Name { get; set; }

        [MinLength(3)]
        public string? Color { get; set; }

        [MinLength(3)]
        public string? Size { get; set; }

        [MinLength(3)]
        public string? Gender { get; set; }

        public GargoyleModel ToModel()
        {
            return new GargoyleModel
            {
                Name = this.Name,
                Color = this.Color,
                Size = this.Size,
                Gender = this.Gender,
            };
        }
    }
}
