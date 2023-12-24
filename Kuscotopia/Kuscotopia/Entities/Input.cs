using System;
using System.ComponentModel.DataAnnotations;

namespace Kuscotopia.Entities
{
    public class Input
    {
        public Input()
        {

        }

        [Required]
        [Range(1, 10)]
        public int WorkCount { get; set; }
    }
}

