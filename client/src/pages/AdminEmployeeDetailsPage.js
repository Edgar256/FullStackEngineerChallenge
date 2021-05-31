import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import axios from "axios";
import setId from "../utils/setId";
import { apiURL } from "../utils/constants";
import { titleCase, trimDate } from "../utils/helperFunctions";
import isAuthenticatedAdmin from "../utils/isAuthenticatedAdmin";

export default function AdminEmployeeDetailsPage() {
	const history = useHistory();
	const [employee, setEmployee] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [allowedFeedbacks, setAllowedFeedbacks] = useState([]);
	const [review, setReview] = useState({});

	let id;
	const token = window.localStorage.getItem("token");
	const currentEmployee = window.localStorage.getItem("currentEmployee");
	const currentReview = window.localStorage.getItem("currentReview");

	useEffect(() => {
		if (!token) return history.push("/admin-login");
		if (!isAuthenticatedAdmin(token)) return history.push("/admin-login");
		id = setId(token);
		axios
			.get(`${apiURL}/employees/${currentEmployee}`)
			.then((res) => {
				setEmployee(res.data.message);
			})
			.catch((error) => {
				return error;
			});
		axios
			.get(`${apiURL}/employees`)
			.then((res) => {
				setEmployees(res.data.message);
			})
			.catch((error) => {
				return error;
			});
		axios
			.get(`${apiURL}/reviews/admin/${currentEmployee}`)
			.then((res) => {
				setReview(res.data.message);
			})
			.catch((error) => {
				return error;
			});
		axios
			.get(`${apiURL}/reviews/admin/feedbacks/${currentEmployee}`)
			.then((res) => {
				setAllowedFeedbacks(res.data.message);
			})
			.catch((error) => {
				return error;
			});
	}, []);

	const handleAddAllowedFeedbacks = (obj) => {
		const arr = [...allowedFeedbacks, obj];
		setAllowedFeedbacks([...new Set(arr)]);
	};

	const handleRequsetForFeedback = () => {
		console.log(allowedFeedbacks);
		axios
			.patch(
				`${apiURL}/reviews/admin/feedbacks/${currentEmployee}`,
				allowedFeedbacks
			)
			.then((res) => {
				console.log(res.data);
				setAllowedFeedbacks(res.data.message);
			})
			.catch((error) => {
				return error;
			});
	};
	console.log(review);

	return (
		<div>
			<AdminNavBar />
			<div className="container">
				<h2 className="my-2">Employee Details</h2>
				<div className="w-100 d-flex mt-5">
					<span className="w-50 p-3">
						{!employee ? null : (
							<div>
								<p>
									First name : <strong>{titleCase(employee.firstName)}</strong>
								</p>
								<p>
									Last name : <strong>{titleCase(employee.lastName)}</strong>
								</p>
								<p>
									Date Joined :{" "}
									<strong>{trimDate(employee.dateCreated)}</strong>
								</p>
								<p>
									Date Joined :{" "}
									<strong>{trimDate(employee.dateCreated)}</strong>
								</p>
							</div>
						)}
						<div>
							<h4>Select emplooyees to request for feedback for this review</h4>
							<div className="w-100">
								<button
									className="btn btn-primary"
									onClick={handleRequsetForFeedback}
								>
									SEND REQUEST FOR FEEDBACK
								</button>
							</div>
							<div className="py-3">
								{employees.length < 1
									? null
									: employees.map((employee, id) => {
											return (
												<div
													className="btn btn-secondary m-1"
													key={id}
													onClick={() => handleAddAllowedFeedbacks(employee)}
												>
													{titleCase(employee.firstName)}{" "}
													{titleCase(employee.lastName)}
												</div>
											);
									  })}
							</div>
						</div>
					</span>
					<span className="w-50">
						<div>
							{review === undefined ? (
								<div>
									<h4>Add a Review 🙉</h4>{" "}
									<div>
										
									</div>
								</div>
							) : Object.keys(review).length === 0 ? (
								<div>add feedback</div>
							) : (
								<div>
									<h4 className="text-uppercase">
										{" "}
										Review for {titleCase(review.employee.firstName)}{" "}
										{titleCase(review.employee.lastName)}
									</h4>
									<h5>TITLE</h5>
									<p>{titleCase(review.title)}</p>
									<h5>TITLE</h5>
									<p>{review.description}</p>
								</div>
							)}
						</div>
					</span>
				</div>
			</div>
		</div>
	);
}
