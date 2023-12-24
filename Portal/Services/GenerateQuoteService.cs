using System;
namespace Portal.Services
{
	public class GenerateQuoteService : IGenerateQuoteService
	{
		public GenerateQuoteService()
		{
		}

		public string getQuote()
		{
            Random rnd = new Random();
            var randNum = rnd.Next(1, 9);
            Console.WriteLine("Here Service");
            if (randNum == 1)
			{
				return "Fantastic! You remained resolute and resourceful in an atmosphere of extreme pessimism.";
			} else if (randNum == 2)
			{
				return "Now that you are in control of both portals, this next test could take a very, VERY, long time.";
            }
            else if (randNum == 3)
            {
                return "That thing is probably some kind of raw sewage container. Go ahead and rub your face all over it.";
            }
            else if (randNum == 4)
            {
                return "You euthanized your faithful Companion Cube more quickly than any test subject on record. Congratulations.";
            }
            else if (randNum == 5)
            {
                return "Stop squirming and die like an adult or Im going to delete your backup.";
            }
            else if (randNum == 6)
            {
                return "All your other friends couldnt come either because you dont have any other friends. Because of how unlikable you are.";
            }
            else if (randNum == 7)
            {
                return "I sincerely hope you werent expecting a response. Because Im not talking to you.";
            } else
            {
                return "Uh oh. Somebody cut the cake. I told them to wait for you, but they did it anyway. There is still some left, though, if you hurry back.";
            }
		}
	}
}

