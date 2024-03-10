import postTo from "./postTo.mjs";

export default async function submitRating(ratingObject) {
	ratingObject.token = localStorage.getItem("token");
	try {
		const response = await postTo("/idea/rateIdea", ratingObject);
		if (response.ok) {
			const data = await response.json();

			console.log(data);
			return data;
		}
	} catch (error) {
		return error.message;
	}
}
