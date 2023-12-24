using Gargoyles.Entities;
using Gargoyles.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Gargoyles
{
    public class GargoyleDatabase
    {
        private Dictionary<string, GargoyleModel> gargoyles = new();

        public GargoyleDatabase()
        {
            AddOrReplace(new GargoyleEntity("Bob", "blue", "large", "male").ToModel());
            AddOrReplace(new GargoyleEntity("Cathy", "purple", "small", "female").ToModel());
            AddOrReplace(new GargoyleEntity("Trent", "dark greeeeeen", "medium", "male").ToModel());
        }

        public GargoyleModel Get(string? name)
        {
            // note, i'm not doing null checking here, you should do that probably in your assignment.
            // I have added it in, but not sure if the right exception is thrown
            if (name == null)
            {
                throw new ArgumentNullException("The name is null. This is not allowed.");
            }

            return gargoyles[name];

        }

        public bool InDictionary(string? name)
        {
            return gargoyles.ContainsKey(name);
        }
        
        public Dictionary<string, GargoyleEntity> GetAll()
        {
            var allGargoyles = new Dictionary<string, GargoyleEntity>();
            foreach (KeyValuePair<string, GargoyleModel> gargoyle in gargoyles)
            {
                allGargoyles.Add(gargoyle.Key, new GargoyleEntity(gargoyle.Value));
            }
            return allGargoyles;
        }
        
        public void AddOrReplace(GargoyleModel model)
        {
            if (model?.Name == null)
            {
                return;
            }
            model.Updated = DateTime.UtcNow;
            this.gargoyles[model.Name] = model;
        }

        public bool Add(GargoyleModel model)
        {
            if (model?.Name == null)
            {
                return false;
            }
            model.Updated = DateTime.UtcNow;
            return gargoyles.TryAdd(model.Name, model);
        }
        
    }
}
