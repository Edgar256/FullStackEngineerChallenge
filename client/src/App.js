import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Welcome from "./pages/WelcomePage";
import PerformanceReviewsPage from "./pages/PerformanceReviewsPage";
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import setAuthToken from "./utils/setAuthToken";
import FeedBackPage from "./pages/FeedBackPage";
import AdminSignInPage from "./pages/AdminSignInPage";
import AdminRegisterPage from "./pages/AdminRegisterPage";
import AdminEmployeesPage from "./pages/AdminEmployeesPage";
import AdminEmployeeDetailsPage from "./pages/AdminEmployeeDetailsPage";

function App() {
	const token = window.localStorage.getItem("token");
	if (token) {
		setAuthToken(token);
	}

	return (
		<Router>
			<Switch>
				<Route path="/" component={Welcome} exact />
				<Route path="/login" component={SignInPage} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/performance-reviews" component={PerformanceReviewsPage} />
				<Route path="/feedback" component={FeedBackPage} />
				<Route path="/admin-login" component={AdminSignInPage} />
				<Route path="/admin-register" component={AdminRegisterPage} />
				<Route path="/admin-employees" component={AdminEmployeesPage} />
				<Route path="/admin-employee-details" component={AdminEmployeeDetailsPage} />
				<Route component={Error} />
			</Switch>
		</Router>
	);
}

export default App;
