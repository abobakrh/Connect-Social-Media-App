// import CircularProgress from "@mui/material/CircularProgress";
// import { CircularProgress } from "@mui/material";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
export default function Login() {
	const email = useRef();
	const password = useRef();
	const { isFetching, dispatch } = useContext(AuthContext);
	const handleLoginClick = (e) => {
		e.preventDefault();
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
				<form
					className="loginRight"
					onSubmit={handleLoginClick}
				>
					<input
						type="email"
						placeholder="Email"
						required
						ref={email}
					/>
					<input
						type="password"
						placeholder="Password"
						required
						minLength="6"
						ref={password}
					/>
					<button disabled={isFetching}>
						{isFetching ? "loading" : "Log In"}
					</button>
					<span>Forgot Password ?</span>
					<button>
						<Link to="/register">
							{isFetching ? "loading" : "Create a New Account"}
						</Link>
					</button>
				</form>
			</div>
		</div>
	);
}
