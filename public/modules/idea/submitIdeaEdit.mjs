import postTo from "../httpmethods/postTo.mjs";

export default async function submitIdeaEdit(idea) {
	idea.token = localStorage.getItem("token");
	try {
		const response = await postTo("/idea/editIdea", idea);
		if (response.ok) {
			const data = await response.json();

			return JSON.parse(data);
		}
	} catch (error) {
		return error.message;
	}
}
