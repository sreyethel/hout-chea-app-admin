import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Switch, Platform } from 'react-native';
import modules from '../../../modules';
import _styles from '../../../_styles';
import ListAddProduct from '../../../components/ListAddProduct';
import { OutlinedTextField } from 'react-native-material-textfield';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import { Dropdown } from 'react-native-material-dropdown';
import { trending, status } from '../../../dummy/config';
import Header from '../../../components/Header';
import {styles} from './AddProductStyle'
interface Props {
	title: string;
	changeTitle: (val: string) => void;
	description: string;
	changeDescription: (val: string) => void;
	price: number;
	changePrice: (val: string) => void;
	comparePrice: string;
	changeComparePrice: (val: string) => void;
	cost: number;
	changeCost: (val: string) => void;
	onCategory: () => void;
	onUnitMeasurement: () => void;
	onStock: () => void;
	selectedCategory: { name: string };
	goBack: any;
	onSave: () => void;
	process: boolean;
	code: string;
	changeCode: (val: string) => void;
	onSelectImage: () => void;
	onSelectCamera: () => void;
	onChangeTrending: (item: any) => void;
	onChangeStatus: (item: any) => void;
	selectedunitMeasurement: any
	totalQty: number;
	image: string;
	toggleSwitch: () => void;
	freeDelivery: boolean;
	deliveryNote: string;
	onDeliveryNote: (text: string) => void;
	toggleSwitchDiscount: () => void;
	isDiscount: boolean
	onDiscount: (text: number) => void;
	discount: number
}

interface State {
	modal: boolean;
}

