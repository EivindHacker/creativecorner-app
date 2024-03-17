import getFrom from "../httpmethods/getFrom.mjs";

export async function getIdeas(sortBy, orderBy) {
	const url = `idea/getIdeas/${sortBy}_${orderBy}`;

	try {
		const response = await getFrom(url);
		if (response.ok) {
			const data = await response.json();

			const ideas = JSON.parse(data);

			return ideas;
		} else {
			return "Could not find any Ideas";
		}
	} catch (error) {
		if (error.message.includes("<!DOCTYPE html>")) {
			return "You are offline. Unofortunately, we do not offer any offline functionality.";
		} else {
			return error.message;
		}
	}
}

export async function getUserIdeas(sortBy, id) {
	const url = `idea/getUserIdeas/${sortBy}_${id}`;

	try {
		const response = await getFrom(url);
		if (response.ok) {
			const data = await response.json();

			const ideas = JSON.parse(data);

			return ideas;
		} else {
			return "Could not find any Ideas";
		}
	} catch (error) {
		return error.message;
	}
}
