import http from ".";

/**
 * 	Get
 */

const getRoutes = () => http.get("/route");

/**
 * 	Post
 */

const createRoute = (data) => http.post("/route", data);

/**
 * 	Put
 */

const updateRoute = (data) => http.put("/route", data);

/**
 * 	Delete
 */

const deleteRoute = (id) => http.delete(`/route/${id}`);

const mainService = { createRoute, getRoutes, deleteRoute, updateRoute };

export default mainService;
