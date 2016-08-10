import React, { Component } from 'react';
import { stripHTML } from '../../helpers';
import styles from './styles.styl';

export default class DialogForm extends Component {
	render() {
		return (
			<div className={styles.form}>
				<div className={styles.msgField} contentEditable="true" ref="msgField" onKeyDown={e => this.keyDown(e)}></div>

				<button className={styles.send} onClick={e => this.sendMessage(this.refs.msgField.innerHTML)}>Send</button>
			</div>
		);
	}

	keyDown(e) {
		if(e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			this.sendMessage(this.refs.msgField.innerHTML);
		}
	}

	sendMessage(text) {
		text = stripHTML(text).trim();

		if(text.length > 0) {
			this.props.sendMessage(text);
			this.refs.msgField.innerHTML = '';
		}
	}
}
