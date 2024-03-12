export default async function postTo(url, data) {
	const header = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const response = await fetch(url, header);

	if (!response.ok) {
		const errorMessage = await response.text(); // Extract the error message
		throw new Error(errorMessage); // Throw error with error message
	}
	return response;
}
