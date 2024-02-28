import {performSearch} from "./listFilters.mjs";
import {displayedKits} from "./mediaList.mjs";
import {createKitElement} from "./createKitElem.mjs";

// Function to update the kit list based on search results
export function updateKitList(searchQuery) {
	// Get the selected genre from the drop-down menu
	const genreSelect = document.getElementById("genreSelect");
	const selectedGenre = genreSelect.value;

	const typeSelect = document.getElementById("typeSelect");
	const selectType = typeSelect.value;

	// Perform the search based on the searchQuery and genre
	const filteredKits = performSearch(searchQuery, selectedGenre, selectType);
	const kitsContainer = document.getElementById("kitsContainer");

	// Clear the current kit list by removing all children
	while (kitsContainer.firstChild) {
		kitsContainer.removeChild(kitsContainer.firstChild);
	}

	//Clear displayed kits.
	displayedKits.length = 0;

	if (filteredKits.length === 0) {
		// If no kits match the search query, display a message
		const noResultsMessage = document.createElement("p");
		noResultsMessage.textContent = "No kits found. Try another search term.";
		kitsContainer.appendChild(noResultsMessage);
	} else {
		// If there are matching kits, create kit elements and add them to the container

		filteredKits.forEach((kit) => {
			displayedKits.push(kit);
			const kitElement = createKitElement(kit);
			kitsContainer.appendChild(kitElement);
		});
	}
}
