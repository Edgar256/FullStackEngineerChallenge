import React, { Component } from "react";
import NavBar from "../components/NavBar";

export default class Error extends Component {
	render() {
		return (
			<div>
				<NavBar />
				<div className="container text-center">
					<p className="display-2">404 Error</p>
					<p className="display-4">Page not fount</p>
				</div>
			</div>
		);
	}
}
