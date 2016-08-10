import React, { Component } from 'react';
import { Link } from 'react-router';
import common from '../common.styl';
import styles from './styles.styl';

export default class Header extends Component {
	render() {
		return (
			<div className={styles.header}>
				<div className={common.container}>
					<Link className={styles.logo} to={'/'}>Geochat</Link>
				</div>
			</div>
		);
	}
}
