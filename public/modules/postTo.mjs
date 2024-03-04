export default async function postTo(url, data) {
	const header = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	};

	const respon = await fetch(url, header);
	return respon;
}
