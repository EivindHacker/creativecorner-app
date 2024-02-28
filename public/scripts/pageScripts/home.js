"use strict";

const hotKits = {
	song51: {
		title: "Trapped In Asia",
		genre: "Pop",
		key: "B Major",
		BPM: 95,
		creator: "Maybon",
		tags: ["Flume", "Asia", "Glitch"],
		startStem: {Drum: false, Melody: false, Bass: true, Lead: true},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: false, //Leave on false.
		price: 0, //$
		discount: 0, //$
		series: "Edvyn Beats vol 1",
	},
	sundayFlowers: {
		title: "Sunday Flowers",
		genre: "Pop",
		key: "C Minor",
		BPM: 130,
		creator: "EDVYN",
		tags: ["Guitar", "Summer", "Happy"],
		startStem: {Drum: false, Melody: true, Bass: false, Lead: true},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: true,
		price: 15, //$
		discount: 0, //$
		series: "Edvyn Beats vol 1",
	},
	song52: {
		title: "Dehli",
		creator: "Maybon",
		genre: "World",
		BPM: 95,
		key: "F# Minor",
		series: "Edvyn Beats vol 1",
		tags: ["Asia", "Indian", "Sitar"],
		price: 9, //$
		discount: 0, //$
		startStem: {Drum: true, Melody: true, Bass: false, Lead: false},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: true,
	},
	song50: {
		title: "Astrotype",
		genre: "Trap",
		key: "B Major",
		BPM: 95,
		creator: "EDVYN",
		tags: ["Travis Scott", "Dark", "Synth"],
		startStem: {Drum: false, Melody: true, Bass: true, Lead: false},
		disable: {Drum: false, Melody: false, Bass: false, Lead: false},
		hot: false,
		price: 10, //$
		discount: 5, //$
		series: "Edvyn Beats vol 1",
	},
};

let chosenKit = null;

const hotKitCont = document.querySelector(".hot-kit-cont");

for (let i = 0; i < Object.keys(hotKits).length; i++) {
	createCard(Object.keys(hotKits)[i]);
}

function createCard(aKit) {
	const currentKit = hotKits[aKit];

	const cardElement = document.createElement("div");
	cardElement.classList.add("card-element");

	const imgCont = document.createElement("div");
	imgCont.classList.add("card-img-cont");

	const cardImg = document.createElement("img");
	cardImg.classList.add("card-img");
	cardImg.classList.add("hot-kit-img");
	cardImg.src = `../media/coverImgs/${currentKit.series}.jpg`;
	console.log(cardImg.src);

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");

	const lgTxt = document.createElement("h3");
	lgTxt.classList.add("lg-txt");
	lgTxt.innerText = currentKit.title.toString();

	const mdTxt = document.createElement("h4");
	mdTxt.classList.add("md-txt");
	mdTxt.innerText = currentKit.creator;

	const smTxt = document.createElement("h5");
	smTxt.classList.add("sm-txt");
	smTxt.innerText = currentKit.genre;

	const price = document.createElement("div");
	price.classList.add("price");

	if (currentKit.price == 0) {
		price.innerText = "FREE!";
		price.style.backgroundColor = "orange";
	} else {
		if (currentKit.discount != 0) {
			price.innerHTML = '<strike style="color: grey;">' + currentKit.price.toString() + "$ </strike>" + currentKit.discount.toString() + "$";
			price.style.backgroundColor = "orange";
		} else {
			price.innerText = currentKit.price + "$";
		}
	}

	hotKitCont.appendChild(cardElement);
	cardElement.appendChild(imgCont);
	imgCont.appendChild(cardImg);
	cardElement.appendChild(cardInfo);
	cardInfo.appendChild(lgTxt);
	cardInfo.appendChild(mdTxt);
	cardInfo.appendChild(smTxt);
	cardElement.appendChild(price);

	lgTxt.addEventListener("mousedown", function () {
		//window.location.href = `shop.html#!/products/${currentKit.title.toLowerCase()}`;
	});

	lgTxt.addEventListener("mouseover", function () {
		lgTxt.style.color = "orange";
	});
	lgTxt.addEventListener("mouseleave", function () {
		lgTxt.style.color = "white";
	});

	mdTxt.addEventListener("mousedown", function () {
		//window.location.href = `./${currentKit.creator.toLowerCase()}.html`;
	});

	cardElement.addEventListener("mousedown", function () {
		//window.location.href = `shop.html#!/products/${currentKit.title.toLowerCase()}`;
		chosenKit = currentKit.title;
		sessionStorage.setItem("chosenKit", chosenKit);
		//window.location.href = "kits.html";
	});
}

