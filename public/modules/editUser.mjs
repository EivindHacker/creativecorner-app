import postTo from "./postTo.mjs";

export default async function editUser(type, userInfo) {
	console.log(type);
	const token = localStorage.getItem("token");

	let user = {};

	if (type === "Info") {
		user = {name: userInfo.name, email: userInfo.email, role: userInfo.role, token};
	} else {
		user = {oldPass: userInfo.oldPass, newPass: userInfo.newPass, token};
	}

	try {
		const response = await postTo(`/user/updateUser${type}`, user);

		if (response.ok) {
			const data = await response.json();
			const dataRes = JSON.parse(data);

			if (data.data) {
				const token = data.data;
				localStorage.setItem("token", token);
			}
			return dataRes;
		}
	} catch (error) {
		return error;
	}
}
