export default function displayError(msg) {
	if (msg) {
		const errorWrapper = document.querySelector(".error-bg");
		errorWrapper.style.display = "block";
		document.getElementById("errorText").textContent = msg;

		document.getElementById("closeErrorBtn").addEventListener("click", () => {
			errorWrapper.style.display = "none";
		});
	}
}
