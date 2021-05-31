const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Employee = require("../models/Employee.model");
const jwt = require("jsonwebtoken");
const authAdmin = require("../helpers/authAdmin");
require("dotenv/config");

// Create New Employee
router.post("/register", async (req, res) => {
	try {
		if (
			!req.body.firstName ||
			!req.body.lastName ||
			!req.body.email ||
			!req.body.password
		)
			return res.send({
				error: "Please enter all fields",
				success: false,
			});
		// check if email already exist in the DB
		const employeeExists = await Employee.findOne({ email: req.body.email });
		if (employeeExists)
			return res.send({
				error: "email already taken, try registering with a different email",
				success: false,
			});

		// Encrypt the password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const employee = new Employee({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			passwordHash: hashedPassword,
		});

		employee
			.save()
			.then((employeeSaved) => {
				res.send({
					message: employeeSaved,
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

// Employee login route
router.post("/login", async (req, res) => {
	try {
		if (!req.body.email || !req.body.password)
			return res.send({
				error: `Please enter Email and Password`,
				success: false,
			});

		// check if employee exists
		const employee = await Employee.findOne({ email: req.body.email });

		if (!employee)
			return res.status(400).send({ error: `user not found`, success: false });

		// check if password is valid using bcrypt
		const checkPassword = await bcrypt.compare(
			req.body.password,
			employee.passwordHash
		);
		const secret = process.env.TOKEN_SECRET;
		if (!checkPassword)
			return res.json({ error: "Entered wrong password", success: false });

		const token = jwt.sign(
			{
				id: employee.id,
				role: "employee",
			},
			secret,
			{ expiresIn: "2h" }
		);

		return res.status(200).send({ message: token, success: true });
	} catch (error) {
		return res.status(500).json({ error: error, success: false });
	}
});

// Get all Employees Admin
router.get("/", authAdmin, async (req, res) => {
	try {
		const employeeList = await Employee.find().select("-passwordHash");
		res.status(200).send({ message: employeeList, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

// Count all Employees
router.get("/get/count", authAdmin, async (req, res) => {
	try {
		Employee.countDocuments({}, (error, count) => {
			if (error) return res.status(400).json({ error: error, success: false });
			return res.status(200).json({ count, success: true });
		});
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Get one Employee
router.get("/:id", async (req, res) => {
	try {
		// check for employee using ID
		const employee = await Employee.findById(req.params.id).select(
			"-passwordHash"
		);
		if (!employee)
			return res.send({
				error: `User not found`,
				success: false,
			});
		return res.send({ message: employee, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Delete Employee
router.delete("/:id", authAdmin, async (req, res) => {
	try {
		const employee = await Employee.findById(req.params.id);
		if (!employee)
			return res.send({
				error: `User not found`,
				success: false,
			});

		Employee.findByIdAndDelete(req.params.id)
			.then((employeeDeleted) =>
				res.json({ message: employeeDeleted, success: true })
			)
			.catch((error) => res.status(400).json({ error: error, success: false }));
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

module.exports = router;
