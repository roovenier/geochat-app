import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/notifications';

export default function notifications(state = {}, action) {
	switch (action.type) {
		case ADD_NOTIFICATION:
			return { ...state,
				[action.clientId]: { ...state[action.clientId],
					[action.senderId]: (state[action.clientId] && state[action.clientId][action.senderId])
						? state[action.clientId][action.senderId] + 1
						: 1
					}
				};
		case REMOVE_NOTIFICATION:
			let newState = { ...state };
			try {
				delete newState[action.clientId][action.senderId];
			} catch(e) {};
			return newState;
		default:
			return state;
	}
}
