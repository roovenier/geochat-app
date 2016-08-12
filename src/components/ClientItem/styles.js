const styles = {
	item: {
		//backgroundColor: 'grey'
	},
	client: {
		flexDirection: 'row',
		padding: 15
	},
	avatar: {
		marginRight: 20,
		width: 60,
		height: 60,
		borderRadius: 8
	},
	data: {
		flex: 1,
		justifyContent: 'center'
	},
	status: {
		flexDirection: 'row'
	},
	name: {
		fontSize: 14,
		backgroundColor: '#000'
	},
	circle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: -10,
		marginLeft: 3,
		width: 18,
		height: 18,
		backgroundColor: '#d02121',
		borderRadius: 9,
		overflow: 'hidden'
	},
	notifications: {
		fontSize: 11,
		fontWeight: 'bold',
		color: '#fff'
	},
	distance: {
		marginTop: 8,
		flexDirection: 'row',
		alignItems: 'center'
	},
	icon: {
		marginRight: 5,
		width: 16,
		height: 16
	},
	value: {
		fontSize: 14
	}
};

export default styles;
