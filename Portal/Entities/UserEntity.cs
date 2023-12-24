using System;
using System.Reflection;
using Portal.Models;

namespace Portal.Entities
{
	public class UserEntity
	{
		public UserEntity()
		{
		}

        public UserEntity(UserModel model)
        {
            this.Username = model.Username;
            this.Password = model.Password;
        }

        public UserEntity(string username, string password)
        {
            this.Username = username;
            this.Password = password;
        }

        public string? Username { get; set; }

        public string? Password { get; set; }

        public UserModel ToModel()
        {
            return new UserModel
            {
                Username = this.Username,
                Password = this.Password
            };
        }
    }
}

