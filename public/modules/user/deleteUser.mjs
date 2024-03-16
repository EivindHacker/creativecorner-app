import postTo from "../httpmethods/postTo.mjs";
import {updatePageState} from "../pageState.mjs";
import {displayLoggedIn} from "../nav.mjs";

export default async function deleteUser() {
	const token = localStorage.getItem("token");

	try {
		const response = await postTo("/user/deleteUser", {token});

		if (response.ok) {
			localStorage.removeItem("token");
			displayLoggedIn(false);
			const data = await response.json();
			return JSON.parse(data);
		}

		return data;
	} catch (error) {
		return error.message;
	}
}
