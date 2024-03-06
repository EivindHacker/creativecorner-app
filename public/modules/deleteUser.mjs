import postTo from "./postTo.mjs";
import {updatePageState} from "./pageState.mjs";
import {displayLoggedIn} from "./nav.mjs";

export default async function deleteUser() {
	const token = localStorage.getItem("token");

	try {
		const response = await postTo("/user/deleteUser", {token});

		console.log(response);

		if (response.ok) {
			localStorage.removeItem("token");
			displayLoggedIn(false);
			updatePageState("thecorner");
		}

		return data;
	} catch (error) {
		return "Something went wrong on the server... If the error persists, contact the creator of the page";
	}
}
