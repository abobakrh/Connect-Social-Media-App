export const StartLogin = (userCredentials) => ({
	type: "LOGIN_START",
});
export const LoginSuccess = (user) => ({
	type: "LOGIN_SUCCESS",
	payload: user,
});
export const LoginFail = (error) => ({
	type: "LOGIN_FAIL",
	payload: error,
});
export const Follow = (userId) => ({
	type: "FOLLOW",
	payload: userId,
});
export const UnFollow = (userId) => ({
	type: "UnFOLLOW",
	payload: userId,
});
