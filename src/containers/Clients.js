import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientsList from '../components/ClientsList/ClientsList';

class Clients extends Component {
	render() {
		const { clients, clientMe } = this.props.clients;
		const { notifications } = this.props;

		return (
			<ClientsList
				clients={clients}
				clientMe={clientMe}
				notifications={notifications}
			/>
		);
	}
}

function select(state) {
	return {
		clients: state.clients,
		notifications: state.notifications
	};
}

export default connect(select)(Clients);
