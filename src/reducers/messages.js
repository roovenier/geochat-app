import { ADD_MESSAGE } from '../actions/messages';

export default function messages(state = {}, action) {
	switch (action.type) {
		case ADD_MESSAGE:
			return { ...state, [action.senderId]: [...state[action.senderId] || [], action.message] }
		default:
			return state;
	}
}
