const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin.model");
const Employee = require("../models/Employee.model");
const Review = require("../models/Review.model");
const jwt = require("jsonwebtoken");
const authAdmin = require("../helpers/authAdmin");
const authEmployee = require("../helpers/authEmployee");

// Create New Feedback
router.post("/", authEmployee, async (req, res) => {
	try {
		if (!req.body.author || !req.body.review || !req.body.description)
			return res.send({
				error: `Please fill out all fields`,
				success: false,
			});
		// check if employee exists in the DB
		const employeeExists = await Employee.findById(req.body.author);
		if (!employeeExists)
			return res.send({
				error: `Employee not found`,
				success: false,
			});
		const reviewExists = await Review.findById(req.body.review);
		if (!reviewExists)
			return res.send({
				error: `Review not found`,
				success: false,
			});
		
		const allowedFeedback = reviewExists.allowedFeedback;
        
        console.log(allowedFeedback);

		// // check if employee review exists in the DB
		// const employeeReviewExists = await Review.findOne({
		// 	employee: req.body.employee,
		// });
		// if (employeeReviewExists)
		// 	return res.send({
		// 		error: `Employee Review already submitted`,
		// 		success: false,
		// 	});

		// const review = new Review({
		// 	title: req.body.title,
		// 	description: req.body.description,
		// 	employee: req.body.employee,
		// 	admin: req.body.admin,
		// });

		// review
		// 	.save()
		// 	.then((reviewSaved) => {
		// 		res.status(201).json({
		// 			message: reviewSaved,
		// 			success: true,
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		res.status(500).json({ error: error, success: false });
		// 	});
	} catch (error) {
		res.status(500).json({ error, success: false });
	}
});

// Get all Reviews
router.get("/", authAdmin, async (req, res) => {
	try {
		const reviewList = await Review.find().populate("employee");
		res.status(200).send({ message: reviewList, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

// Get all Reviews for one Employee
router.get("/employee", authEmployee, async (req, res) => {
	try {
		const reviewList = await Review.find().populate("employee");
		res.status(200).send({ message: reviewList, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Get one Review by employee
router.get("/employee/:id", authEmployee, async (req, res) => {
	try {
		// check for review using ID
		const review = await Review.findById(req.params.id).populate("employee");
		if (!review)
			return res.send({
				error: `Review not found`,
				success: false,
			});
		return res.send({ message: review, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Get one Review
router.get("/:id", authAdmin, async (req, res) => {
	try {
		// check for review using ID
		const review = await Review.findById(req.params.id).populate("employee");
		if (!review)
			return res.send({
				error: `Review not found`,
				success: false,
			});
		return res.send({ message: review, success: true });
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

//Delete Review
router.delete("/:id", authAdmin, async (req, res) => {
	try {
		const reviewExists = await Review.findById(req.params.id);
		if (!reviewExists)
			return res.send({
				error: `Review not found`,
				success: false,
			});

		Review.findByIdAndDelete(req.params.id)
			.then((reviewDeleted) =>
				res.json({ message: reviewDeleted, success: true })
			)
			.catch((error) => res.status(400).json({ error: error, success: false }));
	} catch (error) {
		res.status(500).json({ error: error, success: false });
	}
});

module.exports = router;
