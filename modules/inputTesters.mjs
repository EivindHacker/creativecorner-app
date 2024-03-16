export function checkIllegalRatingInput(string) {
	if (parseInt(string) < 0 || parseInt(string) > 5) {
		return true;
	}

	if (!/^\d+$/.test(string) || string.length > 1) {
		return true;
	}

	return false;
}

export function checkIllegalInput(string, except) {
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

	return illegalSymbol;
}
