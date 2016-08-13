import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigatorIOS } from 'react-native';
import io from 'socket.io-client/socket.io';

import csscolors from '../colors.json';
import { getCoords, pickRandomProperty, capitalizeFirstLetter } from '../helpers';
import { setClientMe, setClients } from '../actions/clients';
import { addMessage } from '../actions/messages';
import { addNotification } from '../actions/notifications';
import { setSocket } from '../actions/socket';

import Index from './Index';
import Loading from '../components/Loading/Loading';

class App extends Component {
	constructor(props) {
		super(props);

		this.socket = io('https://boiling-caverns-63422.herokuapp.com', {
			transports: ['websocket']
		});

		this.props.dispatch(setSocket(this.socket));

		this.socket.on('set my client data', data => {
			this.props.dispatch(setClientMe(data));
		});

		this.socket.on('get clients', () => {
			this.socket.emit('getting clients');
		});

		this.socket.on('setting clients', clients => {
			this.props.dispatch(setClients(clients));
		});

		this.socket.on('getting message', obj => {
			this.props.dispatch(addMessage(obj.sender, obj.message));
		});

		this.socket.on('getting notification', obj => {
			this.props.dispatch(addNotification(obj.recipient, obj.sender));
		});

		Promise.all([
			new Promise((resolve, reject) => {
				const colorName = pickRandomProperty(csscolors);
				const colorHex = csscolors[colorName];
				resolve({colorName: capitalizeFirstLetter(colorName), colorHex});
			})
		, getCoords])
			.then(values => {
				this.socket.emit('setting client metadata', {colors: values[0], coords: values[1]});
			})
			.catch(error => {
				const e = error.message || error;
				alert(e);
			});
	}

	render() {
		const { clientMe } = this.props.clients;

		if(clientMe.coords && clientMe.colors && Object.keys(this.props.socket).length !== 0) {
			return (
				<NavigatorIOS
					initialRoute={{
						title: 'Geochat',
						component: Index
					}}
					style={{flex: 1}}
				/>
			);
		} else {
			return <Loading />;
		}
	}
}

function select(state) {
	return {
		clients: state.clients,
		socket: state.socket
	};
}

export default connect(select)(App);
