import { REHYDRATE } from "redux-persist";

const reducerKey = "general";

const defaultState = {
};

export default function reducer(state = defaultState, action) {
	switch( action.type )
	{
		case REHYDRATE:
			let persistUpdate = {};

			if( action.payload && action.payload[reducerKey] )
			{
				const persistCache = action.payload[reducerKey];

				persistUpdate = {
				};
			}

			return Object.assign({}, state, persistUpdate);

		default:
			return state;
	}
}
