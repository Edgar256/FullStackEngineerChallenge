const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	employee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "employees",
		required: true,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "admins",
		required: true,
	},
	allowedFeedback: {
		type: String,
		default: "",
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

ReviewSchema.virtual("id").get(function () {
	return this._id;
});
ReviewSchema.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("reviews", ReviewSchema);
