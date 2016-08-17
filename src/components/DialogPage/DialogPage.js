import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ListView } from 'react-native';

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
								ref="scrollview">
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

							<DialogForm sendMessage={text => this.props.sendMessage(text)} />
						</View>
					</View>
				) : <Text style={styles.disconnected}>Your interlocutor has disconnected. Please go back</Text>}
			</View>
		);
	}

	componentDidUpdate() {
		if(this.refs.scrollview) {
			this.refs.scrollview.scrollTo({y: 0, animated: false});
		}
	}
}
