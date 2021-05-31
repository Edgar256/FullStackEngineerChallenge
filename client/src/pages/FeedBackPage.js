import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import isAuthenticatedEmployee from "../utils/isAuthenticatedEmployee";
import axios from "axios";
import setId from "../utils/setId";
import { apiURL } from "../utils/constants";
import { titleCase, trimDate } from "../utils/helperFunctions";

export default function FeedBackPage() {
	const history = useHistory();
	const [review, setReview] = useState([]);
	const [feedback, setFeedback] = useState("");

	let id;
	const token = window.localStorage.getItem("token");
	const reviewID = window.localStorage.getItem("currentReview");

	useEffect(() => {
		if (!token) return history.push("/login");
		if (!isAuthenticatedEmployee(token)) return history.push("/login");

		axios
			.get(`${apiURL}/reviews/employee/${reviewID}`)
			.then((res) => {
				setReview(res.data.message);
			})
			.catch((error) => {
				return error;
			});
	}, []);
	id = setId(token);

	const handleFeedBackChange = (e) => {
		setFeedback(e.target.value);
	};
	const data = {
		review: reviewID,
		author: id,
		description: feedback,
	};
	const handleSubmitFeedback = () => {
		if (!data.description) return alert("Please add feedback");
		console.log(data);
		axios
			.post(`${apiURL}/feedbacks`, data)
			.then((res) => {
				console.log(res.data)
			})
			.catch((error) => {
				return error;
			});
	};
	return (
		<div>
			<NavBar />
			<div className="container">
				<h2 className="my-2">Write Feedback</h2>
				<div className="w-100 d-flex">
					<div className="mt-5 w-50">
						{review.length < 1 ? null : (
							<div>
								<h5>EMPLOYEE NAMES</h5>
								<p>
									{titleCase(review.employee.firstName)}{" "}
									{titleCase(review.employee.lastName)}
								</p>
								<h5>TITLE</h5>
								<p>{titleCase(review.title)}</p>
								<h5>TITLE</h5>
								<p>{review.description}</p>
							</div>
						)}
					</div>
					<div className="w-50">
						<p>Please submit feedback for this performance review</p>
						<textarea
							className="form-control"
							rows="10"
							onChange={handleFeedBackChange}
						/>
						<button
							className="btn btn-success mt-3"
							onClick={handleSubmitFeedback}
						>
							SUBMIT
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
