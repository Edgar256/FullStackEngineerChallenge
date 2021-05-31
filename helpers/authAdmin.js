const jwt = require("jsonwebtoken");

async function authAdmin(req, res, next) {
	if (!req.headers["authorization"])
		return res.status(401).send({
			message: "Forbidden Operation",
			success: false,
		});
	const token = await req.headers["authorization"].split(" ")[1];
	if (token === null || token === undefined)
		return res.status(401).send({
			message: "Forbidden Operation",
			success: false,
		});
	const tokenDecode = jwt.decode(token);
	if (tokenDecode === null || tokenDecode === undefined)
		return res.status(401).send({
			message: "Forbidden Operation",
			success: false,
		});
	if (tokenDecode.role !== "admin" || !tokenDecode.role)
		return res.status(403).send({
			message: "Forbidden Operation",
			success: false,
		});
	next();
}

module.exports = authAdmin;
