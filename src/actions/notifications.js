export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(clientId, senderId) {
	return {type: ADD_NOTIFICATION, clientId, senderId};
}

export function removeNotification(clientId, senderId) {
	return {type: REMOVE_NOTIFICATION, clientId, senderId};
}
