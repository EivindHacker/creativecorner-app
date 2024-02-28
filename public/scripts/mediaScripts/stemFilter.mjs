import {howlerObjects, activeKit} from "./playMusic.mjs";

// ------------------- FILTER CODE ---------------------

const filterBtn = document.getElementById("filterBtn");

filterBtn.addEventListener("click", function () {
	const filterCont = document.getElementById("filterCont");
	const filterSliders = document.querySelectorAll(".filter-slider");

	if (filterCont.classList.contains("filter-active")) {
		filterCont.classList.remove("filter-active");
		filterSliders.forEach((element) => {
			element.classList.remove("filter-slider-active");
			filterLinkOff();
		});
	} else {
		filterCont.classList.add("filter-active");
		filterSliders.forEach((element) => {
			element.classList.add("filter-slider-active");
		});
	}
});

let filterValues = [];
let filterTypes = [];

const filterSwitch = document.getElementById("filterSwitch");
const filterLink = document.getElementById("filterLink");

const filters = Array.from(document.querySelectorAll("#filter"));
const filterSliders = Array.from(document.querySelectorAll("#filter-slider"));
const filterTypeBtns = Array.from(document.querySelectorAll("#filterTypeBtn"));

export function resetFilters(kit) {
	filterSwitchOn();

	filterValues = [];
	filterTypes = [];

	console.log("filers are reset");

	filterSliders.forEach((filterSlider) => {
		filterSlider.value = 9.95;
	});
	filterTypeBtns.forEach((filterTypeBtn) => {
		if (filterTypeBtn.classList.contains("highpass")) {
			filterTypeBtn.classList.remove("lowpass");
			filterTypeBtn.classList.add("lowpass");
		}
	});

	if (kit.type != "kit") {
		filterCont.classList.remove("filter-active");
		filterSliders.forEach((element) => {
			element.classList.remove("filter-slider-active");
		});
	}

	howlerObjects.forEach((howl) => {
		howl.frequency(20000);
		howl.filterType("lowpass");
	});
}

export function initFilters(kit) {
	filters.forEach(function (filter, i) {
		console.log(kit.stems);

		if (kit.stems[i] == null || kit.stems[i] == undefined) {
			filter.style.pointerEvents = "none";
			filter.style.filter = "brightness(0.4)";
		} else {
			filter.style.pointerEvents = "all";
			filter.style.filter = "brightness(1)";
		}
	});

	if (kit.type === "kit") {
		for (let i = 0; i < kit.stems.length; i++) {
			//Filter Sliders
			console.log("Filter Activated");
			const filterSlider = filterSliders[i];
			filterSlider.addEventListener("input", function (e) {
				const value = e.target.value;
				howlerObjects[i].frequency(Math.ceil(Math.exp(value)));
			});

			//Filter Type Buttons
			const filterTypeBtn = filterTypeBtns[i];
			filterTypeBtn.addEventListener("click", function () {
				if (filterTypeBtn.classList.contains("highpass")) {
					//Set to lowpass
					filterTypeBtn.classList.remove("highpass");
					filterTypeBtn.classList.add("lowpass");
					howlerObjects[i].filterType("lowpass");
					filterSliders[i].value = 9.95;
					howlerObjects[i].frequency(20000);
				} else {
					//Set to highpass
					filterTypeBtn.classList.add("highpass");
					filterTypeBtn.classList.remove("lowpass");
					howlerObjects[i].filterType("highpass");
					filterSliders[i].value = 4.1;
					howlerObjects[i].frequency(60);
				}
			});
		}
	}
}

const slidersCont = document.querySelector(".sliders-cont");

function filterSwitchOn() {
	howlerObjects.forEach(function (howl, i) {
		howl.frequency(filterValues[i]);
		howl.filterType(filterTypes[i]);
	});

	filterSwitch.classList.remove("filter-off");

	slidersCont.style.filter = "brightness(1)";
	slidersCont.style.pointerEvents = "all";

	filterValues = [];
	filterTypes = [];
}

function filterSwitchOff() {
	howlerObjects.forEach((howl) => {
		if (howl.frequency() !== 1000) {
			filterValues.push(howl.frequency());
			filterTypes.push(howl.filterType());
		} else {
			filterValues.push(20000);
			filterTypes.push(20000);
		}
	});

	filterSwitch.classList.add("filter-off");

	slidersCont.style.filter = "brightness(0.6)";
	slidersCont.style.pointerEvents = "none";
	howlerObjects.forEach((howl) => {
		howl.frequency(20000);
		howl.filterType("lowpass");
	});
}

filterSwitch.addEventListener("click", function () {
	if (filterSwitch.classList.contains("filter-off")) {
		//Filter On
		filterSwitchOn();
		filterSwitch.style.filter = "grayscale(100%) brightness(60%) sepia(100%) saturate(700%) hue-rotate(5deg) contrast(1)";
		console.log(filterValues);
	} else {
		//Filter Off
		filterSwitchOff();
		console.log(filterValues);
		filterSwitch.style.filter = "brightness(0.6)";
	}
});

const linkedSlider = document.getElementById("linkedSlider");

function filterLinkOff() {
	linkedCont.classList.remove("linked-active");
	filterLink.style.filter = "brightness(0.6)";

	for (let i = 0; i < howlerObjects.length; i++) {
		filters[i].style.filter = "brightness(1)";
		filters[i].style.pointerEvents = "all";
	}

	howlerObjects.forEach((howl) => {
		howl.frequency(20000);
		howl.filterType("lowpass");
	});

	linkedSlider.value = 9.95;

	resetFilters(activeKit);
}

const linkedCont = document.querySelector(".linked-cont");
const linkedFilterTypeBtn = document.getElementById("linkedFilterTypeBtn");

filterLink.addEventListener("click", function () {
	if (!linkedCont.classList.contains("linked-active")) {
		filterLink.style.filter = "grayscale(100%) brightness(60%) sepia(100%) saturate(700%) hue-rotate(5deg) contrast(1)";
		linkedCont.classList.add("linked-active");

		resetFilters(activeKit);

		filters.forEach((filter) => {
			filter.style.filter = "brightness(0.4)";
			filter.style.pointerEvents = "none";
		});
	} else {
		filterLinkOff();
	}
});

linkedSlider.addEventListener("input", function (e) {
	howlerObjects.forEach((howl) => {
		const value = e.target.value;
		howl.frequency(Math.ceil(Math.exp(value)));
	});
});

linkedFilterTypeBtn.addEventListener("click", function () {
	if (!linkedFilterTypeBtn.classList.contains("lowpass")) {
		resetLinkFilter();
	} else {
		linkedFilterTypeBtn.classList.remove("lowpass");
		linkedFilterTypeBtn.classList.add("highpass");
		howlerObjects.forEach((howl) => {
			howl.filterType("highpass");
			howl.frequency(60);
		});
		linkedSlider.value = 4.1;
	}
});

export function resetLinkFilter() {
	linkedFilterTypeBtn.classList.add("lowpass");
	linkedFilterTypeBtn.classList.remove("highpass");
	howlerObjects.forEach((howl) => {
		howl.filterType("lowpass");
		howl.frequency(20000);
	});
	linkedSlider.value = 9.95;
}
