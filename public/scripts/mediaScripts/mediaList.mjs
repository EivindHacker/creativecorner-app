"use strict";

import {kits} from "../../data/kits.js";

import {updateKitList} from "./updateKitsList.mjs";

//ALL THE DISPLAYED KITS
export const displayedKits = [];

// Global array for purchased kits
export let purchasedMusic = [];
purchasedMusic = JSON.parse(localStorage.getItem("purchasedMusic")) || [];

let kitIndex = -1;
kits.forEach((kit) => {
	kitIndex++;
	kit.id = kitIndex.toString();
});

console.log(localStorage);

// Function to remove duplicate strings from an array
function removeDuplicates(arr) {
	return [...new Set(arr)];
}

purchasedMusic = removeDuplicates(purchasedMusic);

// Global variable to store the current page number
export let currentPage = 1;
export const kitsPerPage = 50;

// Function to display the kits on the current page
function displayKits() {
	// Call the updateKitList function with the filtered kitsToShow array
	updateKitList();

	const pageInfo = document.querySelector(".page-info");
	const totalPages = Math.ceil(kits.length / kitsPerPage);
	pageInfo.textContent = `${currentPage} of ${totalPages}`;
}

// Event listeners for the previous and next buttons
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

prevButton.addEventListener("click", () => {
	if (currentPage > 1) {
		currentPage--;
		displayKits();
		window.scrollTo(0, 0);
	}
});

nextButton.addEventListener("click", () => {
	const totalPages = Math.ceil(kits.length / kitsPerPage);
	if (currentPage < totalPages) {
		currentPage++;
		displayKits();
		window.scrollTo(0, 0);
	}
});

displayKits();

console.log("Amount of kits: " + kits.length);

// Get DOM elements by their IDs
