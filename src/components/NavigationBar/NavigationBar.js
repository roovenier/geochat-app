import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import stylesObj from './styles';

const styles = StyleSheet.create(stylesObj);

export default class NavigationBar extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.title}</Text>
			</View>
		);
	}
}
