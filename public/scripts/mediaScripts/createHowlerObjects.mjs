import {howlerObjects, activeKit} from "./playMusic.mjs";
import {loop} from "./loopingState.mjs";
import {handleSkipButtonClick} from "./audioPlayer.mjs";

// Function to create Howler objects based on kit stems
export function createHowlerObjects(kit) {
	document.body.style.cursor = "wait";

	howlerObjects.forEach((sound) => {
		sound.unload();
	});

	howlerObjects.length = 0;

	const {type, title, stems, series} = kit;

	// If the kit type is "kit", create Howler objects for each stem
	if (type === "kit") {
		stems.forEach((stem) => {
			if (stem !== null) {
				// Create the Howler object for the current stem
				const howlerObject = new Howl({
					src: [`../../media/${kit.type}s/${kit.series}/${kit.title}/${stem}.mp3`],
					onend: function () {
						countFinish();
					},
					onload: function () {
						countLoads();
					},
					loop: false,
				});

				howlerObject.addFilter({
					filterType: "lowpass",
					frequency: 20000,
					Q: 3.0,
				});

				// Add the howler object to the array
				howlerObjects.push(howlerObject);
			}
		});
	} else {
		const howlerObject = new Howl({
			src: [`../../media/${kit.type}s/${kit.series}/${kit.title}/${kit.title}.mp3`],
			onend: function () {
				countFinish();
			},
			onload: function () {
				countLoads();
			},
			loop: false,
			// You can add more howler options if needed, like volume, loop, etc.
		});

		// Add the howler object to the array
		howlerObjects.push(howlerObject);

		// Display information about the Howler object in the console
		console.log(`Howler Object for ${stems[0]}:`, howlerObject);
	}

	return howlerObjects;
}

// Define a global variable to keep track of the load count
let loadCount = 0;

// Function to check if all audio files are loaded and call loadFinish if they are
function countLoads() {
	if (activeKit.type == "kit") {
		loadCount++; // Increment the load count
		console.log(loadCount);
		// Get the number of non-null elements in currentKit.stems
		const nonNullCount = activeKit.stems.filter((element) => element !== null).length;

		if (loadCount === nonNullCount) {
			// All audio files are loaded, call loadFinish
			loadFinish();
		}
	} else {
		loadFinish();
	}
}

// Define a global variable to keep track of the load count
let finishCount = 0;

// Function to check if all audio files are loaded and call loadFinish if they are
function countFinish() {
	if (!loop) {
		if (activeKit.type == "kit") {
			finishCount++; // Increment the load count
			console.log(finishCount);
			// Get the number of non-null elements in currentKit.stems
			const nonNullCount = activeKit.stems.filter((element) => element !== null).length;

			if (finishCount === nonNullCount) {
				// All audio files are loaded, call loadFinish
				handleSkipButtonClick();
			}
		} else {
			handleSkipButtonClick();
		}
	}
}

// Function to be called when all audio files are loaded
function loadFinish() {
	console.log("All audio files are loaded.");
	document.body.style.cursor = "default";
	loadCount = 0;
	// Add your code to handle the situation when all audio files are loaded
}
