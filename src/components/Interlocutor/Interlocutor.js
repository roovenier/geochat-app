import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import stylesObj from './styles';

export default class Interlocutor extends Component {
	render() {
		const { interlocutor } = this.props;

		const stylesMW = Object.assign({}, stylesObj, {
			avatar: Object.assign({}, stylesObj.avatar, {backgroundColor: interlocutor.colors.hex}),
			name: Object.assign({}, stylesObj.name, {color: interlocutor.colors.hex})
		});
		const styles = StyleSheet.create(stylesMW);

		return (
			<View>
				<View style={styles.interlocutor}>
					<View style={styles.avatar} />

					<View style={styles.data}>
						<Text style={styles.title}>
							<Text style={styles.name}> Mr. {interlocutor.colors.name} </Text> dialog
						</Text>

						<Text style={styles.distance}>~{Math.round(interlocutor.distance * 1000)}m from you</Text>
					</View>
				</View>
			</View>
		);
	}
}
