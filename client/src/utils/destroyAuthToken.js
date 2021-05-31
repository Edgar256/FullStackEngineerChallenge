import axios from "axios";

export default function destroyAuthToken() {
	delete axios.defaults.headers.common["authorization"];
	localStorage.clear();
}
