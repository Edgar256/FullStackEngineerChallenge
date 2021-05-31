import jwt from "jsonwebtoken";

export default function isAuthenticatedEmployee(token) {
	const tokenDecode = jwt.decode(token);
	return tokenDecode && tokenDecode.role === "employee" ? true : false;
}
