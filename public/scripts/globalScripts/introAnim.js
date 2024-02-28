//Opening Animation

export default function playIntroAnim() {
	return;
	const animCont = document.createElement("div");
	animCont.classList.add("anim-cont");
	document.body.insertBefore(animCont, document.body.firstChild);

	const stemAnimCont = document.createElement("div");
	stemAnimCont.classList.add("stem-anim-cont");
	animCont.appendChild(stemAnimCont);

	const drumIco = document.createElement("img");
	drumIco.classList.add("drum-anim-ico");
	drumIco.src = "../../assets/btnIcons/drumsBtn.svg";
	stemAnimCont.appendChild(drumIco);

	const melodyIco = document.createElement("img");
	melodyIco.classList.add("melody-anim-ico");
	melodyIco.src = "../../assets/btnIcons/melodyBtn.svg";
	stemAnimCont.appendChild(melodyIco);

	const bassIco = document.createElement("img");
	bassIco.classList.add("bass-anim-ico");
	bassIco.src = "../../assets/btnIcons/bassBtn.svg";
	stemAnimCont.appendChild(bassIco);

	const leadIco = document.createElement("img");
	leadIco.classList.add("lead-anim-ico");
	leadIco.src = "../../assets/btnIcons/leadBtn.svg";
	stemAnimCont.appendChild(leadIco);

	if (document.URL.includes("index.html")) {
		const headerIndex = document.querySelector(".header-index");
		headerIndex.style.animationDelay = "3s";
	}
	setTimeout(function () {
		animCont.style.opacity = 0;
		setTimeout(function () {
			document.body.removeChild(animCont);
		}, 1000);
	}, 3100);
	sessionStorage.setItem("finished", true);
}
