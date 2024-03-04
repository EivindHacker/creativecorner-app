console.log("This is the user settings script calling...");

const nameDisplay = document.getElementById("nameDisplay");
const emailDisplay = document.getElementById("emailDisplay");

function displayUserData(data) {
	const userData = JSON.parse(data);
	nameDisplay.innerText = userData[0].name;
	emailDisplay.innerText = userData[0].email;
	//To do: Add code for showing account type.
}
