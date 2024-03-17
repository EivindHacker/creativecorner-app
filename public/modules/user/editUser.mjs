import postTo from "../httpmethods/postTo.mjs";

export default async function editUser(type, userInfo) {
	const token = localStorage.getItem("token");

	if (token) {
		let user = {};

		if (type === "Info") {
			user = {name: userInfo.name, email: userInfo.email, role: userInfo.role, language: userInfo.language, token};
		} else {
			user = {oldPass: userInfo.oldPass, newPass: userInfo.newPass, token};
		}

		try {
			const response = await postTo(`/user/updateUser${type}`, user);

			if (response.ok) {
				const data = await response.json();
				const dataRes = JSON.parse(data);

				if (dataRes.data) {
					const token = dataRes.data;
					localStorage.setItem("token", token);
				}
				return dataRes;
			}
		} catch (error) {
			return error;
		}
	} else {
		return "Missing token, please login again";
	}
}
