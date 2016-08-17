import React, { Component } from 'react';
import { connect } from 'react-redux';

import IndexPage from '../components/IndexPage/IndexPage';
import Dialog from './Dialog';

class Index extends Component {
	render() {
		const { clients, notifications } = this.props;
		const { clientMe } = this.props.clients;

		return (
			<IndexPage
				clientMe={clientMe}
				clients={clients}
				notifications={notifications}
				openDialog={id => this.openDialog(id)}
			/>
		);
	}

	openDialog(id) {
		this.props.navigator.push({
			name: 'Dialog',
			component: Dialog,
			interlocutorId: id
		});
	}
}

function select(state) {
	return {
		clients: state.clients,
		notifications: state.notifications
	};
}

export default connect(select)(Index);
