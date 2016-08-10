import { combineReducers } from 'redux';
import clients from './clients';
import messages from './messages';
import notifications from './notifications';
import socket from './socket';

const geochatApp = combineReducers({
	clients,
	messages,
	notifications,
	socket
});

export default geochatApp;
