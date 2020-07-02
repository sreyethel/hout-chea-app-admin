import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView, Alert, Switch } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import modules from '../../../../modules';
import _styles from '../../../../_styles';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Header from '../../../../components/Header';
import ListAddProduct from '../../../../components/ListAddProduct';
import DatePicker from 'react-native-datepicker'
import DateTimePicker from '@react-native-community/datetimepicker';
export interface AppProps {
	navigation: any;
	image: string;
	name: string;
	description: string;
	onPresCamera: any;
	index: string;
	onPresImage: any;
	onSave: (expriryDate: Date, discount: number) => void;
	onChangeName: (val: any) => void;
	onChangeDescription: (val: any) => void;
	onChangeIndex: (val: any) => void;
	loading: boolean;
	dataSelectedItem: any
	toggleSwitchDiscount: () => void;
	isDiscount: boolean
	totalQty: number
}

export default class AddPromotionScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			modal: false,
			date: new Date,
			discount: Number
		};
	}

	public render() {
		const { dataSelectedItem } = this.props
		return (
			<View>
				<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
				<Header
					title="Add Promotion"
					loading={this.props.loading}
					onBack={() => this.props.navigation.goBack()}
					onEdit={true}
					isEdit={true}
					onSave={() => this.props.onSave(this.state.date, this.state.discount)}
				/>

				<View style={styles.formGroups}>
					<OutlinedTextField
						tintColor={modules.COLOR_MAIN}
						value={this.props.name}
						onChangeText={(val) => this.props.onChangeName(val)}
						label="Promotion Name"
					/>

					<OutlinedTextField
						value={this.props.description}
						onChangeText={(val) => this.props.onChangeDescription(val)}
						containerStyle={{ minHeight: 150 }}
						style={{ minHeight: 150 }}
						inputContainerStyle={styles.textArea}
						tintColor={modules.COLOR_MAIN}
						underlineColorAndroid="transparent"
						label="Promotion Description"
						numberOfLines={10}
						multiline={true}
					/>
					<View style={[{ marginTop: 12 }]}>

					</View>


					<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
						<Text>Expriry Date</Text>
						<View style={{ flex: 1 }}></View>
						<Text>Discount Price (%)</Text>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: modules.BORDER_COLOR, justifyContent: 'space-between' }}>
						<DatePicker
							style={[styles.datePicker,]}
							date={this.state.date}
							mode="datetime"
							placeholder="select date"
							minDate={new Date}
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
								},
								dateInput: {
									marginLeft: 36
								}
							}}
							onDateChange={(date) => { this.setState({ date: date }) }}
						/>

						<OutlinedTextField
							label="Discount (%)"
							inputContainerStyle={[styles.datePicker, { height: modules.VIEW_PORT_WIDTH / 10, marginBottom: 4 }]}
							tintColor={modules.PRIMARY}
							labelFontSize={10}
							onChangeText={(val) => this.setState({ discount: Number(val) })}
						/>


					</View>

					<View style={styles.listView}>
						<ListAddProduct title="Product" icon={`inbox`} onPress={() => this.props.navigation.navigate("SelectProduct")} img={dataSelectedItem?.cover}>
							{dataSelectedItem ? <Text>{dataSelectedItem.name}</Text> : null}
						</ListAddProduct>
						<ListAddProduct title="Stock" icon={`dns`} onPress={() => dataSelectedItem ? this.props.navigation.navigate('Stock') : Alert.alert("Please select product")}>
							{this.props.totalQty ? <Text>Qty: {this.props.totalQty} | {dataSelectedItem ? dataSelectedItem?.unitMeasurement.code_kh : ''}</Text> : null}
						</ListAddProduct>
					</View>

					<View style={_styles.centerMode}>
						<Text style={styles.selectImageText}>Promotion Image</Text>
						{this.props.image ? (
							<TouchableOpacity
								style={styles.imageContainer}
								onPress={() => this.setState({ modal: !this.state.modal })}
							>
								<FastImage
									resizeMode={FastImage.resizeMode.cover}
									style={styles.image}
									source={{ uri: this.props.image }}
								/>
							</TouchableOpacity>
						) : (
								<TouchableOpacity
									style={styles.imageContainer}
									onPress={() => this.setState({ modal: !this.state.modal })}
								>
									<Image style={styles.image} source={require('./../../../../../assets/download.png')} />
								</TouchableOpacity>
							)}
					</View>
				</View>

				<Modal
					onBackdropPress={() => this.setState({ modal: !this.state.modal })}
					style={styles.modal}
					isVisible={this.state.modal}
				>
					<View style={[_styles.rows, styles.containerModal]}>
						<TouchableOpacity
							onPress={async () => {
								this.setState({ modal: !this.state.modal });
								await setTimeout(() => {
									this.props.onPresCamera();
								}, 500);
							}}
							style={_styles.centerMode}
						>
							<Icon style={styles.icon} name="camera" />
							<Text>Camera</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={async () => {
								this.setState({ modal: !this.state.modal });
								await setTimeout(() => {
									this.props.onPresImage();
								}, 500);
							}}
							style={_styles.centerMode}
						>
							<Icon style={styles.icon} name="images" />
							<Text>Gallery</Text>
						</TouchableOpacity>
					</View>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	datePicker: {
		width: modules.VIEW_PORT_WIDTH / 2 - modules.BODY_HORIZONTAL_24,
		marginVertical: modules.BODY_HORIZONTAL,
	},
	formGroups: {
		backgroundColor: modules.WHITE,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		marginVertical: modules.BODY_HORIZONTAL,
		borderBottomColor: modules.BORDER,
		paddingBottom: modules.BODY_HORIZONTAL
	},

	textArea: {
		minHeight: 150,
		justifyContent: 'flex-start',
		marginTop: modules.BODY_HORIZONTAL / 2
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
		marginBottom: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL
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
	listView: {
		marginVertical: modules.BODY_HORIZONTAL
	},
	textfield: {
		// marginBottom: modules.BODY_HORIZONTAL
		height: 40,
		width: 50
	},
});
