const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

AdminSchema.virtual("id").get(function () {
	return this._id;
});
AdminSchema.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("admins", AdminSchema);
