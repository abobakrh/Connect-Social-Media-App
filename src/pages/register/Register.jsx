import axios from "axios";
import { useRef } from "react";
import "./Register.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
export default function Register() {
	const username = useRef();
	const password = useRef();
	const email = useRef();
	const passwordAgain = useRef();
	const navigate = useNavigate();
	const handleRegisterClick = async (e) => {
		e.preventDefault();
		if (password.current.value !== passwordAgain.current.value) {
			passwordAgain.current.setCustomValidity("Passwords don't match");
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("api/auth/register", user);
				navigate("/login");
			} catch (error) {
				console.log(error);
			}
		}
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
					onSubmit={handleRegisterClick}
					className="loginRight"
				>
					<input
						required
						type="text"
						placeholder="Username"
						ref={username}
					/>
					<input
						required
						ref={email}
						type="email"
						placeholder="Email"
					/>
					<input
						required
						ref={password}
						type="password"
						placeholder="Password"
						minLength="6"
					/>
					<input
						required
						ref={passwordAgain}
						type="password"
						placeholder="Password Confirmation"
						minLength="6"
					/>
					<button type="submit">Sign Up</button>
					<button>
						<Link to="/login">Log Into Account</Link>
					</button>
				</form>
			</div>
		</div>
	);
}
