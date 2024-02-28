import {setStemSelector, muteStem, unmuteStem} from "./stemSelector.mjs";

import {showAudioPlayer, updateAudioPlayer, resetRate, handleSkipButtonClick, updateProgress} from "./audioPlayer.mjs";

import {resetFilters, resetLinkFilter, initFilters} from "./stemFilter.mjs";

import {setKitAnim, removeKitAnim} from "./kitAnimation.mjs";

import {createHowlerObjects} from "./createHowlerObjects.mjs";

import {playing, changePlayState} from "./playingState.mjs";

//THE ACTIVE KIT
export let activeKit;

//Howler Audio Objects
export const howlerObjects = [];

//------------------------------ PLAYING MUSIC --------------------------

export function playMusic(kit) {
	updateAudioPlayer(kit);
	resetRate();
	removeKitAnim();
	activeKit = kit;
	setKitAnim(kit);
	createHowlerObjects(kit);
	resetFilters(kit);
	resetLinkFilter();
	initFilters(kit);

	//Check if all audio files have been loaded fully.
	const loadedValues = [];

	const checkStateInterval = setInterval(checkState, 1);

	function checkState() {
		howlerObjects.forEach((sound) => {
			pushValue(loadedValues, sound.state(), kit);
		});
	}

	//Function for waiting for all audiofiles to be loaded, before playing.
	function pushValue(arr, value, kit) {
		if (arr.length >= 5) {
			arr.shift(); // Remove the first element if the array length exceeds 5
		}
		arr.push(value); // Add the new value to the end of the array

		// Check if all values in the array are true
		if (arr.every((item) => item == "loaded")) {
			playStem(kit); // Trigger the play function
		}
	}

	let canRunFunction = true;

	// Play function
	function playStem(kit) {
		clearInterval(checkStateInterval);

		if (canRunFunction) {
			canRunFunction = false;

			for (let i = 0; i < 6; i++) {
				if (kit.startStems[i] == true) {
					unmuteStem(i);
				} else if (kit.startStems[i] == null) {
				} else {
					muteStem(i);
				}
			}

			howlerObjects.forEach((sound) => {
				sound.play();
				//sound.rate(0.8);
			});
			if (playBtnImg.src !== "../../assets/btnIcons/pauseBtn.png") {
				playBtnImg.src = "../../assets/btnIcons/pauseBtn.png";
			}

			if (!playing) {
				changePlayState();
			}

			const footerSpacer = document.getElementById("footerSpacer");
			if (footerSpacer.style.display !== "block") {
				footerSpacer.style.display = "block";
			}

			setStemSelector(kit);

			showAudioPlayer();

			setInterval(() => {
				updateProgress();
			}, 100);

			setTimeout(() => {
				canRunFunction = true;
			}, 100);
		}
	}
}
