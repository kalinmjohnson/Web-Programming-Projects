window.onload = () => {
	document.getElementById("parseButton").onclick = parseJson;	
    document.getElementById("backgroundButton").onclick = changeBackground;	
}

// This method is used the change the location of the split in the background when the button is pressed
const changeBackground = () => {
    let randomNum = Math.floor(Math.random() * 100);
    let otherRanNum = 100 - randomNum;
    document.getElementById("rightHalf").style.width = randomNum + "%";
    document.getElementById("leftHalf").style.width = otherRanNum + "%";
}

// This method parses the json in the text area when the button labeled as such is pressed
const parseJson = () => {
	let errorMessage = document.getElementById("errorMessage");
	errorMessage.innerHTML = "";
	
	let changeColorObject;
	
	let jsonTextArea = document.getElementById("jsonTextArea");


	try {
		changeColorObject = JSON.parse(jsonTextArea.value);
	} catch (error) {
		errorMessage.innerHTML = "Your JSON didn't parse correctly.";
	}
	
	
	if (changeColorObject.color) {
		document.getElementById("blockOfText1").style.color = changeColorObject.color;
        document.getElementById("blockOfText2").style.color = changeColorObject.color;
        document.getElementById("link1").style.color = changeColorObject.color;
        document.getElementById("link2").style.color = changeColorObject.color;
	}

    if (changeColorObject.backgroundColorRight && changeColorObject.backgroundColorLeft) {
        document.getElementById("rightHalf").style.backgroundColor = changeColorObject.backgroundColorRight;
        document.getElementById("leftHalf").style.backgroundColor = changeColorObject.backgroundColorLeft;
    }

    if (changeColorObject.link) {
        document.getElementById("link").href = changeColorObject.link;
    }
}