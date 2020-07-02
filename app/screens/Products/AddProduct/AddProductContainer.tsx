import React from 'react';
import { inject, observer } from 'mobx-react';
import { Alert } from 'react-native';
import AddProductScreen from './AddProductScreen';
import { IProduct } from '../../../interface/product.interface';
import { createId, firestore } from '../../../services/data.service';
import { pageKey, StatusObject, toNumber } from '../../../services/mapping.service';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { toDateKey } from '../../../services/formatdate.service';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import { status, trending } from '../../../dummy/config';
import AddProductAdminScreen from './AddProductAdminScreen'
interface Props extends NavigationStackScreenProps {
	auth: any;
	product: any;
}

interface State {
	code: string;
	name: string;
	description: string;
	price: number;
	cost: number;
	comparePrice: any;
	availableStore: boolean;
	freeDelivery: boolean;
	discount: number;
	isDiscount: boolean;
	deliveryNote: string;
	images: Array<any>;
	cover: string;
	trending: any;
	status: any;
}

@inject('auth', 'product')
@observer
export default class AddProductContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			images: [],
			name: '',
			description: '',
			price: 0,
			cost: 0,
			discount: 0,
			comparePrice: '',
			availableStore: true,
			freeDelivery: false,
			isDiscount: false,
			deliveryNote: '',
			code: '',
			cover: '',
			trending: {},
			status: {}
		};
	}

	async componentDidMount() {
		await this.props.product.clearData()
	}
	_onAddProduct = async () => {
		const { profile, selectedStore } = this.props.auth;
		const { subCategory, material, size, style, varaint, UMPrice, totalQty, unitMeasurement } = this.props.product;

		if (!this.state.name) {
			Alert.alert('Invalid Title!');
			return;
		}
		if (!this.state.trending) {
			Alert.alert('Invalid Trending Type!');
			return;
		}
		if (this.state.cover == '') {
			Alert.alert('Invalid Image!');
			return;
		}
		if (!subCategory) {
			Alert.alert('Please Select Category');
			return;
		}

		const key = createId();
		let product: IProduct = {
			key: key,
			page_key: pageKey(),
			created_date_key: toDateKey(new Date()),
			created_by: profile.key,
			created_date: new Date(),
			status: StatusObject().ACTIVE,
			name: this.state.name,
			basePrice: 0,
			description: this.state.description,
			subCategoryRef: subCategory ? firestore().doc(`sub_category/${subCategory.key}`) : null,
			subCategory: subCategory ? subCategory : null,
			categoryRef: subCategory ? firestore().doc(`category/${subCategory.categoryKey}`) : null,
			category: subCategory ? subCategory.category : null,
			market: subCategory ? subCategory.category.market : null,
			umPrice: UMPrice,
			unitMeasurement: unitMeasurement,
			varaint: varaint,
			totalQty: totalQty,
			code: this.state.code,
			gallery: [],
			freeDelivery: this.state.freeDelivery,
			deliveryNote: this.state.deliveryNote,
			isDiscount: this.state.isDiscount,
			discount: this.state.discount,
			trending: this.state.trending.name ? this.state.trending : trending[0]
		};

		if (this.state.cover != '') {
			await this.props.product.uploadPhoto(product.key, this.state.cover, (img: any) => {
				if (img) {
					product.cover = img;
				}
			});
		}
		const doc: any = {
			...product
		}
		const local: any = await product.umPrice.filter((m: any) => { return m.multiply == 1 })

		if (local.length > 0) {
			doc.basePrice = Math.round(100 * local[0].price) / 100
		} else {
			const arr: any = await product.umPrice.filter((m: any) => { return m.multiply >= 1 })
			if (arr.length > 0) {
				doc.basePrice = Math.round(100 * arr[0].price / arr[0].multiply) / 100
			} else {
				const array = await product.umPrice.filter((m: any) => { return m.multiply <= 1 })
				doc.basePrice = Math.round(100 * array[0].price * array[0].multiply) / 100
			}

		}
		await this.props.product.AddProduct(doc, (success: boolean, res: any) => {
			this.props.product.clearData();
			this.onGoBack();
		});
	};

	_onSelectImage = () => {
		ImagePicker.openPicker({
			width: modules.VIEW_PORT_WIDTH,
			height: modules.VIEW_PORT_WIDTH,
			cropping: false
		}).then((image: any) => {
			this.setState({ cover: image.path });
		});
	};

	_onSelectCamera = () => {
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: false
		}).then((image: any) => {
			this.setState({ cover: image.path });
		});
	};

	onGoBack = () => {
		this.props.navigation.goBack();
		this.props.product.clearData();
	};

	_onStock = () => {
		const { unitMeasurement } = this.props.product;
		if (unitMeasurement) {
			this.props.navigation.navigate('Stock')
		} else {
			Alert.alert("Please Select Unit Measurement")
		}

	}
	_toggleSwitch = () => {
		this.setState({ freeDelivery: !this.state.freeDelivery })
	}
	_toggleSwitchDiscount = () => {
		this.setState({ isDiscount: !this.state.isDiscount })
	}
	_saveStock = async () => {
		const { dataSelectedItem, UMPrice, varaint, totalQty } = this.props.product;
		const { profile } = this.props.auth
		if (!dataSelectedItem) {
			Alert.alert('Please select product!');
			return;
		}
		if (!totalQty) {
			Alert.alert('Please add stock!');
			return;
		}

		const doc: any = {
			...dataSelectedItem
		}
		const local: any = await UMPrice.filter((m: any) => { return m.multiply == 1 })

		if (local.length > 0) {
			doc.basePrice = Math.round(100 * local[0].price) / 100
		} else {
			const arr: any = await UMPrice.filter((m: any) => { return m.multiply >= 1 })
			if (arr.length > 0) {
				doc.basePrice = Math.round(100 * arr[0].price / arr[0].multiply) / 100
			} else {
				const array = await UMPrice.filter((m: any) => { return m.multiply <= 1 })
				doc.basePrice = Math.round(100 * array[0].price * array[0].multiply) / 100
			}

		}
		doc.totalQty = totalQty
		doc.umPrice = UMPrice
		doc.varaint = varaint
		await this.props.product.AddStock(profile, doc, (success: boolean, res: any) => {
			this.props.product.clearData();
			this.onGoBack();
		});

	}
	_onSelectProduct = () => {
		this.props.product.clearData();
		this.props.navigation.navigate("SelectProduct")
	}
	render() {
		const { subCategory, process, unitMeasurement, UMPrice, totalQty, dataSelectedItem, } = this.props.product;
		const { userCanActive } = this.props.auth

		if (!userCanActive) {
			return (
				<AddProductScreen
					navigation={this.props.navigation}
					dataSelectedItem={dataSelectedItem}
					selectedunitMeasurement={dataSelectedItem ? dataSelectedItem?.unitMeasurement : unitMeasurement}
					totalQty={totalQty}
					onSave={this._saveStock}
					process={process}
					onSelectProduct={this._onSelectProduct}
				/>
			);
		} else {
			return (
				<AddProductAdminScreen
					totalQty={totalQty}
					title={this.state.name}
					changeTitle={(text) => this.setState({ name: text })}
					code={this.state.code}
					changeCode={(text) => this.setState({ code: text })}
					description={this.state.description}
					changeDescription={(text) => this.setState({ description: text })}
					price={this.state.price}
					changePrice={(text) => this.setState({ price: Number(text) })}
					comparePrice={this.state.comparePrice}
					changeComparePrice={(text) => this.setState({ comparePrice: text })}
					cost={this.state.cost}
					changeCost={(text) => this.setState({ cost: Number(text) })}
					onCategory={() => this.props.navigation.navigate('SelectProductDetail')}
					onUnitMeasurement={() => this.props.navigation.navigate('SelectUnitMeasurement')}
					onStock={this._onStock}
					selectedCategory={subCategory || null}
					selectedunitMeasurement={unitMeasurement || null}
					goBack={() => this.onGoBack()}
					onSave={this._onAddProduct}
					process={process}
					onSelectImage={this._onSelectImage}
					image={this.state.cover}
					onSelectCamera={this._onSelectCamera}
					onChangeTrending={(item: any) => {
						this.setState({ trending: item });
					}}
					deliveryNote={this.state.deliveryNote}
					onDeliveryNote={(text) => this.setState({ deliveryNote: text })}
					onChangeStatus={(item: any) => this.setState({ status: item })}
					toggleSwitch={this._toggleSwitch}
					freeDelivery={this.state.freeDelivery}

					toggleSwitchDiscount={this._toggleSwitchDiscount}
					isDiscount={this.state.isDiscount}
					onDiscount={(text: number) => this.setState({ discount: Number(text) })}
					discount={this.state.discount}
				/>
			);
		}

	}
}
