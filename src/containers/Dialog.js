import React, { Component } from 'react';
import { connect } from 'react-redux';
import DialogPage from '../components/DialogPage/DialogPage';
import { addMessage } from '../actions/messages';
import { removeNotification } from '../actions/notifications';
import { getDistance, guidGenerator } from '../helpers';

class Dialog extends Component {
	render() {
		const { clientMe, clients } = this.props.clients;

		const interlocutor = clients.filter(item => item.id === this.props.interlocutorId)[0] || null;

		return (
			<DialogPage
				interlocutor={interlocutor}
				clientMe={clientMe}
				messages={this.props.messages}
				sendMessage={text => this.sendMessage(text)}
			/>
		);
	}

	shouldComponentUpdate(nextProps) {
		if(JSON.stringify(nextProps.messages) !== JSON.stringify(this.props.messages) || JSON.stringify(nextProps.notifications) !== JSON.stringify(this.props.notifications) || JSON.stringify(nextProps.clients) !== JSON.stringify(this.props.clients)) {
			return true;
		}
		return false;
	}

	componentDidMount() {
		this.props.dispatch(removeNotification(this.props.clients.clientMe.id, this.props.interlocutorId));
	}

	componentDidUpdate() {
		this.props.dispatch(removeNotification(this.props.clients.clientMe.id, this.props.interlocutorId));
	}

	sendMessage(text) {
		const messageObj = {
			sender: this.props.clients.clientMe.id,
			id: guidGenerator(),
			date: Math.floor(Date.now() / 1000),
			text
		}
		this.props.dispatch(addMessage(this.props.interlocutorId, messageObj));
		this.props.socket.emit('adding message', {recipient: this.props.interlocutorId, sender: this.props.clients.clientMe.id, message: messageObj});
		this.props.socket.emit('adding notification', {recipient: this.props.interlocutorId, sender: this.props.clients.clientMe.id});
	}
}

function select(state) {
	return {
		messages: state.messages,
		clients: state.clients,
		notifications: state.notifications,
		socket: state.socket
	};
}

export default connect(select)(Dialog);
