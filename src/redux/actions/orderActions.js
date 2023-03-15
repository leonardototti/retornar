import orderConstants from "../constants/orderConstants";

/**
 * Create an order
 *
 * @param data
 * @returns {{type: string, payload: *}}
 */
export const orderCreate = (data) => {
	return {
		type: orderConstants.ORDER_CREATE,
		payload: data,
	};
}

/**
 * Delete an order
 *
 * @param data
 * @returns {{type: string, data: *}}
 */
export const orderDelete = (data) => {
	return {
		type: orderConstants.ORDER_DELETE,
		data: data,
	};
}