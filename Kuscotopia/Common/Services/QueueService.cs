using Amazon;
using Amazon.Runtime;
using Amazon.SQS;
using Amazon.SQS.Model;
using Newtonsoft.Json;
using Common.Entities;
using System.Net.Http.Headers;

namespace Common.Services
{
    public class QueueService : IQueueService
    {
        private static BasicAWSCredentials? credentials;
        private static AmazonSQSClient? sqsClient;

        public QueueService()
        {
            credentials = new BasicAWSCredentials(Credentials.QueueKeyId, Credentials.QueueKey);
            sqsClient = new AmazonSQSClient(credentials, RegionEndpoint.USEast1);
        }

        public async Task QueueWorkAsync(int workCount)
        {
            for (var i = 0; i < workCount; i++)
            {

                // Select the type of the request and set the values of message and data
                string type;
                string message;
                string? data;

                Random rnd = new Random();
                int randNumType = rnd.Next(1, 4); // make a random number between 1 and 3
                int randNumMessage = rnd.Next(1, 4); // make a random number between 1 and 3

                if (randNumType == 1)
                {
                    type = "Carry";
                    if (randNumMessage == 1)
                    {
                        message = "This peasant is carrying a giant blue slab of granite.";
                    }
                    else if (randNumMessage == 2)
                    {
                        message = "This peasant is carrying a tiny piece of slimy green clay.";
                    }
                    else
                    {
                        message = "This peasant is carrying a medium sized barrell of tar.";
                    }
                    data = null;
                }
                else if (randNumType == 2)
                {
                    type = "Build";
                    if (randNumMessage == 1)
                    {
                        message = "This builder is building a spiral yellow tower.";
                    }
                    else if (randNumMessage == 2)
                    {
                        message = "This builder is building a gigantic elephant statue.";
                    }
                    else
                    {
                        message = "This builder is building a yellow brick road that stretches on for miles.";
                    }
                    data = rnd.Next(1, 6).ToString();
                }
                else
                {
                    type = "Survey";
                    if (randNumMessage == 1)
                    {
                        message = "Lookin strong there, peasant.";
                    }
                    else if (randNumMessage == 2)
                    {
                        message = "Your hair is fabulous, peasant.";
                    }
                    else
                    {
                        message = "Keep up the stellar work, lowly worker.";
                    }
                    data = rnd.Next(500, 1001).ToString();
                }

                await QueueBuildWorkAsync(type, message, data);
            }
            
        }

        public async Task QueueBuildWorkAsync(string type, string message, string data)
        {
           
                // Make the message for the request
                var messageJson = new StringContent(JsonConvert.SerializeObject(new MessageEntity()
                {
                    Type = type,
                    Message = message,
                    Data = data,
                }), new MediaTypeHeaderValue("application/json"));
                string requestMessage = await messageJson.ReadAsStringAsync();


                // Make the request
                var sendMessageRequest = new SendMessageRequest()
                {
                    QueueUrl = Credentials.QueueUrl,
                    MessageBody = requestMessage,
                };

                // Send the request
                await sqsClient.SendMessageAsync(sendMessageRequest);
        }
    }
}