export function findPreviousKit(kits, activeKit) {
	const index = kits.findIndex((kit) => kit === activeKit);

	if (index === -1) {
		// If the activeKit is not found in the array, return null or handle it as per your requirement.
		return null;
	}

	// Calculate the index of the previous kit, wrapping around to the end if necessary.
	const previousIndex = (index - 1 + kits.length) % kits.length;

	return kits[previousIndex];
}

export function findNextKit(kits, activeKit) {
	const index = kits.findIndex((kit) => kit === activeKit);

	if (index === -1) {
		// If the activeKit is not found in the array, return null or handle it as per your requirement.
		return null;
	}

	// Calculate the index of the next kit, wrapping around to the beginning if necessary.
	const nextIndex = (index + 1) % kits.length;

	return kits[nextIndex];
}
