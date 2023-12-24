using Amazon;
using Amazon.Runtime;
using Amazon.SQS;
using Amazon.SQS.Model;
using Common;
using Common.Entities;
using Common.Services;
using Newtonsoft.Json;

namespace Worker
{
    internal class Program
    {
        private static BasicAWSCredentials? credentials;
        private static AmazonSQSClient? sqsClient;
        private static IQueueService? queueService;

        async static Task Main(string[] args)
        {
            Console.WriteLine("The Construction process is beginning.  Get ready to go, workers!");

            credentials = new BasicAWSCredentials(Credentials.QueueKeyId, Credentials.QueueKey);
            sqsClient = new AmazonSQSClient(credentials, RegionEndpoint.USEast1);
            queueService = new QueueService();

            await ReadMessagesAsync();
        }


        public async static Task ReadMessagesAsync()
        {
            var request = new ReceiveMessageRequest()
            {
                QueueUrl = Credentials.QueueUrl,
                MaxNumberOfMessages = 10,
                WaitTimeSeconds = 10
            };

            while (true)
            {
                var messages = await sqsClient.ReceiveMessageAsync(request);

                foreach (var message in messages.Messages)
                {
                    Console.WriteLine(message.Body);

                    _ = sqsClient.DeleteMessageAsync(new DeleteMessageRequest()
                    {
                        QueueUrl = Credentials.QueueUrl,
                        ReceiptHandle = message.ReceiptHandle
                    });
                }
            }
        }

    }
}