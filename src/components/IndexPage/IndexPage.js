import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import stylesObj from './styles';
const styles = StyleSheet.create(stylesObj);

import Profile from '../Profile/Profile';
import ClientsList from '../ClientsList/ClientsList';

export default class IndexPage extends Component {
	render() {
		const { notifications } = this.props;
		const { clients, clientMe } = this.props.clients;

		return (
			<View style={styles.container}>
				<Profile clientMe={clientMe} />

				<ClientsList
					clients={clients}
					clientMe={clientMe}
					notifications={notifications}
				/>
			</View>
		);
	}
}