export default class AddProductAdminScreen extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			modal: false
		};
	}

	onPresImage = async () => {
		this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			this.props.onSelectImage();
		}, 500);
	};

	onPresCamera = async () => {
		this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			this.props.onSelectCamera();
		}, 500);
	};

	trending: any;
	status: any;

	selectedTrending = async () => {
		setTimeout(async () => {
			const docs = await this.trending.selectedItem();
			await this.props.onChangeTrending(docs);
		}, 500);
	};

	selectedStatus = async () => {
		setTimeout(async () => {
			const docs = await this.status.selectedItem();
			await this.props.onChangeStatus(docs);
		}, 500);
	};

	render() {
		return (
			<View style={_styles.containerPrimary}>
				<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
				<Header
					title="Add Product"
					loading={this.props.process}
					onBack={() => this.props.goBack()}
					onEdit={true}
					isEdit={true}
					onSave={this.props.onSave}
				/>
				<View style={_styles.containerPrimary}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ flexDirection: 'row' }}>
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} />
						</View>
						<View style={_styles.formGroups}>
							<OutlinedTextField
								inputContainerStyle={styles.textfield}
								label="Title"
								tintColor={modules.PRIMARY}
								labelFontSize={10}
								value={this.props.title}
								onChangeText={(val) => this.props.changeTitle(val)}
							/>

							<OutlinedTextField
								inputContainerStyle={styles.textfield}
								label="Code"
								tintColor={modules.PRIMARY}
								labelFontSize={10}
								value={this.props.code}
								onChangeText={(val) => this.props.changeCode(val)}
							/>

							<OutlinedTextField
								label="Description"
								containerStyle={{ minHeight: 150 }}
								style={{ minHeight: 150 }}
								inputContainerStyle={styles.textArea}
								tintColor={modules.PRIMARY}
								underlineColorAndroid="transparent"
								multiline={true}
								value={this.props.description}
								onChangeText={(val) => this.props.changeDescription(val)}
							/>

							{/* <View style={[_styles.rows, { marginVertical: 12 }]}>
								<Text style={{ flex: 1 }}>Free Delivery</Text>
								<Switch
									trackColor={{ false: "#eee", true: modules.PRIMARY }}
									thumbColor={'#2b2b2b'}
									ios_backgroundColor="#eee"
									onValueChange={this.props.toggleSwitch}
									value={this.props.freeDelivery} />
							</View> */}
							{/* {
								this.props.freeDelivery ?
									<OutlinedTextField
										label="Delivery Note"
										containerStyle={{ minHeight: 150 }}
										// style={{ minHeight: 150 }}
										inputContainerStyle={styles.textArea}
										tintColor={modules.PRIMARY}
										underlineColorAndroid="transparent"

										value={this.props.deliveryNote}
										onChangeText={(val) => this.props.onDeliveryNote(val)}
									/> : null
							} */}
							{/* <View style={[_styles.rows, { marginVertical: 12 }]}>
								<Text style={{ flex: 1 }}>Discount (%)</Text>
								<Switch
									trackColor={{ false: "#eee", true: modules.PRIMARY }}
									thumbColor={'#2b2b2b'}
									ios_backgroundColor="#eee"
									onValueChange={this.props.toggleSwitchDiscount}
									value={this.props.isDiscount} />
							</View>
							{
								this.props.isDiscount ?
									<OutlinedTextField
										label="Discount Price"
										inputContainerStyle={styles.textfield}
										tintColor={modules.PRIMARY}
										labelFontSize={10}
										// value={this.props.discount}
										onChangeText={(val) => this.props.onDiscount(Number(val))}
									/> : null
							} */}

							<View style={_styles.separate}>
								<Dropdown
									ref={(ref: any) => (this.trending = ref)}
									valueExtractor={({ name }: any) => name}
									label="Trending Type"
									data={trending}
									onChangeText={async () => await this.selectedTrending()}
									containerStyle={{
										width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 3) / 2
									}}
								/>
								<Dropdown
									ref={(ref: any) => (this.status = ref)}
									valueExtractor={({ name }: any) => name}
									label="Product Status"
									data={status}
									value={status[0].name}
									onChangeText={async () => await this.selectedStatus()}
									containerStyle={{
										width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 3) / 2
									}}
								/>
							</View>




							<View style={[_styles.rows, { marginTop: modules.BODY_HORIZONTAL }]} />
						</View>
						<View style={styles.listView}>
							<ListAddProduct  title="Category" onPress={this.props.onCategory} icon={`dashboard`}>
								{this.props.selectedCategory ? <Text>{this.props.selectedCategory.name}</Text> : null}
							</ListAddProduct>
							<ListAddProduct title="Unit Measurement" onPress={this.props.onUnitMeasurement} icon={`settings-input-component`}>
								{this.props.selectedunitMeasurement ? <Text>{this.props.selectedunitMeasurement.name_kh}</Text> : null}
							</ListAddProduct>
							<ListAddProduct title="Stock" onPress={this.props.onStock} icon={`dns`}>
								{this.props.totalQty ? <Text>Qty: {this.props.totalQty} | {this.props.selectedunitMeasurement?.code}</Text> : null}
							</ListAddProduct>
						</View>
						<View style={_styles.centerMode}>
							<Text style={styles.selectImageText}>Select Image</Text>
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
										<Image style={styles.image} source={require('./../../../../assets/download.png')} />
									</TouchableOpacity>
								)}
						</View>
					</ScrollView>
					<Modal
						onBackdropPress={() => this.setState({ modal: !this.state.modal })}
						style={styles.modal}
						isVisible={this.state.modal}
					>
						<View style={[_styles.rows, styles.containerModal]}>
							<TouchableOpacity onPress={() => this.onPresCamera()} style={styles.actionSheetButton}>
								<Icon style={styles.icon} name="camera" />
								<Text>Camera</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.onPresImage()} style={styles.actionSheetButton}>
								<Icon style={styles.icon} name="images" />
								<Text>Gallery</Text>
							</TouchableOpacity>
						</View>
					</Modal>
				</View>
			</View>
		);
	}
}

const renderText = (dataText: any) => {
	return (
		<Text numberOfLines={1}>
			{dataText.map((m: any, index: any) => {
				return <Text key={index}>{m}, </Text>;
			})}
		</Text>
	);
};
