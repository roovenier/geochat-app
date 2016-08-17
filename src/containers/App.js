import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigator, BackAndroid } from 'react-native';

import csscolors from '../colors.json';
import { getCoords, pickRandomProperty, capitalizeFirstLetter } from '../helpers';
import { setClientMe, setClients } from '../actions/clients';
import { addMessage } from '../actions/messages';
import { addNotification } from '../actions/notifications';
import { setSocket } from '../actions/socket';

import Index from './Index';
import Dialog from './Dialog';
import Loading from '../components/Loading/Loading';

class App extends Component {
	constructor(props) {
		super(props);

		window = Object.assign(window, { navigator: { userAgent: 'ReactNative' }});

		const io = require('socket.io-client/socket.io');
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

		BackAndroid.addEventListener('hardwareBackPress', () => {
			this.socket.emit('disconnect');
			if (this._navigator && this._navigator.getCurrentRoutes().length > 1) {
				this._navigator.pop();
				return true;
			}
			this.socket.disconnect();
			return false;
		});
	}

	render() {
		const { clientMe } = this.props.clients;

		if(clientMe.coords && clientMe.colors && Object.keys(this.props.socket).length !== 0) {
			return (
				<Navigator
					initialRoute={{name: 'Index'}}
					renderScene={(route, navigator) => this.renderScene(route, navigator)}
					configureScene={route => {
						if (route.sceneConfig) {
							return route.sceneConfig;
						}
						return Navigator.SceneConfigs.FadeAndroid;
					}}
				/>
			);
		} else {
			return <Loading />;
		}
	}

	renderScene(route, navigator) {
		this._navigator = navigator;

		switch(route.name) {
			case 'Index':
				return <Index navigator={navigator} />;
			case 'Dialog':
				return <Dialog navigator={navigator} interlocutorId={route.interlocutorId} />;
			default:
				return <Index navigator={navigator} />;
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
