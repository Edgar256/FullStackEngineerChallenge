const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
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

EmployeeSchema.virtual("id").get(function () {
	return this._id;
});
EmployeeSchema.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("employees", EmployeeSchema);
