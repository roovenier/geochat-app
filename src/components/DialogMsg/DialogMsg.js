import React, { Component } from 'react';
import styles from './styles.styl';

export default class DialogMsg extends Component {
	render() {
		const { item, client, date } = this.props;

		return (
			<div className={styles.item}>
				<div className={styles.avatar} style={{backgroundColor: client.colors.hex}}></div>

				<div className={styles.message}>
					<p className={styles.date}>{date.getHours()}:{date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}</p>

					<p className={styles.text}>{item.text}</p>
				</div>
			</div>
		);
	}
}