//RESIZE EVENTS
function resize() {
	const headerCont = document.querySelector(".header-cont");

	if (window.innerWidth < 576) {
		headerCont.style.backgroundSize = "100%";
		headerCont.style.backgroundPosition = "center center";
	} else if (window.innerWidth > 1000) {
		headerCont.style.backgroundPosition = `center -100px`;
	} else {
		headerCont.style.backgroundSize = "100%";
		headerCont.style.backgroundPosition = `center -40px`;
	}
}

resize();

window.addEventListener("resize", () => {
	resize();
});

//SCROLL EVENTS
window.addEventListener("scroll", () => {
	const body = document.body,
		html = document.documentElement;
	const screenHeight = screen.height;
	const pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight) - screenHeight;
	const scrolled = ((window.scrollY / pageHeight) * 100).toFixed(2);

	//html elements:
	const navbar = document.getElementById("navbar");

	if (document.URL.includes("index.html")) {
		const headerCont = document.querySelector(".header-cont");
		const headerIndex = document.querySelector(".header-index");

		if (scrolled > 0 && scrolled < 20) {
			headerIndex.style.marginLeft = (scrolled * 2).toString() + "%";
			if (window.innerWidth > 1300) {
				headerCont.style.backgroundPosition = `center ${-100 + -scrolled * 28}px`;
			} else if (window.innerWidth > 576) {
				headerCont.style.backgroundPosition = `center ${-40 + -scrolled * 10}px`;
			}
		}
	}

	if (scrolled <= 1) {
		navbar.style.boxShadow = "0px 0px 0px #00000000";
	} else {
		navbar.style.boxShadow = "2px 2px 25px 10px #000000";
	}
});

//OBSERVER EVENTS - OBS

//INDEX.HTML

const stemSelector = document.querySelector(".stem-selector-appear");
const stemSelectorObs = new IntersectionObserver((entries) => {
	stemSelector.classList.toggle("fade-in", entries[0].isIntersecting);
});

const sc1 = document.querySelector(".sc1");
const sc2 = document.querySelector(".sc2");
const sc3 = document.querySelector(".sc3");
const sc4 = document.querySelector(".sc4");

const sc1Obs = new IntersectionObserver((entries) => {
	sc1.classList.toggle("slide-in", entries[0].isIntersecting);
});
const sc2Obs = new IntersectionObserver((entries) => {
	sc2.classList.toggle("slide-in", entries[0].isIntersecting);
});
const sc3Obs = new IntersectionObserver((entries) => {
	sc3.classList.toggle("slide-in", entries[0].isIntersecting);
});
const sc4Obs = new IntersectionObserver((entries) => {
	sc4.classList.toggle("slide-in", entries[0].isIntersecting);
});

const filterCircles = document.querySelectorAll(".filter-circle");

const filterBody = document.querySelector(".filter-body");
const filterBodyObs = new IntersectionObserver((entries) => {
	console.log("kjører");
	[...filterCircles].forEach((circle) => {
		circle.classList.toggle("filter-anim", entries[0].isIntersecting);
	});
});

stemSelectorObs.observe(stemSelector);
sc1Obs.observe(sc1);
sc2Obs.observe(sc2);
sc3Obs.observe(sc3);
sc4Obs.observe(sc4);
filterBodyObs.observe(filterBody);
