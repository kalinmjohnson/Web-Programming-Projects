// Web Requests - Project 2
// This file contains all the javascript for project two, which mainly revovles aroudn teh functionality of the buttons and text fields corresponding with the server

const serverUrl = "https://localhost:7022/api/WebAPI";

// Listing out all the buttons and their methods
window.onload = () => {
	document.getElementById("PullButton").onclick = pull;
	document.getElementById("PushButton").onclick = push;
	document.getElementById("ReadButton").onclick = read;
	document.getElementById("DeleteButton").onclick = deletee;
	document.getElementById("InsightButton").onclick = insight;
	document.getElementById("WatchButton").onclick = watch;
}

// All the response buttons for updating the results areas
const simpleResponse = (responseJson) => {
	document.getElementById("results1").innerHTML = JSON.stringify(responseJson);
}

const readResponse = (responseJson, index) => {
	document.getElementById("results1").innerHTML = "Index: ".concat(index.toString(), "  ", JSON.stringify(responseJson));
}

const viewResponse = (responseJson) => {
	document.getElementById("results2").innerHTML = "View Information:   ".concat(JSON.stringify(responseJson));
}

const simpleResponse2 = (responseJson) => {
	document.getElementById("results2").innerHTML = JSON.stringify(responseJson);
}


// The method that pulls all the data from the server
const pull = () => {
	fetch(serverUrl).then(response => {
		return response.json();
	}).then(responseJson => {
		simpleResponse(responseJson);
	});
}

// The method that takes the data from the input fields and posts it to the server
// Then it displays the response from the server in the results area corresponding to the form it is in
// There are three input fields
const push = () => {
	fetch(serverUrl,
		{
			method: "POST",
			body: JSON.stringify({
				FirstName: document.getElementById("firstName").value,
				LastName: document.getElementById("lastName").value,
				FavoriteCharacter: document.getElementById("favSWCharacter").value
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}
	).then(response => {
		return response.json();
	}).then(responseJson => {
		simpleResponse(responseJson);
	});
}

// Great a random index from data on the server and display the information from that index
const read = () => {
	fetch(serverUrl).then(response => {
		return response.json();
	}).then(responseJson => {
		// Max is the total number of entries on the server
		let max = Object.keys(responseJson.favoriteCharacters).length.toString();
		// Index is a random number choosen between 0 and max
		let index = Math.floor(Math.random() * max);

		fetch(serverUrl.concat("/", index.toString())).then(response => {
			return response.json();
		}).then(responseJson => {
			readResponse(responseJson, index);
		});

	});
}

// This method deletes element displayed if FORCE READ was the last thing done in form 1
// If not, it deletes a random element from the sever
// I added an extra e to the word because I can't use the word delete
const deletee = () => {
	let readResult = document.getElementById("results1").innerHTML;
	// results1 will start with I for INDEX if FORCE READ was teh last thing done
	if (readResult[0] == "I") {
		// Find the index then call delete
		let index = readResult.match(/\d+/g);
		fetch(serverUrl.concat("/", index[0].toString()), {
			method: "DELETE"
		}).then(response => {
			fetch(serverUrl).then(response => {
				return response.json();
			}).then(responseJson => {
				readResponse(responseJson, index[0]);
			});
		});
	} else {
		// Else, I need to get the total number of things on the server
		fetch(serverUrl).then(response => {
			return response.json();
		}).then(responseJson => {
			// Then calcualte a random index
			let max = Object.keys(responseJson.favoriteCharacters).length.toString();
			let index = Math.floor(Math.random() * max);
			// Finally delete the item at that index
			fetch(serverUrl.concat("/", index.toString()), {
				method: "DELETE"
			}).then(response => {
				fetch(serverUrl).then(response => {
					return response.json();
				}).then(responseJson => {
					readResponse(responseJson, index);
				});
			});
		});
	}

}

// This method tells the user to force read first then it returns the view information about the most recent FORCE READ item
const insight = () => {
	let readResult = document.getElementById("results1").innerHTML;
	//document.getElementById("results2").innerHTML = readResult[0].toString();
	if (readResult[0] != "I") {
		document.getElementById("results2").innerHTML = "Not FORCE READ yet, you have";
	} else {
		// Get the index then request a response from that index and views
		let index = readResult.match(/\d+/g);
		fetch(serverUrl.concat("/", index[0].toString(), "/views")).then(response => {
			return response.json();
		}).then(responseJson => {
			viewResponse(responseJson);
		});
	}
}

// This method tells you to force read first, then it will post a user input to the view information for the most recent FORCE READ
const watch = () => {
	let readResult = document.getElementById("results1").innerHTML;
	if (readResult[0] != "I") {
		document.getElementById("results2").innerHTML = "Not FORCE READ yet, you have";
	} else {
		// This gets the index we are posting to, then it posts to that index
		let index = readResult.match(/\d+/g);
		fetch(serverUrl.concat("/", index[0].toString(), "/views"),
			{
				method: "POST",
				body: JSON.stringify({
					ViewDate: document.getElementById("viewDate").value,
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}
		).then(response => {
			return response.json();
		}).then(responseJson => {
			simpleResponse2(responseJson);
		});
	}
}