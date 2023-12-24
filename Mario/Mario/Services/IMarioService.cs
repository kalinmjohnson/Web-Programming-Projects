using System;
using Mario.Entities;

namespace Mario.Services
{
	public interface IMarioService
	{
        public Task<MoveEntity?> ServerRequestAsync(string move); // removed async from method header here

    }
}

