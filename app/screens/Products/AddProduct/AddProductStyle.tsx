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
});
