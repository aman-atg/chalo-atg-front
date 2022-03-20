import http from ".";

/**
 * 	Get
 */

const getUser = () => http.get("/user/me");

/**
 * 	Post
 */
const login = (data) => http.post("/auth/login", data);

const register = (data) => http.post("/auth/register", data);

/**
 * 	Put
 */

/**
 * 	Delete
 */

const authService = { login, register, getUser };

export default authService;
