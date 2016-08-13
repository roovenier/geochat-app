import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';

import stylesObj from './styles';

export default class ClientItem extends Component {
	render() {
		const { item, clientMe, notifications } = this.props;

		const stylesMW = Object.assign({}, stylesObj, {
			avatar: Object.assign({}, stylesObj.avatar, {backgroundColor: item.colors.hex}),
			name: Object.assign({}, stylesObj.name, {color: item.colors.hex})
		});

		const styles = StyleSheet.create(stylesMW);

		return (
			<TouchableHighlight style={styles.item} underlayColor='#eee' onPress={e => this.props.openDialog(item.id)}>
				<View style={styles.client}>
					<View style={styles.avatar} />

					<View style={styles.data}>
						<View style={styles.status}>
							<View style={{flexDirection: 'row'}}>
								<Text style={styles.name}> Mr. {item.colors.name} </Text>
							</View>

							{notifications[clientMe.id] && notifications[clientMe.id][item.id] ? <View style={styles.circle}><Text style={styles.notifications}>{notifications[clientMe.id][item.id]}</Text></View> : null}
						</View>

						<View style={styles.distance}>
							<Image source={require('./distance.png')} style={styles.icon} />

							<Text style={styles.value}>~{Math.round(item.distance * 1000)}m from you</Text>
						</View>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
}
