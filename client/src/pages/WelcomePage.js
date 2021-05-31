import React, { Component } from "react";
import NavBar from "../components/NavBar";
import { Link, useHistory } from "react-router-dom";

export default class WelcomePage extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="container text-center">
					<p className="display-4 py-2">Welcome to</p>
					<p className="display-1 py-2">PAYPAY</p>
					<p className="display-4 py-2">Performance Review Platform</p>
					<div className="d-flex">
						<Link to="/login" className="btn btn-success mx-auto">
							GET STARTED
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
