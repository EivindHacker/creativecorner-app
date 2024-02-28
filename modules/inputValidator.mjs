const inputType = {email: "email", name: "name", pswHash: "pswHash"};

const illegalInputs = [];

function clearIllegalInputs() {
	illegalInputs.length = 0;
}

function updateIllegalInputs(error) {
	illegalInputs.push(error);
}

function getIllegalInputs() {
	const errorMessage = illegalInputs.join("<br>");

	clearIllegalInputs();

	return errorMessage;
}

function validateInput(input, type) {
	if (input === "") {
		updateIllegalInputs(`Your ${type} input is empty. Please fill out all the empty fields`);
	}

	if (type === inputType.email) {
		const mustHaveSymbols = ["@", "."];
		const allowedCharacters = /^[a-zA-Z0-9@.]+$/; // Regular expression for letters, numbers, @ and .

		const illegal = checkForIllegalSymbols(input, allowedCharacters);
		if (illegal != null) {
			updateIllegalInputs(`Illegal letters or symbols: (${illegal}) Your email can only contain letters, numbers, @ and .`);
		}

		const missing = checkForMissingSymbols(input, mustHaveSymbols);
		if (missing != null) {
			updateIllegalInputs(`Email is missing (${missing}) Your email must contain ${missing}`);
		}
	} else if (type === inputType.pswHash) {
		const validatedPassword = validatePassword(input);
		if (validatedPassword != null) {
			updateIllegalInputs(validatedPassword);
		}
	}
}

function checkForMissingSymbols(str, symbols) {
	const missingSymbols = [];

	symbols.forEach((symbol) => {
		if (!str.includes(symbol)) {
			missingSymbols.push(symbol);
		}
	});

	if (missingSymbols.length > 0) {
		return `${missingSymbols.join(" and ")}`;
	} else {
		return null;
	}
}

function checkForIllegalSymbols(str, allowedCharacters) {
	const illegalSymbols = [];
	for (let i = 0; i < str.length; i++) {
		if (!allowedCharacters.test(str[i])) {
			illegalSymbols.push(str[i]);
		}
	}

	if (illegalSymbols.length > 0) {
		return `${illegalSymbols.join(" and ")}`;
	} else {
		return null;
	}
}

function validatePassword(password) {
	let missingElements = "";

	if (password.length < 8) {
		missingElements += "Minimum 8 characters, ";
	}

	if (!/[A-Z]/.test(password)) {
		missingElements += "1 uppercase letter, ";
	}

	if (!/[a-z]/.test(password)) {
		missingElements += "1 lowercase letter, ";
	}

	if (!/\d/.test(password)) {
		missingElements += "1 number, ";
	}

	if (missingElements) {
		missingElements = missingElements.slice(0, -2);
	}

	return missingElements ? `password must have at least: ${missingElements}` : null;
}

export {validateInput, getIllegalInputs, inputType};
