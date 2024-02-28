//Function for image loading

//ABOUT.HTML

if (document.URL.includes("about.html")) {
	const box1 = document.querySelector("#box1");
	const box1Obs = new IntersectionObserver((entries) => {
		box1.classList.toggle("fade-in", entries[0].isIntersecting);
	});
	if (box1.style.opacity < 0.2) {
		box1Obs.observe(box1);
	}
	const box2 = document.querySelector("#box2");
	const box2Obs = new IntersectionObserver((entries) => {
		box2.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box2Obs.observe(box2);

	const box3 = document.querySelector("#box3");
	const box3Obs = new IntersectionObserver((entries) => {
		box3.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box3Obs.observe(box3);

	const box4 = document.querySelector("#box4");
	const box4Obs = new IntersectionObserver((entries) => {
		box4.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box4Obs.observe(box4);

	const box5 = document.querySelector("#box5");
	const box5Obs = new IntersectionObserver((entries) => {
		box5.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box5Obs.observe(box5);

	const box6 = document.querySelector("#box6");
	const box6Obs = new IntersectionObserver((entries) => {
		box6.classList.toggle("fade-in", entries[0].isIntersecting);
	});

	box6Obs.observe(box6);
}
