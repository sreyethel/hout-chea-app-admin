import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
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

interface Props {
	title: string;
	changeTitle: (val: string) => void;
	changePrice: (val: string) => void;
	changeDescription: (val: string) => void;
	changeComparePrice: (val: string) => void;
	changeCost: (val: string) => void;
	onCategory: () => void;
	onSave: () => void;
	changeCode: (val: string) => void;
	onSelectImage: () => void;
	onSelectCamera: () => void;
	onChangeTrending: (item: any) => void;
	onChangeStatus: (item: any) => void;
	onUnitMeasurement: () => void;
	onStock: () => void;
	description: string;
	price: number;
	comparePrice: string;
	cost: number;
	selectedCategory: { name: string };
	goBack: any;
	process: boolean;
	code: string;
	image: string;
	dataSelectedProduct: any;
	selectedunitMeasurement: any;
	totalQty: number

}
interface State {
	modal: boolean;
}
export default class EditProductScreen extends React.Component<Props, State> {
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
		const { dataSelectedProduct } = this.props;
		return (
			<View style={_styles.containerPrimary}>
				<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
				<Header
					title="Edit Product"
					loading={this.props.process}
					onBack={() => this.props.goBack()}
					onEdit={true}
					isEdit={true}
					onSave={this.props.onSave}
				/>
				<View style={_styles.containerPrimary}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={{ flexDirection: 'row' }}>
							<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
							</ScrollView>
						</View>
						<View style={_styles.formGroups}>
							<OutlinedTextField
								style={{ marginTop: modules.BODY_HORIZONTAL }}
								inputContainerStyle={styles.textfield}
								label="Title"
								tintColor={modules.PRIMARY}
								labelFontSize={10}
								defaultValue={this.props.title}
								onChangeText={(val) => this.props.changeTitle(val)}
							/>
							<OutlinedTextField
								style={{ marginTop: modules.BODY_HORIZONTAL }}
								inputContainerStyle={styles.textfield}
								label="Code"
								tintColor={modules.PRIMARY}
								labelFontSize={10}
								defaultValue={this.props.code}
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
								defaultValue={this.props.description}
								onChangeText={(val) => this.props.changeDescription(val)}
							/>
							<View style={_styles.separate}>
								<Dropdown
									ref={(ref: any) => (this.trending = ref)}
									valueExtractor={({ name }: any) => name}
									label="Trending Type"
									data={trending}
									value={dataSelectedProduct.trending ? dataSelectedProduct.trending.name : ''}
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
									value={dataSelectedProduct.status ? dataSelectedProduct.status.text : ''}
									onChangeText={async () => await this.selectedStatus()}
									containerStyle={{
										width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL * 3) / 2
									}}
								/>
							</View>
						</View>
						<View style={styles.listView}>
							{/* <ListAddProduct title="Category" onPress={this.props.onCategory} icon={`filter`}>
								{this.props.selectedCategory ? <Text>{this.props.selectedCategory.name}</Text> : null}
							</ListAddProduct> */}
							<ListAddProduct title="Category" onPress={this.props.onCategory} icon={`dashboard`}>
								{this.props.selectedCategory ? <Text>{this.props.selectedCategory.name}</Text> : null}
							</ListAddProduct>
							<ListAddProduct title="Unit Measurement" onPress={this.props.onUnitMeasurement} icon={`settings-input-component`}>
								{this.props.selectedunitMeasurement ? <Text>{this.props.selectedunitMeasurement.name}</Text> : null}
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

const styles = StyleSheet.create({
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
	}
});
