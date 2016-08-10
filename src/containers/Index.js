import React, { Component } from 'react';
import { connect } from 'react-redux';

import IndexPage from '../components/IndexPage/IndexPage';

class Index extends Component {
	render() {
		const { clients, notifications } = this.props;
		const { clientMe } = this.props.clients;

		return (
			<IndexPage
				clientMe={clientMe}
				clients={clients}
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

export default connect(select)(Index);
