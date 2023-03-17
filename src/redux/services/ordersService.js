import { api } from "./../../config/api";

const basePath = "orders";

/**
 * Get all orders
 *
 * @returns {Promise<T>}
 */
export const getAll = () => {
	return api.get(basePath);
};

/**
 * Create new order
 *
 * @returns {Promise<T>}
 */
export const createOrder = (options) => {
	return api.post(basePath, options);
};

/**
 * Delete an order
 *
 * @returns {Promise<T>}
 */
export const deleteOrder = (id) => {
	return api.delete(`${basePath}/${id}`);
};