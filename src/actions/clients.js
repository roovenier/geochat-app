export const SET_CLIENTS = 'SET_CLIENTS';
export const SET_CLIENT_ME = 'SET_CLIENT_ME';

export function setClients(clients) {
	return {type: SET_CLIENTS, clients};
}

export function setClientMe(clientMe) {
	return {type: SET_CLIENT_ME, clientMe};
}
