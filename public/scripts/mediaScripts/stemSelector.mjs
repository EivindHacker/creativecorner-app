import {howlerObjects} from "./playMusic.mjs";

const stemBtns = document.querySelectorAll("#stemBtn");
const stemBtnsArray = [...stemBtns];

const stemImgs = document.querySelectorAll("#stemImg");
const stemImgsArray = [...stemImgs];

const stemTxts = document.querySelectorAll("#stemTxt");
const stemTxtsArray = [...stemTxts];

export function setStemSelector(kit) {
	const stemSelector = document.querySelector(".stem-selector-title");
	const filterBtn = document.getElementById("filterBtn");

	if (kit.type != "kit") {
		stemSelector.innerText = kit.type;
		for (let i = 0; i < 6; i++) {
			const stemTxt = document.getElementById(`stemTxt${i}`);
			stemTxt.innerText = convertStem("EMTY");
		}
		filterBtn.classList.add("filter-btn-disable");
	} else {
		stemSelector.innerText = "Stem Selector";
		filterBtn.classList.remove("filter-btn-disable");
	}

	for (let i = 0; i < 6; i++) {
		const stemTxt = stemTxtsArray[i];
		const stemImg = stemImgsArray[i];
		const stemButton = stemBtnsArray[i];
		console.log(kit);
		if (kit.stems[i] == null) {
			stemImg.src = `../../assets/btnIcons/nostemBtn.svg`;
			stemButton.classList.add("stem-disable");
			stemTxt.innerText = "EMTY";
		} else {
			stemButton.classList.remove("stem-disable");
			stemImg.src = `../../assets/btnIcons/${kit.stems[i]}Btn.svg`;
			stemTxt.innerText = convertStem(kit.stems[i]);
		}
	}
}

function convertStem(input) {
	const abbreviationMap = {
		drums: "DRMS",
		percussion: "PERC",
		melody: "MLDY",
		bass: "BASS",
		lead: "LEAD",
		keys: "KEYS",
		synth: "SYNT",
		vocals: "VOCS",
		guitar: "GTAR",
		strings: "STRI",
		woodwinds: "WDWI",
		brass: "BRAS",
		effects: "EFXS",
	};

	const lowercaseInput = input.toLowerCase();

	if (abbreviationMap.hasOwnProperty(lowercaseInput)) {
		return abbreviationMap[lowercaseInput];
	} else {
		return input;
	}
}

console.log(stemBtns);

stemBtnsArray.forEach((stemBtn, index) => {
	stemBtn.addEventListener("click", () => stemBtnAction(index));
});

export function muteStem(stemNr) {
	const btn = stemBtnsArray[stemNr];
	howlerObjects[stemNr].fade(1.0, 0.0, 0.2);
	btn.classList.remove("stem-active");
}

export function unmuteStem(stemNr) {
	const btn = stemBtnsArray[stemNr];
	howlerObjects[stemNr].fade(0.0, 1.0, 0.2);
	btn.classList.add("stem-active");
}

function stemBtnAction(stemNr) {
	console.log(stemNr);
	if (howlerObjects[stemNr].volume() === 1) {
		muteStem(stemNr);
	} else {
		unmuteStem(stemNr);
	}
}

//------------------------------ CONTROL STEMS WITH KEYBOARD KEYS --------------------------

// Function to handle key presses
function handleKeyPress(event) {
	const key = event.key;

	// Check if the pressed key is a number key (1-6)
	if (key >= "1" && key <= "6") {
		const stemNr = parseInt(key);
		stemBtnAction(stemNr - 1);
	}
}

// Attach event listener to listen for key presses on the whole document
document.addEventListener("keydown", handleKeyPress);
