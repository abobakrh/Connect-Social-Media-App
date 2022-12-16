import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
	dispatch({ type: "LOGIN_START" });
	try {
		console.log("Sending login request");
		const res = await axios.post("api/auth/login", userCredentials);
		console.log(`response of login request is ${res.data}`);
		dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
	} catch (err) {
		dispatch({ type: "LOGIN_FAIL", payload: err });
	}
};
