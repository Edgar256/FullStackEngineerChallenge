const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

const path = require("path");

// constants
const API_URL = process.env.API_URL;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT || 4400;

// route imports
const employeesRoute = require("./routes/employees");
const reviewsRoute = require("./routes/reviews");
const adminsRoute = require("./routes/admins");
const feedbacksRoute = require("./routes/feedbacks");

// enabling Cross Site Origin Requests
app.use(cors());
app.use("*", cors());

// middlewares
app.use(express.json());
// app.use(authJwt()); Disable Auth for Deployment of FrontEnd pages
app.options(morgan("tiny"));

// routes middleware
app.use(`${API_URL}/employees`, employeesRoute);
app.use(`${API_URL}/admins`, adminsRoute);
app.use(`${API_URL}/reviews`, reviewsRoute);
app.use(`${API_URL}/feedbacks`, feedbacksRoute);

mongoose
	.connect(CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log(`Database Connection ready...`);
	})
	.catch((error) => {
		console.log(error);
	});

if (process.env.NODE_ENV === "production") {
	console.log(`******************  production environment ***********`);
	console.log(path.resolve(__dirname, "client/build", "index.html"));

	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}${API_URL}`);
});
