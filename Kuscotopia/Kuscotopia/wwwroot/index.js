//const serverUrl = "https://localhost:7023/api/Kuscotopia";
const serverUrl = "https://localhost:7023/api/Overseer";

window.onload = () => {
	document.getElementById("startButton").onclick = start;
}

const responseResult = (response) => {
	document.getElementById("result2").innerHTML = "The return status code is: " + response;
}

const simpleResponse = (responseJson) => {
	document.getElementById("result2").innerHTML = "The return status code is: " + JSON.stringify(responseJson.status) + ". The error is: " + JSON.stringify(responseJson.errors.WorkCount);
}


const start = () => {
	var number = parseInt(document.getElementById("number").value);

	if (!isNaN(number)) {
		document.getElementById("result").innerHTML = "The number you put in was: " + document.getElementById("number").value;
		fetch(serverUrl,
			{
				method: "POST",
				body: JSON.stringify({
					WorkCount: number,
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(response => {
			return response.json();
		}).then(responseJson => {
			if (JSON.stringify(responseJson) == 201) {
				responseResult(JSON.stringify(responseJson));
			} else {
				simpleResponse(responseJson);
			}
		});
	}
	else
	{
		document.getElementById("result").innerHTML = "You put other characters into the input";
		document.getElementById("result2").innerHTML = "The input has to be an integer between 1 and 10.";
	}
}

