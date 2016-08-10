import React, { Component } from 'react';
import styles from './styles.styl';

export default class Interlocutor extends Component {
	render() {
		const { interlocutor } = this.props;

		return (
			<div>
				<div className={styles.interlocutor}>
					<div className={styles.avatar} style={{backgroundColor: interlocutor.colors.hex}}></div>

					<div className={styles.data}>
						<p className={styles.title}>
							<span className={styles.name} style={{color: interlocutor.colors.hex}}>Mr. {interlocutor.colors.name}</span> dialog
						</p>

						<p className={styles.prop}>
							ID: <span className={styles.value}>{interlocutor.id}</span>
						</p>

						<p className={styles.prop}>
							Geoposition: <span className={styles.value}>{interlocutor.coords.latitude}, {interlocutor.coords.longitude} (~{Math.round(interlocutor.distance * 1000)}m from you)</span>
						</p>

						<p className={styles.distance}>~{Math.round(interlocutor.distance * 1000)}m from you</p>
					</div>
				</div>
			</div>
		);
	}
}
