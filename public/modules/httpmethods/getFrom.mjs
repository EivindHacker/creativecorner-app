export default async function getFrom(url) {
	const header = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await fetch(url, header);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response;
}
