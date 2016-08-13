import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ListView } from 'react-native';
import stylesObj from './styles';
const styles = StyleSheet.create(stylesObj);

import ClientItem from '../ClientItem/ClientItem';

export default class ClientsList extends Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.clientsRows = null;
	}

	render() {
		const { clients, clientMe, notifications } = this.props;

		this.clientsRows = this.ds.cloneWithRows(clients);

		return (
			<View style={styles.container}>
				<View style={styles.clients}>
					<Text style={styles.title}>Current users near you:</Text>

					{clients.length > 0 ? (
						<ScrollView automaticallyAdjustContentInsets={false}>
							<ListView
								automaticallyAdjustContentInsets={false}
								dataSource={this.clientsRows}
								renderRow={item => <ClientItem key={item.id} item={item} clientMe={clientMe} notifications={notifications} openDialog={id => this.props.openDialog(id)} />}
							/>
						</ScrollView>
					) : <Text style={styles.nobody}>Nobody&#39;s here :(</Text>}
				</View>
			</View>
		);
	}
}
