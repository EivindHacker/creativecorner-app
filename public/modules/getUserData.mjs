import postTo from "../modules/postTo.mjs";

export default async function getUserData() {
	const token = localStorage.getItem("token");

	try {
		const response = await postTo("/user/getUserData", {token});
		console.log(response);
		if (response.status !== 400) {
			const data = await response.json();

			const userData = JSON.parse(data)[0];

			return userData;
		} else {
			return "You are not logged in and will be returned to the corner in 3 seconds...";
		}
	} catch (error) {
		return "Something went wrong on the server... If the error persists, contact the creator of the page";
	}
}
