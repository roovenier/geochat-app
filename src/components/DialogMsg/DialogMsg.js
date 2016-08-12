import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stylesObj from './styles';

export default class DialogMsg extends Component {
	render() {
		const { item, client, date } = this.props;

		const stylesMW = Object.assign({}, stylesObj, {
			avatar: Object.assign({}, stylesObj.avatar, {backgroundColor: client.colors.hex})
		});
		const styles = StyleSheet.create(stylesMW);

		return (
			<View style={styles.item}>
				<View style={styles.avatar} />

				<View style={styles.message}>
					<Text style={styles.date}>{date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}</Text>

					<Text style={styles.text}>{item.text}</Text>
				</View>
			</View>
		);
	}
}
