import Home from "./pages/home/Home";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Profile from "./pages/profile/Profile.jsx";
import "material-icons/iconfont/material-icons.css";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
	const { user } = useContext(AuthContext);
	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/"
					element={user ? <Home /> : <Register />}
				/>
				<Route
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				<Route
					path="/register"
					element={user ? <Navigate to="/" /> : <Register />}
				/>
				<Route
					path="/messenger"
					element={user ? <Messenger /> : <Login />}
				/>
				<Route
					path="/profile/:username"
					element={<Profile />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
