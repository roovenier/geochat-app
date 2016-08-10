import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigatorIOS } from 'react-native';
import io from 'socket.io-client/socket.io';
//import { Router, routerReducer, Route, Container, Animations, Schema } from 'react-native-redux-router';
//import {Scene, Router} from 'react-native-router-flux';
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
//import { Promise } from 'es6-promise';
//import 'normalize.css';

import csscolors from '../colors.json';
import { getCoords, pickRandomProperty } from '../helpers';
import { setClientMe, setClients } from '../actions/clients';
import { addMessage } from '../actions/messages';
import { addNotification } from '../actions/notifications';
import { setSocket } from '../actions/socket';

//import styles from '../components/common.styl';
// import Header from '../components/Header/Header';
//import Profile from '../components/Profile/Profile';
//import MainPage from '../components/MainPage/MainPage';
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
				resolve({colorName, colorHex});
			})
		, getCoords])
			.then(values => {
				values[1] = {latitude: 56.761757, longitude: 54.150153};
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
