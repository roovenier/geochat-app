import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stylesObj from './styles';

export default class Profile extends Component {
	render() {
		const { clientMe } = this.props;

		stylesObj.avatar.backgroundColor = clientMe.colors.hex;
		stylesObj.name.color = clientMe.colors.hex;
		const styles = StyleSheet.create(stylesObj);

		return (
			<View style={styles.profile}>
				<View style={styles.avatar} />

				<Text style={styles.hello}>
					Hello <Text style={styles.name}> Mr. {clientMe.colors.name} </Text>
				</Text>

				<Text style={styles.prop}>
					<Text>Your ID: </Text>

					<Text style={styles.value}>{clientMe.id}</Text>
				</Text>

				<Text style={styles.prop}>
					<Text>Your geoposition: </Text>

					<Text style={styles.value}>{clientMe.coords.latitude},{'\n'} {clientMe.coords.longitude}</Text>
				</Text>
			</View>
		);
	}
}
