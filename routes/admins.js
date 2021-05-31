const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin.model");
const jwt = require("jsonwebtoken");
const authAdmin = require("../helpers/authAdmin");
require("dotenv/config");

// Create New Admin
router.post("/register", async (req, res) => {
	try {
		// check if email already exist in the DB
		const adminExists = await Admin.findOne({ email: req.body.email });
		if (adminExists)
			return res.status(400).json({
				error: "email already taken, try registering with a different email",
				success: false,
			});

		// Encrypt the password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const admin = new Admin({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			passwordHash: hashedPassword,
		});

		admin
			.save()
			.then((adminSaved) => {
				res.status(201).json({
					message: adminSaved,
					success: true,
				});
			})
			.catch((error) => {
				res.status(500).json({ error: error, success: false });
			});
	} catch (error) {
		res.status(500).json({ error, success: false });
	}
});

// Admin login route
router.post("/login", async (req, res) => {
	try {
		if (!req.body.email || !req.body.password)
			return res.send({
				error: `Please enter Email and Password`,
				success: false,
			});

		// check if admin exists
		const admin = await Admin.findOne({ email: req.body.email });

		if (!admin)
			return res.status(400).send({ error: `admin not found`, success: false });

		// check if password is valid using bcrypt
		const checkPassword = await bcrypt.compare(
			req.body.password,
			admin.passwordHash
		);
		const secret = process.env.TOKEN_SECRET;
		if (!checkPassword)
			return res.json({ error: "Entered wrong password", success: false });

		const token = jwt.sign(
			{
				id: admin.id,
				role: "admin",
			},
			secret,
			{ expiresIn: "2h" }
		);

		return res.status(200).send({ message: token, success: true });
	} catch (error) {
		return res.status(500).json({ error: error, success: false });
	}
});

// Get all Admins
router.get("/", authAdmin, async (req, res) => {
	try {
		const adminList = await Admin.find().select("-passwordHash");
		res.status(200).send({ message: adminList, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

// Count all Admins
router.get("/get/count", authAdmin, async (req, res) => {
	try {
		Admin.countDocuments({}, (error, count) => {
			if (error) return res.status(400).json({ error: error, success: false });
			return res.status(200).json({ count, success: true });
		});
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Get one Admin
router.get("/:id", authAdmin, async (req, res) => {
	try {
		// check for admin using ID
		const admin = await Admin.findById(req.params.id).select("-passwordHash");
		if (!admin)
			return res.send({
				error: `Admin not found`,
				success: false,
			});
		return res.send({ message: admin, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Delete Admin
router.delete("/:id", authAdmin, async (req, res) => {
	try {
		const adminExists = await Admin.findById(req.params.id);
		if (!adminExists)
			return res.send({
				error: `Admin not found`,
				success: false,
			});

		Admin.findByIdAndDelete(req.params.id)
			.then((adminDeleted) =>
				res.json({ message: adminDeleted, success: true })
			)
			.catch((error) => res.status(400).json({ error: error, success: false }));
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

module.exports = router;
