const styles = {
	client: {
		flexDirection: 'row',
		padding: 15
	},
	avatar: {
		marginRight: 20,
		width: 40,
		height: 40,
		borderRadius: 6
	},
	data: {
		flex: 1,
		justifyContent: 'center'
	},
	status: {
		flexDirection: 'row'
	},
	name: {
		fontSize: 12,
		backgroundColor: '#000'
	},
	circle: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: -10,
		marginLeft: 3,
		width: 16,
		height: 16,
		backgroundColor: '#d02121',
		borderRadius: 9,
		overflow: 'hidden'
	},
	notifications: {
		fontSize: 9,
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
		width: 12,
		height: 12
	},
	value: {
		fontSize: 11,
		color: '#000'
	}
};

export default styles;
