import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useHistory } from "react-router-dom";
import { apiURL } from "../utils/constants";
import axios from "axios";

export default function SignInPage() {
	let history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const employeeDetails = {
		email,
		password,
	};

	async function handleLogin(e) {
		e.preventDefault();
		const data = await axios
			.post(`${apiURL}/employees/login`, employeeDetails)
			.then((res) => {
				return res.data;
			});
		if (data.success) {
			window.localStorage.setItem("token", data.message);
			return history.push("/performance-reviews");
		} else if (data.success === false) {
			return setError(data.error);
		} else {
			console.log(data);
			return data;
		}
	}

	return (
		<div>
			<NavBar />
			<div className="container pt-5 custom-container">
				<h1 className="h3 mb-3 font-weight-normal w-100 text-center my-5">
					Please sign in
				</h1>
				<div className="text-danger">{error}</div>
				<input
					type="email"
					className="form-control my-2"
					placeholder="Email address"
					required
					autoFocus
					onChange={handleEmailChange}
				/>
				<input
					type="password"
					className="form-control my-2"
					placeholder="Password"
					required
					onChange={handlePasswordChange}
				/>
				<button
					className="btn btn-lg btn-primary btn-block"
					onClick={handleLogin}
				>
					Sign in
				</button>
				<div class="w-100 d-flex justify-content-between">
					Do not have Account ? <Link to="/register">Register</Link>
				</div>
				<p className="mt-5 mb-3 text-muted">
					&copy;<i>Edgar Tinkamanyire 2021-2022</i>
				</p>
			</div>
		</div>
	);
}
