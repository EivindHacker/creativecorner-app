import postTo from "../httpmethods/postTo.mjs";

export default async function submitIdea(idea) {
	idea.token = localStorage.getItem("token");
	if (idea.token) {
		try {
			const response = await postTo("/idea/createIdea", idea);
			if (response.ok) {
				const data = await response.json();
				return JSON.parse(data);
			}
		} catch (error) {
			return error.message;
		}
	} else {
		return "Missing token, please login again";
	}
}
