using Portal.Entities;
using Portal.Models;

namespace Portal
{
	public class UserDatabase
	{
        private Dictionary<string, UserModel> users = new();

        public UserDatabase()
		{
            Add(new UserEntity("glados", "cake").ToModel());
            Add(new UserEntity("Doug", "ratman").ToModel());
            Add(new UserEntity("Turrets", "sentry").ToModel());
            Add(new UserEntity("Caroline", "assistant").ToModel());
        }

        public void Add(UserModel model)
        {
            if (model?.Username == null)
            {
                return;
            }

            this.users[model.Username] = model;

        }

        public bool inDatabase(UserModel model)
        {
            foreach (var item in users.Values)
            {
                if (item.Username == model.Username) {
                    return true;
                }
            }
            return false;
        }

        public bool validatePassword(UserModel model)
        {
            if (users[model.Username].Password == model.Password)
            {
                return true;
            } else
            {
                return false;
            }
        }
    }
}

