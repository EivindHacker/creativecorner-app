import postTo from "../httpmethods/postTo.mjs";

export default async function submitRating(ratingObject) {
	ratingObject.token = localStorage.getItem("token");
	try {
		const response = await postTo("/idea/rateIdea", ratingObject);
		if (response.ok) {
			const data = await response.json();

			return JSON.parse(data);
		}
	} catch (error) {
		return error.message;
	}
}
