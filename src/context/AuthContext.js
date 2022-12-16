import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
	user: {
		_id: "635ec8d2e2705f395ce9855a",
		username: "user1",
		email: "user1@gmail.com",
		password: "123456",
		profilePicture: "person/1.jpeg",
		coverPicture: "",
		followers: [],
		followings: [],
		isAdmin: false,
	},
	isFetching: false,
	error: false,
};
export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				isFetching: state.isFetching,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
