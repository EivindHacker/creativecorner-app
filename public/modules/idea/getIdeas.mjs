import getFrom from "../httpmethods/getFrom.mjs";

export default async function getIdeas(id) {
	let url = "idea/getIdeas/null";

	if (id) {
		url = `idea/getIdeas/${id}`;
	}

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
