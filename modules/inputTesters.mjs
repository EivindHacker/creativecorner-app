export function checkIllegalRatingInput(string) {
	if (parseInt(string) < 0 || parseInt(string) > 5) {
		return true;
	}

	if (!/^\d+$/.test(string) || string.length > 1) {
		return true;
	}

	return false;
}

export function checkIllegalSymbols(string) {
	const illegalSymbols = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', ',', '?', ';', ':', '"', "'", '\n', '\r', '\t', '+', '*', '/', '=', '/', '\\',  '<', '>', '|']; //prettier-ignore
	let usedIllegalSymbols = "";

	string.split("").forEach((char) => {
		if (illegalSymbols.includes(char)) {
			usedIllegalSymbols += char + " ";
		}
	});

	if (usedIllegalSymbols !== "") {
		return usedIllegalSymbols;
	} else {
		return false;
	}
}
