import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stylesObj from './styles';

const styles = StyleSheet.create(stylesObj);

export default class Loading extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>Loading...</Text>
			</View>
		);
	}
}
