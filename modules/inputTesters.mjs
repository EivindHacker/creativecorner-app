export function checkIllegalRatingInput(string) {
	if (parseInt(string) < 0 || parseInt(string) > 5) {
		return true;
	}

	if (!/^\d+$/.test(string) || string.length > 1) {
		return true;
	}

	return false;
}

export function checkIllegalInput(string, except, maxLength) {
	let illegalSymbols = ['!', '#', '$', '%', '^', '&', '*', '(', ')', '{', '}', '[', ']', ',', '?', ';', ':', '"', "'", '\n', '\r', '\t', '+', '*', '/', '=', '\\', '<', '>', '|']; //prettier-ignore
	if (except) {
		except.forEach((symbol) => {
			illegalSymbols = illegalSymbols.filter((item) => item !== symbol);
		});
	}
	let illegalSymbol = false;

	string.split("").forEach((char) => {
		if (illegalSymbols.includes(char)) {
			illegalSymbol = true;
		}
	});

	if (string.length < 1) {
		illegalSymbol = true;
	}

	if (maxLength) {
		if (string.length > maxLength) {
			illegalSymbol = true;
		}
	} else {
		if (string.length > 64) {
			illegalSymbol = true;
		}
	}

	return illegalSymbol;
}

export function removeComma(inputString) {
	if (inputString.charAt(0) === ",") {
		return inputString.slice(1);
	}

	if (inputString.charAt(inputString.length - 1) === ",") {
		return inputString.slice(0, -1);
	}

	return inputString;
}
