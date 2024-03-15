import postTo from "../httpmethods/postTo.mjs";

export default async function getUserData() {
	const token = localStorage.getItem("token");

	if (token) {
		try {
			const response = await postTo("/user/getUserData", {token});

			if (response.ok) {
				const data = await response.json();
				const userData = JSON.parse(data);
				return userData;
			}
		} catch (error) {
			localStorage.removeItem("token");
			return error.message;
		}
	} else {
		return "";
	}
}
