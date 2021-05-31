const mongoose = require("mongoose");

const FeedbacksSchema = mongoose.Schema({	
	description: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "employees",
		required: true,
	},
	review: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "reviews",
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
});

FeedbacksSchema.virtual("id").get(function () {
	return this._id;
});
FeedbacksSchema.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("feedbacks", FeedbacksSchema);
