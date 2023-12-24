// If-Match - Assignment 9
const serverUrl = "https://localhost:7073/api/Gargoyles";
var eTag;
var star;

// Listing out all the buttons and their methods
window.onload = () => {
	document.getElementById("getAllButton").onclick = getAll;
	document.getElementById("getButton").onclick = get;
	document.getElementById("postButton").onclick = post;
	document.getElementById("putButton").onclick = put;
	document.getElementById("patchButton").onclick = patch;
	document.getElementById("starButton").onclick = setStar;
}

// All the response buttons for updating the results areas
const simpleResponse = (responseJson) => {
	document.getElementById("results").innerHTML = JSON.stringify(responseJson);
}

const otherResponse = (response) => {
	document.getElementById("results").innerHTML = response;
}

const etagResponse = (response) => {
	document.getElementById("etag").innerHTML = response;
}

const setStar = () => {
	star = true;
}

// The method that pulls all the data from the server
const getAll = () => {
	fetch(serverUrl).then(response => {
		return response.json();
	}).then(responseJson => {
		simpleResponse(responseJson);
	});
}

// The method that pulls all the data from the server
const get = () => {
	let name = document.getElementById("name").value;
	if (name != "") {
		otherResponse("");
		fetch(serverUrl + "/" + name,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"If-Match": eTag,
				}
			}).then(response => {
				if (response.status == 200) {
					eTag = response.headers.get('ETag').toString();
					etagResponse(response.headers.get('ETag'));
				} else if (response.status == 304) {
					return response;
				}
				return response.json();

			}).then(responseJson => {
				if (responseJson.status == 400) { 
					otherResponse("Error Message: " + JSON.stringify(responseJson.errors));
				} else if (responseJson.status == 404) {
					otherResponse("That is not a name in the Gargoyle Database.  Status Code: " + responseJson.status);
				} else if (responseJson.status == 304) {
					otherResponse("The ETag has not been modified since the last GET.  Status Code: " + responseJson.status);
				} else {
					simpleResponse(responseJson);
				}
		});
	} else {
		otherResponse("Please put a value in for Name");
		etagResponse("");
	}
	
}

// This method posts a new gargoyle to the database assuming it meets the criteria
const post = () => {
	fetch(serverUrl,
		{
			method: "POST",
			body: JSON.stringify({
				Name: document.getElementById("name").value,
				Color: document.getElementById("color").value,
				Size: document.getElementById("size").value,
				Gender: document.getElementById("gender").value,
			}),
			headers: {
				"Content-Type": "application/json",
			}
		}
	).then(response => {
		return response.json();
	}).then(responseJson => {
		if (responseJson.status == 400) {
			otherResponse("Error Message: " + JSON.stringify(responseJson.errors));
		} else if (responseJson.status == 403) {
			otherResponse("That gargoyle already exists.  Please enter a different name.  Status Code: " + responseJson.status);
		} else {
			simpleResponse(responseJson);
		}
	});
}

const put = () => {
	if (eTag != null || etag != "") {
		var name = document.getElementById("name").value;
		if (name != "") {
			fetch(serverUrl,
				{
					method: "PUT",
					body: JSON.stringify({
						Name: document.getElementById("name").value,
						Color: document.getElementById("color").value,
						Size: document.getElementById("size").value,
						Gender: document.getElementById("gender").value,
					}),
					headers: {
						"Content-Type": "application/json",
						"If-Match": eTag,
					}
				}
			).then(response => {
				return response.json();
			}).then(responseJson => {
				if (responseJson.status == 400) {
					otherResponse("Error Message: " + JSON.stringify(responseJson.errors));
				} else if (responseJson.status == 412) {
					otherResponse("The E-Tag does not match to the most recent version in the database.  Please GET again.  Status Code: " + responseJson.status);
				} else {
					simpleResponse(responseJson);
				}
			});
		} else {
			otherResponse("You must enter a name first.");
		} 
		
	} else {
		otherResponse("You must GET first to get an E-Tag");
	}
}

// This method changes the values of the named gargoyle if they are inputed
const patch = () => {
	if (eTag != null || etag != "" || star == true) {
		var name = document.getElementById("name").value;
		if (name != "") {
			var bodyString = '{ "name":"' + name + '"';
			if (document.getElementById("color").value != "") {
				bodyString += ' , "Color":"' + document.getElementById("color").value  + '"';
			}
			if (document.getElementById("size").value != "") {
				bodyString += ' , "Size":"' + document.getElementById("size").value + '"';
			}
			if (document.getElementById("gender").value != "") {
				bodyString += ' , "Gender":"' + document.getElementById("gender").value + '"';
			}

			bodyString += ' }';
			var bodyJson = JSON.parse(bodyString);

			var finalETag;
			if (star) {
				finalETag = "*";
				star = false;
			} else {
				finalETag = eTag;
			}

			fetch(serverUrl,
				{
					method: "PATCH",
					body: JSON.stringify(bodyJson),
					headers: {
						"Content-Type": "application/json",
						"If-Match": finalETag,
					}
				}
			).then(response => {
				return response.json();
			}).then(responseJson => {
				if (responseJson.status == 400) {
					otherResponse("Error Message: " + JSON.stringify(responseJson.errors));
				} else if (responseJson.status == 412) {
					otherResponse("The E-Tag does not match to the most recent version in the database.  Please GET again.  Status Code: " + responseJson.status);
				} else {
					simpleResponse(responseJson);
				}
			});
		} else {
			otherResponse("You must enter a name first.");
		}

	} else {
		otherResponse("You must GET first to get an E-Tag");
	}
}