import { StyleSheet } from 'react-native';
import modules from '../modules';

export default StyleSheet.create({
	center: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	formGroups: {
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		marginVertical: modules.BODY_HORIZONTAL,
		borderBottomColor: modules.BORDER,
		borderBottomWidth: 1,
		borderTopColor: modules.BORDER,
		borderTopWidth: 1,
		paddingVertical: modules.BODY_HORIZONTAL
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	containerPrimary: {
		flex: 1,
		backgroundColor: modules.BACKGROUND
	},
	container: {
		flex: 1,
		backgroundColor: modules.BACKGROUND,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	containerWhite: {
		flex: 1,
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},

	separate: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},

	border: {
		borderBottomColor: modules.BORDER_COLOR,
		borderBottomWidth: 1
	},
	containItems: {
		paddingTop: modules.BODY_HORIZONTAL,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	itemSeparator: {
		height: 1,
		backgroundColor: modules.BORDER_COLOR
	},
	contentModal: {
		backgroundColor: 'white',
		padding: modules.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 0,
		borderColor: 'rgba(0, 0, 0, 0.1)'
	},
	bottomModal: {
		justifyContent: 'flex-end',
		margin: 0
	},
	imgFilter: {
		backgroundColor: 'rgba(0,0,0,.25)',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	flx2: {
		flex: 2
	},
	column: {
		flexDirection: 'column',
		justifyContent: 'center'
	},
	org: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: modules.BODY_HORIZONTAL
	},
	avatar: {
		width: 50,
		height: 50,
		borderColor: '#ebebeb',
		borderWidth: 1,
		borderRadius: 50 / 2
	},
	fake: {
		height: 80
	},
	iconTabContainer: {
		height: '100%',
		width: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
		paddingBottom: modules.SPACE
	},
	TopTabActive: {
		color: modules.WHITE,
		fontSize: 15
	},
	TopTab: {
		fontSize: 15,
		color: modules.WHITE_SUB
	},
	labelTabActive: {
		color: modules.PRIMARY,
		fontSize: 12
	},
	labelTab: {
		fontSize: 12,
		color: modules.PRIMARY_TAB
	},
	body: {
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	bodyIcon: {
		paddingHorizontal: modules.BODY_HORIZONTAL - 10
	},
	containerSafeView: {
		backgroundColor: modules.WHITE
	},
	containModal: {
		backgroundColor: '#FFF',
		paddingVertical: modules.BODY_HORIZONTAL / 2
	},
	backgroundSafe: {
		backgroundColor: modules.WHITE
	},
	backgroundSafeModal: {
		backgroundColor: modules.WHITE
	},
	containerColorPrimary: {
		flex: 1,
		backgroundColor: modules.PRIMARY
	},
	flx1: {
		flex: 1
	},
	rows: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	centerMode: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	shadow: {
		// backgroundColor:"#FFF",
		shadowColor: 'rgba(0,0,0,.54)',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 10,
		shadowOpacity: 0.15,
		elevation: 2
	},
	cardShadow: {
		shadowColor: '#CFCCDC',
		shadowOffset: {
			width: 0,
			height: 15
		},
		shadowRadius: 20,
		shadowOpacity: 0.65,
		elevation: 15
	},
	shadowSmall: {
		shadowColor: '#CFCCDC',
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowRadius: 2,
		shadowOpacity: 0.21,
		elevation: 8
	},
	statisticContainer: {
		backgroundColor: modules.WHITE,
		marginBottom: modules.BODY_HORIZONTAL / 2,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	background: {
		backgroundColor: '#F1f2f4',
		flex: 1
	},
	SHADOW1: {
		backgroundColor: '#fff',
		shadowColor: '#efeeec',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowRadius: 10,
		shadowOpacity: 0.5,
		elevation: 0
	}
});
