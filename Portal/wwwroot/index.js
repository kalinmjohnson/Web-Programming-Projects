const serverUrl = "https://localhost:7190";
var successfulLogin = false;
var successfulQuote = false;

window.onload = () => {
	document.getElementById("loginButton").onclick = login;
	document.getElementById("logoutButton").onclick = logout;
	document.getElementById("quoteButton").onclick = quote;
}

const simpleResponseString = (response) => {
	document.getElementById("result").innerHTML = response;
}

const simpleResponseJson = (responseJson) => {
	document.getElementById("result").innerHTML = JSON.stringify(responseJson);
}

const loginStatus = (logStatus) => {
	document.getElementById("status").innerHTML = logStatus;
}


const login = () => {
	fetch(serverUrl + "/api/Login",
		{
			method: "POST",
			body: JSON.stringify({
				Username: document.getElementById("username").value,
				Password: document.getElementById("password").value,
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}
	).then(response => {
		if (response.status == 404) {
			simpleResponseString("Your username was not found. Please enter a valid username.  Status Code: " + response.status);
		} else if (response.status == 403) {
			simpleResponseString("Incorrect Password. Please retry.  Status Code: " + response.status);
		} else if (response.status == 200) {
			simpleResponseString("Successful Login. Status Code: " + response.status);
			loginStatus("LOGGED IN");
			successfulLogin = true;
		} else {
			simpleResponseJson(response.json());
		}
		return response.text();
	}).then(responseJson => {
		if (successfulLogin) {
			localStorage.setItem("token", responseJson);
			successfulLogin = false;
		}
	});
}

const logout = () => {
	localStorage.removeItem("token");
	simpleResponseString("Successfully Logged Out");
	loginStatus("LOGGED OUT");
}

const quote = () => {
	fetch(serverUrl + "/api/Glados",
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token"),
			}
		}
	).then(response => {
		if (response.status == 401) {
			simpleResponseString("Invalid Token.  Please Login.  Status Code: " + response.status);
		} else if (response.status == 404) {
			simpleResponseString("An error was encountered  Status Code: " + response.status);
		} else if (response.status == 200) {
			successfulQuote = true;
		} else {
			simpleResponseJson(response.json());
		}
		return response.text();
	}).then(responseJson => {
		console.log(responseJson);
		if (successfulQuote) {
			simpleResponseString("Glados Quote: " + responseJson + "       Status Code: 200");
			successfulQuote = false;
		}
	});
}

