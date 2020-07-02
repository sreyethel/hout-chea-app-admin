import { StyleSheet } from "react-native";
import modules from "../../../modules";

export const styles = StyleSheet.create({
	textfield: {
		marginBottom: modules.BODY_HORIZONTAL
	},
	textAreaContainer: {
		marginBottom: modules.BODY_HORIZONTAL
	},
	textArea: {
		minHeight: 150,

		marginBottom: modules.BODY_HORIZONTAL
	},
	listView: {
		marginBottom: modules.BODY_HORIZONTAL
	},
	leftBox: {
		flex: 1,
		marginRight: modules.BODY_HORIZONTAL / 2
	},
	rightBox: {
		flex: 1,
		marginLeft: modules.BODY_HORIZONTAL / 2
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		backgroundColor: 'blue',
		marginBottom: 10
	},
	text: {
		color: 'white',
		fontSize: 20,
		textAlign: 'center'
	},
	image: {
		width: '100%',
		height: '100%'
	},
	imageContainer: {
		width: modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 2,
		height: modules.VIEW_PORT_WIDTH / 2,
		marginHorizontal: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS,
		overflow: 'hidden'
	},
	selectImageText: {
		fontSize: modules.FONT,
		fontWeight: '500',
		color: '#555',
		marginBottom: modules.BODY_HORIZONTAL
	},
	actionSheetButton: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	icon: {
		fontSize: modules.FONT_H1,
		marginHorizontal: modules.BODY_HORIZONTAL * 4,
		color: modules.COLOR_MAIN,
		marginBottom: modules.BODY_HORIZONTAL / 2
	},
	modal: {
		backgroundColor: 'transparent',
		justifyContent: 'flex-end'
	},
	containerModal: {
		backgroundColor: modules.WHITE,
		height: modules.VIEW_PORT_HEIGHT / 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	descText: {
		color: '#999',
		marginTop: modules.BODY_HORIZONTAL,
		marginBottom: modules.BODY_HORIZONTAL / 2
	},
	textAreaAndroid: {
		padding: 12
	},
	containDetail: {
		padding: 12,
		marginBottom: 6,
		backgroundColor: '#fff',
		flexDirection: 'row',

	},
	imgProduct: {
		width: modules.VIEW_PORT_WIDTH / 4,
		height: modules.VIEW_PORT_WIDTH / 4,
		borderRadius: 4
	},
	containText: {
		paddingHorizontal: 12
	},
	name: {
		fontSize: modules.FONT,
		fontWeight: '500',
		color: '#555',
	},
	textqty: {
		fontSize: modules.FONT_S,
		fontWeight: '300',
		color: modules.BLUE,
	},
	oldqty: {
		color: modules.SUB_TEXT,
		fontWeight: '500',
		fontSize: modules.FONT_S,


	},
	priceContainer: {
		borderRadius: modules.CARD_RADIUS,
		borderColor: '#e0e0e0',
		flexDirection: 'row',
		paddingTop: modules.BODY_HORIZONTAL,
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1
	},
	price: {
		fontWeight: '700',
		marginHorizontal: 4,
		marginBottom: 4,
		color: 'rgba(0,0,0,0.8)',
		fontSize: modules.FONT - 3,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingVertical: modules.BODY_HORIZONTAL / 2,
		backgroundColor: modules.BORDER_COLOR,
		borderRadius: modules.RADIUS,
		borderWidth:1
	},
});
