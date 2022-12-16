import CircularProgress from "@mui/material/CircularProgress";
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);
	const handleLoginClick = (e) => {
		e.preventDefault();
		console.log(
			`user email is ${email.current.value} and password is ${password.current.value}`
		);
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		);
	};
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">Connect</h3>
					<span className="loginDesc">
						Connect with friends and the world around you
					</span>
				</div>
				<form className="loginRight" onSubmit={handleLoginClick}>
					<input type="email" placeholder="Email" required ref={email} />
					<input
						type="password"
						placeholder="Password"
						required
						minLength="6"
						ref={password}
					/>
					<button disabled={isFetching}>
						{isFetching ? (
							<CircularProgress color="white" size="20px" />
						) : (
							"Log In"
						)}
					</button>
					<span>Forgot Password ?</span>
					<button>
						{isFetching ? (
							<CircularProgress color="white" size="20px" />
						) : (
							"Create a New Account"
						)}
					</button>
				</form>
			</div>
		</div>
	);
}
