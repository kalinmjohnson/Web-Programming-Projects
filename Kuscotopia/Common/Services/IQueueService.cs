using System;
using Common.Entities;

namespace Common.Services
{
	public interface IQueueService
	{
        public Task QueueWorkAsync(int workCount);

        public Task QueueBuildWorkAsync(string type, string message, string data);

    }
}

