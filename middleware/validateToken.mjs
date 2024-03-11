import jwt from "jsonwebtoken";

export default async function validateToken(req, res, next) {
	// Extract token from request headers, query parameters, or cookies

	const {token} = req.body; // Assuming token is sent in the Authorization header

	if (!token) {
		return res.status(401).json({message: "Token is missing"});
	}

	try {
		// Verify and decode the token
		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		// Check if token is expired
		if (decoded.exp <= Date.now() / 1000) {
			return res.status(401).json({message: "Token has expired"});
		}

		// Token is valid
		req.emailFromToken = decoded.data;
		next();
	} catch (error) {
		return res.status(401).json({message: "Invalid token"});
	}
}
