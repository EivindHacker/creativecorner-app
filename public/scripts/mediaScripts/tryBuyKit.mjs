const overlay = document.querySelector(".overlay");
const messageElement = document.querySelector(".overlay-message");
const overlayImgBig = document.querySelector(".overlay-img-big");

// Function to show the pop-up confirmation
export default function tryBuyKit(kit) {
	console.log(kit);
	overlay.style.display = "flex";

	messageElement.textContent = "You have to be signed in to download and buy kits";
	yesButton.style.display = "none";
	noButton.style.display = "none";
	exitBtn.style.display = "block";
	signInBtn.style.display = "block";
	overlayImgBig.style.display = "block";
}

function hideOverlay() {
	overlay.style.display = "none";
}

const noButton = document.querySelector(".overlay-buttons .no");
noButton.addEventListener("click", () => {
	// Hide the overlay
	hideOverlay();
});

const exitBtn = document.querySelector(".overlay-buttons .exit-btn");
exitBtn.addEventListener("click", () => {
	// Hide the overlay
	hideOverlay();
});

const yesButton = document.querySelector(".overlay-buttons .yes");

yesButton.addEventListener("click", () => {
	//Code for buying button...
});

const signInBtn = document.querySelector(".sign-in-now");

signInBtn.addEventListener("click", function () {
	window.location.href = "./signin.html";
});
