import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isAuthenticatedAdmin from "../utils/isAuthenticatedAdmin";
import destroyAuthToken from "../utils/destroyAuthToken";
import axios from "axios";
import setId from "../utils/setId";
import { apiURL } from "../utils/constants";
import { titleCase, trimDate } from "../utils/helperFunctions";

export default function AdminNavBar() {
	const history = useHistory();
	const [employee, setEmployee] = useState([]);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	let id;
	const token = window.localStorage.getItem("token");

	useEffect(() => {
		// if (!token) return history.push("/login");
		// if (!isAuthenticatedEmployee(token)) return history.push("/login");
		if (token) {
			id = setId(token);
			setIsLoggedIn(isAuthenticatedAdmin(token));
			axios
				.get(`${apiURL}/admins/${id}`)
				.then((res) => {
					console.log(res.data.message);
					setEmployee(res.data.message);
				})
				.catch((error) => {
					return error;
				});
		}
	}, []);

	const handleLogOut = () => {
		destroyAuthToken();
		return history.push("/");
	};

	return (
		<div className="bg-dark p-y w-100">
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4 container">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Paypay
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNavDropdown">
						<ul className="navbar-nav">
							<li className="nav-item px-5">
								<Link
									className="nav-link active"
									aria-current="page"
									to="/admin-employees"
								>
									Employees
								</Link>
							</li>
							{isLoggedIn ? (
								<span className="d-flex">
									<li className="nav-item">
										<div className="nav-link">
											Hello {titleCase(employee.firstName)}
										</div>
									</li>
									<li className="nav-item">
										<div className="nav-link" onClick={handleLogOut}>
											Logout
										</div>
									</li>
								</span>
							) : (
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
							)}
						</ul>
					</div>
				</div>
			</nav>
			<nav class="navbar fixed-bottom navbar-light bg-light">
				<Link class="navbar-brand" to="/admin-login">
					Admin Login
				</Link>
			</nav>
		</div>
	);
}
