import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ListView } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import stylesObj from './styles';
const styles = StyleSheet.create(stylesObj);

import Interlocutor from '../Interlocutor/Interlocutor';
import DialogMsg from '../DialogMsg/DialogMsg';
import DialogForm from '../DialogForm/DialogForm';

export default class DialogPage extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.messagesRows = null;
		this.state = { svHeight: 0, scrollToBottomY: 0 };
	}

	render() {
		const { interlocutor, clientMe, messages } = this.props;

		if(interlocutor && messages[interlocutor.id]) {
			this.messagesRows = this.ds.cloneWithRows(messages[interlocutor.id]);
		}

		return (
			<View style={styles.container}>
				{interlocutor !== null ? (
					<View style={styles.dialog}>
						<Interlocutor interlocutor={interlocutor} />

						<View style={styles.content}>
							<ScrollView
								automaticallyAdjustContentInsets={false}
								ref="scrollview"
								onLayout={event => {
									this.setState({svHeight: event.nativeEvent.layout.height});
								}}
								onContentSizeChange={(contentWidth, contentHeight) => {
									this.setState({scrollToBottomY: contentHeight});
									this.scrollBottom(contentHeight);
								}}>
								{this.messagesRows ? (
									<ListView
  										automaticallyAdjustContentInsets={false}
										dataSource={this.messagesRows}
										renderRow={item => {
											const date = new Date(item.date * 1000);
											const client = (item.sender === interlocutor.id) ? interlocutor : clientMe;

											return <DialogMsg key={item.id} date={date} item={item} client={client} />;
										}}
									/>
								) : null}
							</ScrollView>

							<DialogForm sendMessage={text => this.props.sendMessage(text)} moveForm={yValue => this.moveForm(yValue)} />

							<KeyboardSpacer onToggle={(f, s) => this.test(f, s)} />
						</View>
					</View>
				) : <Text style={styles.disconnected}>Your interlocutor has disconnected. Please go back</Text>}
			</View>
		);
	}

	test(f, s) {
		//this.aaa = null;
		if(!f) {
			// console.log(this.state.scrollToBottomY);
			// this.scrollBottom(this.state.scrollToBottomY);
			//this.setState({lastScroll: 'sdsd'});
			//this.forceUpdate();
			// console.log(this.state.lastScroll);
			console.log(this.aaa);
			console.log(this.state.lastScroll);
			if(this.aaa !== this.state.lastScroll) {
				this.refs.scrollview.scrollTo({y: this.state.lastScroll - 255, animated: false});
			}
		} else {
			this.aaa = this.state.lastScroll;
		}
	}

	scrollBottom(scrollToBottomY) {
		if(scrollToBottomY > this.state.svHeight && this.state.svHeight !== 0) {
			this.setState({lastScroll: scrollToBottomY - this.state.svHeight});
			this.refs.scrollview.scrollTo({y: scrollToBottomY - this.state.svHeight, animated: false});
		}
	}
}
