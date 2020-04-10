import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import _styles from '../../../_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MODULE from './../../../modules';
import FastImage from 'react-native-fast-image';
import { fontSemiBold, fontGSans, FontGSansSemiBold, FontGSansBold } from '../../../../functions/customFont';
import modules from './../../../modules';
import call from 'react-native-phone-call';
import Header from '../../../components/Header';

import FeatherIcon from 'react-native-vector-icons/Feather';

export interface AppProps {
	navigation: any;
	selectedOrder: any;
	onCompleteOrder: () => void;
	onCancelOrder: () => void;
	onConfirmOrder: () => void;
	loading: boolean;
	processing: boolean;
}

export interface AppState {}

export default class OrderDetailScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	_renderHeader = () => {
		return (
			<View style={styles.headerContainer}>
				<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
					<Icon style={styles.iconBack} name="arrow-left" />
				</TouchableOpacity>
			</View>
		);
	};

	_onCall = (phone: string) => {
		const args = {
			number: phone,
			prompt: true
		};
		call(args).catch(console.error);
	};

	_renderBody = () => {
		const { selectedOrder } = this.props;
		return (
			<ScrollView style={styles.BodyContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.imgContainer}>
						<FastImage
							resizeMode={FastImage.resizeMode.cover}
							style={styles.img}
							source={{ uri: selectedOrder.item.cover }}
						/>
					</View>
					<View style={styles.textContainer}>
						<View style={styles.containerOption}>
							<Text style={[ styles.text, { marginLeft: 0 } ]}>{selectedOrder.item.name}</Text>
						</View>
						<View style={styles.containerOption}>
							<Text style={styles.textlabel}>Qty :</Text>
							<Text style={styles.text}>{selectedOrder.qty}</Text>
						</View>
						<View style={styles.containerOption}>
							<Text style={styles.textlabel}>Price :</Text>
							<Text style={styles.text}>{selectedOrder.item.price}</Text>
						</View>
						<View style={styles.containerOption}>
							<Text style={styles.textlabel}>Total :</Text>
							<Text style={styles.text}>
								{Number(selectedOrder.item.price) * Number(selectedOrder.qty)}
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.descriptionContainer}>
					<Text style={styles.label}>Customer Information</Text>
					<View style={styles.wrapper}>
						<Icon style={styles.icon} name="portrait" />
						<View style={_styles.flx1}>
							<Text style={styles.labelName}>Name</Text>
							<Text style={styles.textData}>{selectedOrder.user.fullName}</Text>
						</View>
						<FeatherIcon style={styles.arrowicon} name="chevron-right" />
					</View>

					<View style={styles.wrapper}>
						<Icon style={styles.icon} name="phone" />
						<TouchableOpacity style={_styles.flx1} onPress={() => this._onCall(selectedOrder.phone)}>
							<Text style={styles.labelName}>Phone</Text>
							<Text style={styles.textData}>{selectedOrder.phone}</Text>
						</TouchableOpacity>
						<FeatherIcon style={styles.arrowicon} name="chevron-right" />
					</View>

					<View style={styles.wrapper}>
						<Icon style={styles.icon} name="room" />
						<View style={_styles.flx1}>
							<Text style={styles.labelName}>Address</Text>
							<Text style={styles.textData}>
								{selectedOrder.address ? selectedOrder.address : 'No address provided'}
							</Text>
						</View>
						<FeatherIcon style={styles.arrowicon} name="chevron-right" />
					</View>
				</View>
			</ScrollView>
		);
	};

	_renderConfirmButton = () => {
		const { loading, selectedOrder, processing } = this.props;
		if (selectedOrder.order_status.key == 1) {
			return (
				<View style={styles.buttonConfirm}>
					<TouchableOpacity
						onPress={() => this.props.onCancelOrder()}
						disabled={processing}
						style={styles.cancel}
					>
						{processing ? (
							<Text style={styles.buttontext}>Canceling.........</Text>
						) : (
							<Text style={styles.buttontext}>Cancel</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						disabled={loading}
						onPress={() => this.props.onConfirmOrder()}
						style={styles.confirm}
					>
						{loading ? (
							<Text style={styles.buttontext}>Confirming......</Text>
						) : (
							<Text style={styles.buttontext}>Confirm</Text>
						)}
					</TouchableOpacity>
				</View>
			);
		} else if (selectedOrder.order_status.key == 2) {
			return (
				<View style={styles.buttonConfirm}>
					<TouchableOpacity
						onPress={() => this.props.onCancelOrder()}
						disabled={processing}
						style={styles.cancel}
					>
						{processing ? (
							<Text style={styles.buttontext}>Canceling.........</Text>
						) : (
							<Text style={styles.buttontext}>Cancel</Text>
						)}
					</TouchableOpacity>
					<TouchableOpacity
						disabled={loading}
						onPress={() => this.props.onCompleteOrder()}
						style={styles.conplete}
					>
						{loading ? (
							<Text style={styles.buttontext}>Complete......</Text>
						) : (
							<Text style={styles.buttontext}>Complete</Text>
						)}
					</TouchableOpacity>
				</View>
			);
		} else if (selectedOrder.order_status.key == 3) {
			return (
				<View style={styles.buttonConfirm}>
					<View style={[ styles.OrderContainer, { backgroundColor: MODULE.PROGRESS_COLOR[0] } ]}>
						<Text style={styles.orderComplete}>Completed</Text>
					</View>
				</View>
			);
		} else if (selectedOrder.order_status.key == 5) {
			return (
				<View style={styles.buttonConfirm}>
					<View style={[ styles.OrderContainer, { backgroundColor: MODULE.PROGRESS_COLOR[3] } ]}>
						<Text style={styles.orderComplete}>Canceled</Text>
					</View>
				</View>
			);
		}
	};

	public render() {
		const { selectedOrder } = this.props;
		return (
			<View style={[ _styles.flx1, _styles.background ]}>
				<Header title={selectedOrder.item.name} goBack={() => this.props.navigation.goBack()} />
				{this._renderBody()}
				{this._renderConfirmButton()}
				<SafeAreaView style={{ backgroundColor: MODULE.WHITE }} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	textlabel: {
		color: MODULE.WHITE
	},
	headerContainer: {
		backgroundColor: MODULE.COLOR_MAIN,
		margin: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		..._styles.shadowSmall,
		flexDirection: 'row',
		padding: MODULE.BODY_HORIZONTAL * 2
	},
	arrowicon: {
		fontSize: MODULE.FONT_H6,
		color: MODULE.SUB_TEXT
	},
	textData: {
		color: MODULE.SUB_TEXT,
		fontSize: MODULE.FONT_H6,
		marginTop: MODULE.BODY_HORIZONTAL / 4
	},
	textShipping: {
		fontSize: MODULE.FONT_S
	},
	iconBack: {
		fontSize: MODULE.FONT_H5,
		color: MODULE.WHITE
	},
	BodyContainer: {
		flex: 1,
		marginBottom: MODULE.BODY_HORIZONTAL
	},
	imgContainer: {
		width: MODULE.BODY_HORIZONTAL * 10,
		height: MODULE.BODY_HORIZONTAL * 10,
		borderColor: MODULE.WHITE,
		borderRadius: modules.RADIUS / 2
	},
	img: {
		width: '100%',
		height: '100%'
	},
	title: {
		fontSize: MODULE.FONT
	},
	textContainer: {
		flex: 1,
		marginLeft: MODULE.BODY_HORIZONTAL * 2,
		justifyContent: 'center'
	},
	containerOption: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: MODULE.BODY_HORIZONTAL,
		flex: 1
	},
	containerStatus: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		paddingVertical: MODULE.BODY_HORIZONTAL / 2,
		borderRadius: MODULE.RADIUS_BUTTON / 2,
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		backgroundColor: MODULE.PROGRESS_COLOR[1]
	},
	confirmText: {
		color: MODULE.WHITE,
		...fontSemiBold,
		fontSize: MODULE.FONT_P
	},
	label: {
		fontSize: MODULE.FONT_H6,
		...fontGSans,
		marginBottom: MODULE.BODY_HORIZONTAL / 2,
		color: '#555'
	},
	colorBox: {
		minWidth: MODULE.BODY_HORIZONTAL * 3.5,
		minHeight: MODULE.BODY_HORIZONTAL * 3.5,
		borderRadius: MODULE.RADIUS / 2
	},
	shippingContainer: {
		borderWidth: 2,
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL,
		padding: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS,
		borderColor: MODULE.BORDER_COLOR,
		flexDirection: 'row',
		alignItems: 'center',
		height: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 6
	},
	descriptionContainer: {
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		padding: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		backgroundColor: MODULE.WHITE,
		..._styles.shadow
	},
	buttonConfirm: {
		flexDirection: 'row',
		backgroundColor: MODULE.WHITE,
		paddingHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingTop: MODULE.BODY_HORIZONTAL
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MODULE.WHITE,
		padding: MODULE.BODY_HORIZONTAL
	},
	text: {
		fontSize: MODULE.FONT_H6,
		...FontGSansSemiBold,
		color: MODULE.WHITE,
		marginLeft: MODULE.BODY_HORIZONTAL / 2
	},
	confirm: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		backgroundColor: MODULE.PROGRESS_COLOR[4]
	},
	conplete: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		backgroundColor: MODULE.PROGRESS_COLOR[0]
	},
	cancel: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		backgroundColor: MODULE.PROGRESS_COLOR[3]
	},
	buttontext: {
		color: MODULE.WHITE,
		...FontGSansBold,
		fontSize: MODULE.FONT
	},
	wrapper: {
		flexDirection: 'row',
		marginTop: MODULE.BODY_HORIZONTAL,
		borderBottomWidth: 1,
		borderColor: MODULE.BORDER_COLOR,
		paddingBottom: MODULE.BODY_HORIZONTAL,
		alignItems: 'center'
	},
	icon: {
		fontSize: MODULE.FONT_H2,
		color: MODULE.SUB_TEXT,
		marginRight: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		marginLeft: modules.BODY_HORIZONTAL
	},
	labelName: {
		...fontGSans,
		color: '#000'
	},
	orderComplete: {
		fontSize: MODULE.FONT + 2,
		color: MODULE.WHITE,
		fontWeight: '500'
	},
	OrderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS
	}
});
