import {kits} from "../../data/kits.js";
import {updateKitList} from "./updateKitsList.mjs";

let filteredKits;

// Function to perform the search and return filtered kits
export function performSearch(searchQuery, genreFilter, typeFilter) {
	const query = typeof searchQuery === "string" ? searchQuery.toLowerCase().replace(/ /g, "_") : "";
	filteredKits = kits.filter((kit) => {
		const {title, creator, key, tags} = kit;
		return (
			title.toLowerCase().includes(query) ||
			creator.toLowerCase().includes(query) ||
			key.toLowerCase().includes(query) ||
			tags.some((tag) => tag.toLowerCase().includes(query))
		);
	});

	// Apply genre filter if it is specified
	if (genreFilter !== "all") {
		filteredKits = filteredKits.filter((kit) => kit.genre.toLowerCase() === genreFilter);
	} else if (typeFilter !== "all") {
		filteredKits = filteredKits.filter((kit) => kit.type.toLowerCase() === typeFilter);
	}

	// Return the filtered results
	return filteredKits;
}

// Event listener for the search button click
const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
	const searchQuery = searchInput.value.trim();
	updateKitList(searchQuery);
});

// Event listener for pressing Enter key in the search input
searchInput.addEventListener("keyup", (event) => {
	console.log(event);
	if (event.key === "Enter") {
		const searchQuery = searchInput.value.trim();
		updateKitList(searchQuery);
	}
});

// Get references to the drop-down menus
const genreSelect = document.getElementById("genreSelect");
const typeSelect = document.getElementById("typeSelect");

// Add event listener to the genreSelect drop-down menu
genreSelect.addEventListener("change", () => {
	const searchInput = document.getElementById("searchInput");
	updateKitList(searchInput.value.trim(), genreSelect.value, typeSelect.value);
});

// Add event listener to the typeSelect drop-down menu
typeSelect.addEventListener("change", () => {
	const searchInput = document.getElementById("searchInput");
	updateKitList(searchInput.value.trim(), genreSelect.value, typeSelect.value);
});
