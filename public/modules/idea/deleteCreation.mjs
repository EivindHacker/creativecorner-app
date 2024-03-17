import postTo from "../httpmethods/postTo.mjs";

export default async function deleteCreation(creation) {
	creation.token = localStorage.getItem("token");
	console.log(creation);
	try {
		const response = await postTo("/idea/deleteCreation", creation);
		if (response.ok) {
			const data = await response.json();

			return JSON.parse(data);
		}
	} catch (error) {
		return error.message;
	}
}
