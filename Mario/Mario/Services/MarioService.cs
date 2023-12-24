using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Mario.Entities;
using Newtonsoft.Json;
using Polly;

namespace Mario.Services
{
	public class MarioService : IMarioService
	{

		private string url = "https://webprogrammingmario.azurewebsites.net/api/mario/";
        private readonly HttpClient httpClient = new();

        public MarioService()
		{
		}

		public async Task<MoveEntity?> ServerRequestAsync(string move)
		{
			string requestURL = url + move;
			string? responseString = null;
            Random rnd = new Random();

            var policy = Policy.HandleInner<HttpRequestException>((ex) =>
            {
                return ex?.StatusCode == HttpStatusCode.ServiceUnavailable;
            }).WaitAndRetryAsync(10, retryAttempt =>
                TimeSpan.FromMilliseconds(100 * Math.Pow(2, retryAttempt) + rnd.Next(-100, 100))
                , (ex, timeSpan, context) =>
                {
                    Debug.WriteLine("Trying Again: " + ex.Message);
                }
            );


            await policy.ExecuteAsync(async () =>
            {
                var response = await httpClient.GetAsync(requestURL);
                response.EnsureSuccessStatusCode();
                responseString = await response.Content.ReadAsStringAsync();

            });

            if (responseString == null)
            {
                return null;
            }

            return JsonConvert.DeserializeObject<MoveEntity?>(responseString);
        }
	}
}

