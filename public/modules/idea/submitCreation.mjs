import postTo from "../httpmethods/postTo.mjs";

export default async function submitCreation(creation) {
	creation.token = localStorage.getItem("token");
	if (creation.token) {
		try {
			const response = await postTo("/idea/submitCreation", creation);
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
