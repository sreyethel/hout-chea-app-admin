import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, TouchableOpacity, Platform, ActivityIndicator, Linking } from 'react-native';
import _styles from '../../../_styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MODULE from './../../../modules';
import FastImage from 'react-native-fast-image';
import { fontSemiBold, fontBold, FontGSansBold } from '../../../../functions/customFont';
import modules from './../../../modules';
import call from 'react-native-phone-call';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import { TextInput } from 'react-native-gesture-handler';
import ListItem from '../../../components/ListItem';
import { _formatShortDate, _formatDate } from '../../../services/formatdate.service';
import _ from 'lodash'
export interface AppProps {
	navigation: any;
	selectedOrder: any;
	onCompleteOrder: () => void;
	onCancelOrder: () => void;
	onConfirmOrder: () => void;
	onConfirmDelivery: (time: number) => void;
	onReturnItemOrder: () => void;
	loading: boolean;
	processing: boolean;
	defaultCoords: any
	coords: any
	processingDelivery: boolean;
	processingCompleteOrder: boolean;
	processingConfirmOrder: boolean;
	processingReturnItemOrder: boolean;
	docs: any;
	checking: boolean

}

export interface AppState {
	time: number
}

export default class OrderDetailScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			time: 0
		};
	}
	mapRef: any;

	compontDidMount() {
		this.mapRef.animateToRegion(this.props.coords);
	}
	_showPhone = () => {
		const dataPhone =this.props.selectedOrder.user.phone
		if (Platform.OS == "ios") {
			Linking.openURL(`telprompt:${dataPhone}`)
		} else {
			Linking.openURL(`tel:${dataPhone}`);
		}
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
		const { selectedOrder, defaultCoords } = this.props;
		const { checking, docs } = this.props
		return (
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.BodyContainer}>

				<View style={styles.center}>
					<Text style={[styles.title, { fontWeight: '800', marginBottom: 12 }]}>Item List</Text>
					{
						checking ? <ActivityIndicator />
							: selectedOrder.items.map((item: any, index: any) => {
								return (
									<ListItem
										key={index}
										index={index}
										data={item} />

								)
							})
					}

				</View>


				{
					selectedOrder.order_status.key == 2 ?
						<View style={styles.descriptionContainer}>
							<Text style={styles.label}>Estimate time on delivery:</Text>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<TextInput
									onChangeText={text => {
										this.setState({ time: Number(text) })
									}}
									autoFocus={true}
									style={styles.textInput}
									placeholder={"how many hour on delivery?"}
									placeholderTextColor={MODULE.SUB_TEXT}
									keyboardType={"numeric"}
								/>
								<View style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}>
									<Icon name={"truck"} style={styles.icon} />
								</View>
							</View>
						</View>
						: null

				}
				<Text style={[styles.title, { fontWeight: '800', paddingHorizontal: 12 }]}>Customer Information</Text>
				<View style={styles.descriptionContainer}>
					<View style={styles.desc}>
						<View style={styles.wrapper}>
							<View>
								<Text style={styles.labelName}>Name</Text>
								<Text>{selectedOrder.user.fullName}</Text>
							</View>
							<Icon style={styles.icon} name="user-alt" />
						</View>

						<View style={styles.wrapper}>
							<TouchableOpacity onPress={this._showPhone}>
								<Text style={styles.labelName}>Contact</Text>
								<Text>{selectedOrder.user.phone}</Text>
							</TouchableOpacity>
							<Icon style={styles.icon} name="phone" />
						</View>

						<View style={styles.wrapper}>
							<View style={_styles.flx1}>
								<Text style={styles.labelName}>Address</Text>
								{/* <Text>
									{selectedOrder?.user?.province?.en_name}, {selectedOrder?.user?.district?.en_name}{' '}
									{selectedOrder?.user?.commune?.en_name}, {selectedOrder?.user?.village?.en_name},{' '}
									{selectedOrder?.user?.street}, {selectedOrder?.user?.village?.houseNo}
								</Text> */}

							</View>
							<Icon style={styles.icon} name="map-marked" />
						</View>
						<MapView
							pointerEvents="none"
							ref={(ref) => (this.mapRef = ref)}
							region={this.props.defaultCoords ? this.props.defaultCoords : this.props.coords}
							provider={PROVIDER_GOOGLE}
							style={styles.MapStyle}
							initialRegion={this.props.defaultCoords ? this.props.defaultCoords : this.props.coords}
						>
							<Marker
								coordinate={this.props.defaultCoords ? this.props.defaultCoords : this.props.coords.latitude}
							>
								{
									selectedOrder.user.profileImageUrl ?
										<FastImage
											style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: modules.PRIMARY }}
											source={{ uri: selectedOrder.user.profileImageUrl }} />
										:
										<View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 1, borderColor: modules.TEXT }} />
								}
							</Marker>

						</MapView>
					</View>
				</View>
			</ScrollView>
		);
	};

	_renderConfirmButton = () => {
		const { loading, selectedOrder, processing, processingConfirmOrder, processingDelivery, processingReturnItemOrder, processingCompleteOrder } = this.props;
		if (selectedOrder.order_status.key == 1) {
			return (
				<View style={styles.buttonConfirm}>
					<TouchableOpacity
						onPress={() => this.props.onCancelOrder()}
						disabled={processing}
						style={styles.cancel}
					>
						{processing ? (
							<Text style={styles.buttontext}>Rejecting.........</Text>
						) : (
								<Text style={styles.buttontext}>Reject</Text>
							)}
					</TouchableOpacity>
					<TouchableOpacity
						disabled={processingConfirmOrder}
						onPress={() => this.props.onConfirmOrder()}
						style={styles.confirm}
					>
						{processingConfirmOrder ? (
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

						disabled={true}
						style={styles.time}
					>
						<Text style={[styles.buttontext, { color: MODULE.TEXT }]}>Estimate time: {this.state.time} h</Text>
					</TouchableOpacity>
					<View style={{ flex: 1 }} />
					<TouchableOpacity
						disabled={processingDelivery}
						onPress={() => this.props.onConfirmDelivery(this.state.time)}
						style={styles.conplete}
					>
						{processingDelivery ? (
							<Text style={styles.buttontext}>Confirming......</Text>
						) : (
								<Text style={styles.buttontext}>Confirm Delivery</Text>
							)}
					</TouchableOpacity>
				</View>
			);
		} else if (selectedOrder.order_status.key == 3) {
			return (
				<View style={styles.buttonConfirm}>
					<TouchableOpacity
						disabled={processingReturnItemOrder}
						onPress={() => this.props.onReturnItemOrder()}
						style={styles.return}
					>
						{processingReturnItemOrder ? (
							<Text style={styles.buttontext}>Returning......</Text>
						) : (
								<Text style={styles.buttontext}>Return Item</Text>
							)}
					</TouchableOpacity>
					<View style={{ flex: 1 }} />
					<TouchableOpacity
						disabled={processingCompleteOrder}
						onPress={() => this.props.onCompleteOrder()}
						style={styles.conplete}
					>
						{processingCompleteOrder ? (
							<Text style={styles.buttontext}>Completing......</Text>
						) : (
								<Text style={styles.buttontext}>Confirm Complete</Text>
							)}
					</TouchableOpacity>
				</View>
			);
		} else if (selectedOrder.order_status.key == 5) {
			return (
				<View style={styles.buttonConfirm}>
					<View style={[styles.OrderContainer, { backgroundColor: MODULE.PROGRESS_COLOR[5] }]}>
						<Text style={styles.orderComplete}>Item was Returned</Text>
					</View>
				</View>
			);
		}
	};

	public render() {
		const { selectedOrder, checking, docs } = this.props

		return (
			<View style={[_styles.flx1, _styles.background]}>
				<SafeAreaView style={{ backgroundColor: MODULE.COLOR_MAIN }} />
				{/* {this._renderHeader()} */}
				<View style={styles.titleContainer}>
					<View >
						<Text style={styles.title}>Time: {_formatDate(selectedOrder.order_date.seconds)}</Text>
						<Text style={styles.title}>{'Date: '}{_formatShortDate(selectedOrder.order_date.seconds)}</Text>
					</View>
					<View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
						<View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
							<Text style={styles.title}>Products: </Text>
							<Text style={[styles.title, { fontWeight: '800' }]}>{selectedOrder.order_total_products}</Text>
						</View>
						<View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
							<Text style={styles.title}>Total Price: </Text>
							<Text style={[styles.title, { fontWeight: '800' }]}>${selectedOrder.order_total_price}</Text>
						</View>
						{/* <Text style={styles.title}>{'Total Price: '}{selectedOrder.order_total_price}</Text> */}
					</View>
				</View>
				{
					docs ? docs.map((item: any) => {
						return (
							<View style={{ padding: 12, borderWidth: 4, borderColor: MODULE.PRIMARY }}>
								<Text>ITEM: {item.item.name}</Text>
								<Text>STOCK AVAIBLE: {item.stockCurrent} {item.item.unitMeasurement.code}</Text>
							</View>
						)
					})
						: null
				}
				{this._renderBody()}
				{this._renderConfirmButton()}
				<SafeAreaView style={{ backgroundColor: MODULE.WHITE }} />

			</View>
		);
	}
}

const styles = StyleSheet.create({
	completed: {
		paddingVertical: 24,
		paddingHorizontal: 40,
		backgroundColor: 'rgba(0,0,0,0.5)',
		borderWidth: 4,
		borderColor: MODULE.PRIMARY
	},
	MapStyle: {
		height: modules.VIEW_PORT_WIDTH / 2
	},
	textShipping: {
		fontSize: MODULE.FONT_S
	},
	iconBack: {
		fontSize: MODULE.FONT_H5,
		color: MODULE.WHITE
	},
	headerContainer: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		backgroundColor: MODULE.COLOR_MAIN,
		paddingBottom: MODULE.BODY_HORIZONTAL / 2
	},
	BodyContainer: {
		flex: 1,

	},
	imgContainer: {
		width: MODULE.VIEW_PORT_WIDTH,
		height: MODULE.VIEW_PORT_WIDTH,
		borderColor: MODULE.BORDER_COLOR,
		overflow: 'hidden',
		borderBottomWidth: 2
	},
	img: {
		width: '100%',
		height: '100%'
	},
	title: {
		fontSize: MODULE.FONT
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		flexWrap: 'wrap'
	},
	containerOption: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		minHeight: 77,
		marginTop: MODULE.BODY_HORIZONTAL,
		justifyContent: 'flex-start',
		alignItems: 'center',
		flexDirection: 'row',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		borderRadius: MODULE.RADIUS / 2,
		backgroundColor: MODULE.WHITE,
		padding: MODULE.BODY_HORIZONTAL
	},
	center: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		// marginTop:6,
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
		fontSize: MODULE.FONT_S,
		...fontBold,
		marginBottom: MODULE.BODY_HORIZONTAL / 2,
		color: '#555'
	},
	colorBox: {
		minWidth: MODULE.BODY_HORIZONTAL * 3.5,
		minHeight: MODULE.BODY_HORIZONTAL * 3.5,
		borderRadius: MODULE.RADIUS / 2
	},
	color: {
		minWidth: MODULE.BODY_HORIZONTAL * 3.5,
		minHeight: MODULE.BODY_HORIZONTAL * 3.5,
		borderRadius: MODULE.RADIUS / 2,
		justifyContent: 'center',
		alignItems: 'flex-end',
		flex: 1
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
		borderWidth: 2,
		// marginHorizontal: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL,
		padding: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS,
		borderColor: MODULE.BORDER_COLOR,
		backgroundColor: MODULE.WHITE
	},
	desc: {},
	buttonConfirm: {
		flexDirection: 'row',
		backgroundColor: MODULE.WHITE,
		paddingHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingTop: MODULE.BODY_HORIZONTAL
	},
	titleContainer: {
		backgroundColor: MODULE.WHITE,
		padding: MODULE.BODY_HORIZONTAL,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		fontSize: MODULE.FONT_H5,
		...FontGSansBold
	},
	confirm: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: 4,
		backgroundColor: MODULE.PROGRESS_COLOR[4]
	},
	conplete: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: 4,
		backgroundColor: MODULE.PROGRESS_COLOR[0]
	},
	return: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: 4,
		backgroundColor: MODULE.PROGRESS_COLOR[3]
	},
	time: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: 4,

	},
	cancel: {
		width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 3) / 2,

		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: MODULE.BODY_HORIZONTAL / 2,
		paddingVertical: MODULE.BODY_HORIZONTAL,
		borderRadius: 4,
		backgroundColor: MODULE.PROGRESS_COLOR[3]
	},
	buttontext: {
		color: MODULE.WHITE,
		...fontSemiBold,
		fontSize: MODULE.FONT
	},
	wrapper: {
		flexDirection: 'row',
		marginTop: MODULE.BODY_HORIZONTAL,
		borderBottomWidth: 2,
		borderColor: MODULE.BORDER_COLOR,
		paddingBottom: MODULE.BODY_HORIZONTAL,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	icon: {
		fontSize: MODULE.FONT_H5 - 2,
		color: '#555',
		marginRight: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		marginLeft: modules.BODY_HORIZONTAL
	},
	labelName: {
		...fontBold,
		color: '#555'
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
	},
	textInput: {
		padding: 12,
		backgroundColor: MODULE.BORDER,
		color: MODULE.TEXT,
		flex: 1
	}

});
