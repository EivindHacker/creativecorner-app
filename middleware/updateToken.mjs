import jwt from "jsonwebtoken";

export default async function updateToken(email) {
	const token = jwt.sign(
		{
			data: email,
		},
		process.env.SECRET_KEY,
		{expiresIn: "1h"}
	);

	return token;
}
