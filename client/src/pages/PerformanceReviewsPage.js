import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import isAuthenticatedEmployee from "../utils/isAuthenticatedEmployee";
import axios from "axios";
import setId from "../utils/setId";
import { apiURL } from "../utils/constants";
import { titleCase, trimDate } from "../utils/helperFunctions";

export default function PerformanceReviewsPage() {
	const history = useHistory();
	const [reviews, setReviews] = useState([]);
	let id;
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		if (!token) return history.push("/login");
		if (!isAuthenticatedEmployee(token)) return history.push("/login");
		id = setId(token);
		axios
			.get(`${apiURL}/reviews/employee`)
			.then((res) => {
				console.log(res.data.message);
				setReviews(res.data.message);
			})
			.catch((error) => {
				return error;
			});
	}, []);
	const openFeedBackPage = (id) => {
		window.localStorage.setItem("currentReview", id);
		history.push("/feedback");
	};

	return (
		<div>
			<NavBar />
			<div className="container">
				<h2 className="my-2">Performance Reviews </h2>
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">DATE CREATED</th>
								<th scope="col">TITLE</th>
								<th scope="col">DESCRIPTION</th>
								<th scope="col">EMPLOYEE NAMES</th>
								<th scope="col"></th>
							</tr>
						</thead>
						{reviews.length < 1 ? (
							<div className="w-100 text-center">
								{" "}
								There are no reviews to give Feedback
							</div>
						) : (
							reviews.map((review, id) => {
								return (
									<tbody key={id}>
										<tr>
											<th>{trimDate(review.dateCreated)}</th>
											<td>{review.title}</td>
											<td>{review.description}</td>
											<td>
												{titleCase(review.employee.firstName)}{" "}
												{titleCase(review.employee.lastName)}
											</td>
											<td>
												<button
													className="btn btn-success"
													onClick={() => openFeedBackPage(review.id)}
												>
													SEND FEEDBACK
												</button>
											</td>
										</tr>
									</tbody>
								);
							})
						)}
					</table>
				</div>
			</div>
		</div>
	);
}
