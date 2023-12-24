const serverUrl = "https://localhost:7212/api/MarioLevel/"; // Change when different local port!!
var gameInProgress = false;

// TODO: Add in reponse strings when I know them
// TODO: Debug movement part

// Listing out the button and its method - The Start Button
window.onload = () => {
	document.getElementById("startButton").onclick = start;
}

const startGame = () => {
	gameInProgress = true;
	document.getElementById("startButton").disabled = true;
	document.getElementById("startButton").style.backgroundColor = 'rgb(203, 76, 78)';
}

const endGame = () => {
	console.log("Here");
	gameInProgress = false;
	document.getElementById("startButton").disabled = false;
	document.getElementById("startButton").style.backgroundColor = 'rgb(229, 37, 33)';

	// Move Mario back to beginning
	const mario = document.querySelector('#mario');
	mario.style.left = "5%";
	mario.style.bottom = "25%";
}

function fetchNow() {

	var moveNum = Math.floor(Math.random() * 4);
	var move;

	// Random number between 0 and 3
	// 0: walk, 1: jump, 2: wait, 3: run

	if (moveNum == 0) {
		move = "walk";
	} else if (moveNum == 1) {
		move = "jump";
	} else if (moveNum == 2) {
		move = "wait";
	} else if (moveNum == 3) {
		move = "run";
	}


	fetch(serverUrl + move).then(response => {
		return response.json();
	}).then(responseJson => {

		var response = JSON.stringify(responseJson.message);
		var isHeDead = JSON.stringify(responseJson.isHeDead);
		document.getElementById("server").innerHTML = response;

		console.log(response);
		console.log(isHeDead);

		if (isHeDead == "true") {
			endGame();
		} else {
			console.log("Continue");
			const mario = document.querySelector('#mario');
			var leftVal = parseInt(mario.style.left, 10);


			if (moveNum == 0) {
				mario.style.left = leftVal + 5 + "%";
			} else if (moveNum == 1) {
				
				setTimeout(function () {
					mario.classList.toggle('jump');
				}, 1000);
				mario.style.left = leftVal + 5 + "%";
				mario.classList.toggle('jump');
			} else if (moveNum == 3) {
				mario.style.left = leftVal + 10 + "%";
			}

			if (leftVal >= 95) {
				document.getElementById("server").innerHTML = "Mario has won the game!";
				endGame();
			}

		}

		if (gameInProgress) {
			fetchNow();
		}

	});
}

const start = () => {
	// Move Mario back to beginning
	const mario = document.querySelector('#mario');
	mario.style.left = "5%";

	startGame();

	fetchNow();
	
}

