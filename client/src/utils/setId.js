import jwt from "jsonwebtoken";

export default function setId(token) {
	const tokenDecode = jwt.decode(token);
	const id = tokenDecode.id;
	if (id) {
		return id;
	} else {
		return null;
	}
}
