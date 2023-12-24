using System;
using Mario.Models;

// This is to go from my server to the external server
namespace Mario.Entities
{
	public class MoveEntity
	{
		public String? Message { get; set; }

        public String? NextStep { get; set; }

        public MoveEntity()
		{
		}

        public MoveEntity(MoveModel model)
        {
			this.Message = model.Message;
        }

		public MoveModel toModel()
		{
            return new MoveModel()
            {
                Message = Message,
            };
        }
    }
}

