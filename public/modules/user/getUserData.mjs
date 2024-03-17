import postTo from "../httpmethods/postTo.mjs";
import {displayLoggedIn} from "../nav.mjs";

export default async function getUserData() {
	const token = localStorage.getItem("token");

	if (token) {
		try {
			const response = await postTo("/user/getUserData", {token});

			const data = await response.json();
			const userData = JSON.parse(data);
			return userData;
		} catch (error) {
			localStorage.removeItem("token");
			displayLoggedIn(false);
			return error.message;
		}
	} else {
		return "";
	}
}
