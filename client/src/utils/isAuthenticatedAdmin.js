import jwt from "jsonwebtoken";

export default function isAuthenticatedAdmin(token) {
	const tokenDecode = jwt.decode(token);
	return tokenDecode && tokenDecode.role === "admin" ? true : false;
}
