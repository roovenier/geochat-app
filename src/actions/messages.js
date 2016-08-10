export const ADD_MESSAGE = 'ADD_MESSAGE';

export function addMessage(senderId, message) {
	return {type: ADD_MESSAGE, senderId, message};
}
