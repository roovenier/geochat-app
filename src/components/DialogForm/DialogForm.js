import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';

import stylesObj from './styles';
const styles = StyleSheet.create(stylesObj);

export default class DialogForm extends Component {
	constructor(props) {
		super(props);
		this.state = { message: '' };
	}

	render() {
		return (
			<View style={styles.form}>
				<TextInput
					multiline={true}
					autoFocus={true}
					placeholder={'Type something...'}
					value={this.state.message}
					ref="input"
					style={styles.input}
					onChangeText={message => this.setState({message})}
				/>

				<TouchableHighlight
					style={styles.button}
					underlayColor={'#38ad40'}
					onPress={e => this.sendMessage()}>
					<Text style={styles.buttonText}>SEND</Text>
				</TouchableHighlight>
			</View>
		);
	}

	sendMessage() {
		if(this.state.message.trim()) {
			this.props.sendMessage(this.state.message.trim());
			this.refs.input.clear(0);
			this.setState({message: ''});
		}
	}
}
