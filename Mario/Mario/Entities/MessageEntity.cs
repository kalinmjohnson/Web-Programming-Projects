using System;
using Mario.Models;

// This is to go to the javascript from my server
namespace Mario.Entities
{
	public class MessageEntity
	{
        public String? message { get; set; }
        public Boolean? isHeDead { get; set; }

        public MessageEntity()
		{
		}

        public MessageEntity(MoveEntity move)
        {
            this.message = move.Message;
            this.isHeDead = false;
        }

        public MessageEntity(String message, Boolean isHeDead)
        {
            this.message = message;
            this.isHeDead = isHeDead;
        }

        public MessageModel toModel()
        {
            return new MessageModel()
            {
                message = message,
                isHeDead = isHeDead,
            };
        }
    }
}

