import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, ListView } from 'react-native';
import stylesObj from './styles';
const styles = StyleSheet.create(stylesObj);

import ClientItem from '../ClientItem/ClientItem';

export default class ClientsList extends Component {
	render() {
		const { clients, clientMe, notifications } = this.props;

		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const clientsRows = ds.cloneWithRows(clients);

		return (
			<View style={styles.container}>
				<View style={styles.clients}>
					<Text style={styles.title}>Current users near you:</Text>

					{clients.length > 0 ? (
						<ScrollView automaticallyAdjustContentInsets={false}>
							<ListView
								automaticallyAdjustContentInsets={false}
								dataSource={clientsRows}
								renderRow={item => <ClientItem key={item.id} item={item} clientMe={clientMe} notifications={notifications} openDialog={id => this.props.openDialog(id)} />}
							/>
						</ScrollView>
					) : <Text style={styles.nobody}>Nobody&#39;s here :(</Text>}
				</View>
			</View>
		);
	}
}
