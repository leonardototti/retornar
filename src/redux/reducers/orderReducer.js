import orderConstants from "../constants/orderConstants";

const defaultState = {
	orders: [],
};

export default function reducer(state = defaultState, action) {
	let newState = {};
	let newData;
	let index;

	switch( action.type )
	{
		case orderConstants.ORDER_CREATE:
			newData = action.payload;

			newState = Object.assign({}, state, {
				orders: [
					...state.orders,
					newData,
				],
			});

			return newState;

		case orderConstants.ORDER_DELETE:
			newData = [...state.orders];

			index = newData.findIndex((order) => order.id === action.data.id);

			if( index > -1 )
			{
				newData.splice(index, 1);
			}

			return Object.assign({}, state, {
				orders: newData,
			});

		default:
			return state;
	}
}
