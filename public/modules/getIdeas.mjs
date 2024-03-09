import getFrom from "./getFrom.mjs";

export default async function getIdeas() {
	console.log("getting ideas...");

	try {
		const response = await getFrom("idea/getIdeas");
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
