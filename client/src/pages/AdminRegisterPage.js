import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { Link, useHistory } from "react-router-dom";
import { apiURL } from "../utils/constants";
import axios from "axios";

export default function AdminRegisterPage() {
	let history = useHistory();
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleFirstnameChange = (e) => {
		setFirstname(e.target.value);
	};
	const handleLastnameChange = (e) => {
		setLastname(e.target.value);
	};
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const adminDetails = {
		firstName: firstname,
		lastName: lastname,
		email,
		password,
	};

	async function handleRegister(e) {
		e.preventDefault();
		const data = await axios
			.post(`${apiURL}/admins/register`, adminDetails)
			.then((res) => {
				return res.data;
			})
			.catch((error) => {
				return error;
			});
		if (data.success) {
			return history.push("/admin-login");
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
					Admin Please Register
				</h1>
				<div className="text-danger">{error}</div>
				<input
					type="text"
					className="form-control my-2"
					placeholder="First name"
					required
					autoFocus
					onChange={handleFirstnameChange}
				/>
				<input
					type="text"
					className="form-control my-2"
					placeholder="Last name"
					required
					onChange={handleLastnameChange}
				/>
				<input
					type="email"
					className="form-control my-2"
					placeholder="Email address"
					required
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
					onClick={handleRegister}
				>
					Register
				</button>
				<div class="w-100 d-flex justify-content-between">
					Already have Account ? <Link to="/admin-login">Login</Link>
				</div>
				<p className="mt-5 mb-3 text-muted">
					&copy;<i>Edgar Tinkamanyire 2021-2022</i>
				</p>
			</div>
		</div>
	);
}
