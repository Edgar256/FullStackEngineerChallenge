import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";
import axios from "axios";
import setId from "../utils/setId";
import { apiURL } from "../utils/constants";
import { titleCase, trimDate } from "../utils/helperFunctions";
import isAuthenticatedAdmin from "../utils/isAuthenticatedAdmin";

export default function AdminEmployeesPage() {
	const history = useHistory();
	const [employees, setEmployees] = useState([]);
	let id;
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		if (!token) return history.push("/admin-login");
		if (!isAuthenticatedAdmin(token)) return history.push("/admin-login");
		id = setId(token);
		axios
			.get(`${apiURL}/employees`)
			.then((res) => {
				console.log(res.data.message);
				setEmployees(res.data.message);
			})
			.catch((error) => {
				return error;
			});
	}, []);
	const openEmployeePage = (id) => {
		window.localStorage.setItem("currentEmployee", id);
		history.push("/admin-employee-details");
	};

	return (
		<div>
			<AdminNavBar />
			<div className="container">
				<h2 className="my-2">Employees</h2>
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th scope="col">DATE JOINED</th>
								<th scope="col">FIRST NAME</th>
								<th scope="col">LAST NAME</th>
								<th scope="col">EMAIL</th>
								<th scope="col"></th>
							</tr>
						</thead>
						{employees.length < 1 ? (
							<tbody className="w-100 text-center">
								<tr>
									<td>There are no reviews to give Feedback</td>
								</tr>
							</tbody>
						) : (
							employees.map((employee, id) => {
								return (
									<tbody key={id}>
										<tr>
											<th>{trimDate(employee.dateCreated)}</th>
											<td>{titleCase(employee.firstName)}</td>
											<td>{titleCase(employee.lastName)}</td>
											<td>{employee.email}</td>
											<td>
												<button
													className="btn btn-success"
													onClick={() => openEmployeePage(employee.id)}
												>
													VIEW DETAILS
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
