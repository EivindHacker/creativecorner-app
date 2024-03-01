let pageState = "The Corner";
function updatePageState(aState) {
	pageSate = aState;
}

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((button) => {
	button.addEventListener("click", (e) => {
		const clickedButton = e.target.innerText;
		updatePageState(clickedButton);
		setNavBtns(clickedButton);
	});
});

function setNavBtns(clickedButton) {
	console.log(clickedButton);
	navButtons.forEach((button) => {
		if (clickedButton !== button.innerText) {
			button.classList.remove("nav-btn-active");
		} else {
			button.classList.add("nav-btn-active");
		}
	});
}

setNavBtns(pageState);
