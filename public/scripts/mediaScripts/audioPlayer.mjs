import {displayedKits} from "./mediaList.mjs";
import {playMusic, activeKit, howlerObjects} from "./playMusic.mjs";
import {changePlayState, playing} from "./playingState.mjs";
import {changeLoopState, loop} from "./loopingState.mjs";

import {findNextKit, findPreviousKit} from "./findKit.mjs";

//------------------------------ SHOW AUDIO PLAYER --------------------------

function showAudioPlayer() {
	const audioPlayer = document.querySelector(".playbar-cont");
	const stemSelector = document.querySelector(".stem-selector-cont");

	audioPlayer.style.bottom = "0px";
	stemSelector.style.bottom = "100px";
}

//------------------------------ UPDATE AUDIO PLAYER DATA --------------------------

const apTitle = document.getElementById("apTitle");
const apCreator = document.getElementById("apCreator");
const apImg = document.getElementById("apImg");

function updateAudioPlayer(kit) {
	apTitle.textContent = kit.title;
	apCreator.textContent = kit.creator;
	apImg.src = `../../media/coverImgs/${kit.series}.jpg`;
}

// Exporting both functions
export {showAudioPlayer, updateAudioPlayer};

//------------------------------ REV BUTTON --------------------------

const revBtn = document.getElementById("revBtn");
// Attach event listeners to the buttons
revBtn.addEventListener("click", handleRevButtonClick);

// Define event listener functions
function handleRevButtonClick() {
	// Code to handle reverse button click
	const previousKit = findPreviousKit(displayedKits, activeKit);

	if (previousKit != undefined) {
		playMusic(previousKit);
	} else {
		console.log("Active kit not found in the array.");
	}
}

//------------------------------ SKIP BUTTON --------------------------@

const skipBtn = document.getElementById("skipBtn");
skipBtn.addEventListener("click", handleSkipButtonClick);

function handleSkipButtonClick() {
	// Code to handle skip button click
	const nextKit = findNextKit(displayedKits, activeKit);

	if (nextKit !== undefined) {
		playMusic(nextKit);
	} else {
		console.log("Active kit not found in the array.");
	}
}

export {handleSkipButtonClick};

//------------------------------ PLAY BUTTON --------------------------
const playBtn = document.getElementById("playBtn");
const playBtnImg = document.getElementById("playBtnImg");
playBtn.addEventListener("click", handlePlayButtonClick);

function handlePlayButtonClick() {
	if (playing === false) {
		changePlayState();
		howlerObjects.forEach((stem) => {
			stem.play();
			playBtnImg.src = "../../assets/btnIcons/pauseBtn.png";
		});
	} else {
		changePlayState();
		howlerObjects.forEach((stem) => {
			stem.pause();
			playBtnImg.src = "../../assets/btnIcons/playBtn.png";
		});
	}
}
//------------------------------ LOOP BUTTON --------------------------
const loopBtn = document.getElementById("loopBtn");
loopBtn.addEventListener("click", handleLoopButtonClick);

function handleLoopButtonClick() {
	// Code to handle loop button click

	if (!loop) {
		changeLoopState();
		loopBtn.style.filter = "grayscale(100%) brightness(60%) sepia(100%) saturate(700%) hue-rotate(5deg) contrast(1)";
		howlerObjects.forEach((sound) => {
			sound.loop(true);
		});
	} else {
		changeLoopState();
		loopBtn.style.filter = "none";
		howlerObjects.forEach((sound) => {
			sound.loop(false);
		});
	}
}
//------------------------------ VOLUME --------------------------

const volBtn = document.getElementById("volBtn");
volBtn.addEventListener("click", handleVolButtonClick);

let volVisible = false;
const volSlider = document.querySelector("#volSlider");
//Volume Slider
volSlider.min = 0;
volSlider.max = 100;
volSlider.oninput = function () {
	Howler.volume(volSlider.value / 100);
};

function showVolume() {
	volVisible = true;
	volSlider.style.display = "block";
	setTimeout(() => {
		volSlider.style.width = "100px";
		volSlider.style.opacity = 1;
	}, 10);
}

function hideVolume() {
	volVisible = false;
	volSlider.style.width = "0px";
	volSlider.style.opacity = 0;
	setTimeout(() => {
		volSlider.style.display = "none";
	}, 500);
}

function handleVolButtonClick() {
	// Code to handle volume button click
	if (!volVisible) {
		showVolume();
	} else {
		hideVolume();
	}
}

volSlider.addEventListener("mouseup", function () {
	setTimeout(() => {
		hideVolume();
	}, 1000);
});

//------------------------------ RATE --------------------------

const rateBtn = document.getElementById("rateBtn");
rateBtn.addEventListener("click", handleRateButtonClick);

let rateVisible = false;
const rateSlider = document.querySelector("#rateSlider");
//Volume Slider
rateSlider.min = 80;
rateSlider.max = 150;
rateSlider.oninput = function () {
	howlerObjects.forEach((howl) => {
		howl.rate(rateSlider.value / 100);
	});
};

function showRate() {
	rateVisible = true;
	rateSlider.style.display = "block";
	setTimeout(() => {
		rateSlider.style.width = "100px";
		rateSlider.style.opacity = 1;
	}, 10);
}

function hideRate() {
	rateVisible = false;
	rateSlider.style.width = "0px";
	rateSlider.style.opacity = 0;
	howlerObjects.forEach((howl) => {
		howl.rate(1);
	});
	rateSlider.value = 100;
	setTimeout(() => {
		rateSlider.style.display = "none";
	}, 500);
}

function handleRateButtonClick() {
	if (!rateVisible) {
		showRate();
	} else {
		hideRate();
	}
}

function resetRate() {
	rateSlider.value = 100;
}

export {resetRate};

//------------------------------ PROGRESSBAR --------------------------

const progressBar = document.querySelector(".playnav-cont");

//DURATION

//timeLength.innerText = Math.floor(Drums.duration() / 60) + ':' + ('0' + Math.floor(Drums.duration() % 60)).slice(-2);

//Update song progress
export function updateProgress() {
	const duration = howlerObjects[0].duration();

	const currentTime = howlerObjects[0].seek();

	const playNavBar = document.querySelector(".playnav-bar");
	const playNavHead = document.querySelector(".playnav-head");

	const progressPercent = (currentTime / duration) * 100;
	playNavBar.style.width = `${progressPercent}%`;

	//-------------------------  LOOP CODE! --------------------//
	//Checking if song is finished.

	if (audio.currentTime === audio.duration) {
		audio.currentTime = 0;
		pauseSong();
	}
}

//Set Progress
function setProgress(e) {
	const duration = howlerObjects[0].duration();

	const width = this.clientWidth;
	const clickX = e.offsetX;

	console.log((clickX / width) * duration);

	howlerObjects.forEach((sound) => {
		sound.seek([(clickX / width) * duration]);
	});
}

//Sett progress to progressbar.
progressBar.addEventListener("click", setProgress);
