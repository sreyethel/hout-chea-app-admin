import React from 'react';
import { inject, observer } from 'mobx-react';
import { Alert } from 'react-native';
import { IProduct } from '../../../interface/product.interface';
import { firestore, productRef } from '../../../services/data.service';
import { toNumber, pushToObject } from '../../../services/mapping.service';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import EditProductScreen from './EditProductScreen';
import EditProductAdminScreen from './EditProductAdminScreen'

// var ImagePicker = NativeModules.ImageCropPicker;

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
	deliveryNote: string;
	images: Array<any>;
	cover: string;
	trending: any;
	status: any;
	product: any;
	loadingProduct: any
}

@inject('auth', 'product')
@observer
export default class EditProductContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			images: [],
			name: '',
			description: '',
			price: 0,
			cost: 0,
			comparePrice: '',
			availableStore: true,
			freeDelivery: true,
			deliveryNote: '',
			code: '',
			cover: '',
			trending: {},
			status: {},
			product: null,
			loadingProduct: true
		};
	}

	async	componentDidMount() {
		const { dataSelectedProduct } = this.props.product;
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			await productRef().doc(dataSelectedProduct.key).get().then((item: any) => {
				const data = pushToObject(item)
				this.setState({ product: data })
				this.setState({ loadingProduct: false })
			})
		}

		this.setState({
			name: dataSelectedProduct.name,
			description: dataSelectedProduct.description,
			price: Number(dataSelectedProduct.price),
			cost: Number(dataSelectedProduct.cost),
			availableStore: dataSelectedProduct.availableStore,
			freeDelivery: dataSelectedProduct.freeDelivery,
			deliveryNote: dataSelectedProduct.shippingCondition,
			code: dataSelectedProduct.code,
			cover: dataSelectedProduct.cover
		});

	}

	_onAddProduct = async () => {
		const { selectedStore, profile } = this.props.auth;
		const { subCategory, dataSelectedProduct, UMPrice, unitMeasurement, varaint, totalQty } = this.props.product;

		let product: IProduct = {
			trending: this.state.trending.name ? this.state.trending : dataSelectedProduct.trending,
			key: dataSelectedProduct.key,
			page_key: dataSelectedProduct.page_key,
			created_date_key: dataSelectedProduct.created_date_key,
			created_by: dataSelectedProduct.created_by,
			created_date: dataSelectedProduct.created_date,
			updated_by: profile,
			updated_date: new Date,
			status: this.state.status.name ? this.state.status : dataSelectedProduct.status,
			name: this.state.name,
			description: this.state.description,
			market: subCategory ? subCategory.category.market : null,
			umPrice: UMPrice,
			unitMeasurement: unitMeasurement,
			varaint: varaint,
			totalQty: totalQty,
			code: this.state.code,
		};
		if (this.state.cover == dataSelectedProduct.cover) {
			product.cover = dataSelectedProduct.cover;
		} else if (this.state.cover != '') {
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


		await this.props.product.updateProduct(doc, async (res: boolean) => {
			if (res) {
				await Alert.alert('Successfully Updated Product');
				this.props.product.clearData();
				this.props.navigation.goBack();
			}
		});
	};

	_pickMultiple() {
		ImagePicker.openPicker({
			multiple: true,
			waitAnimationEnd: false,
			includeExif: true,
			forceJpg: true,
			cropping: true
		})
			.then((images: any) => {
				this.setState({
					images: images.map((i: any) => {
						return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
					})
				});
			})
			.catch((e: any) => Alert.alert('Cancel'));
	}

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

	onGoBack = async () => {
		await this.props.product.clearData();
		this.props.navigation.goBack();
	};
	_onStock = () => {
		const { unitMeasurement } = this.props.product;
		if (unitMeasurement) {
			this.props.navigation.navigate('Stock')
		} else {
			Alert.alert("Please Select Unit Measurement")
		}

	}
	_saveStock = async () => {
		const { dataSelectedItem, UMPrice, varaint, totalQty, dataSelectedProduct } = this.props.product;
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
		const updateQty = dataSelectedProduct.totalQty - totalQty
		await this.props.product.EditStock(profile, doc, updateQty, (success: boolean, res: any) => {
			this.props.product.clearData();
			this.onGoBack();
		});

	}
	_onSaveStock = () => {
		if (this.state.loadingProduct) {
			Alert.alert("Progressing")
			return
		}
		this.props.product.selectedProduct(this.state.product)
		this.props.navigation.navigate("Stock")
	}
	render() {
		const { subCategory, process, dataSelectedProduct, dataSelectedItem, totalQty, unitMeasurement, UMPrice } = this.props.product;
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			return (
				<EditProductScreen
					navigation={this.props.navigation}
					dataSelectedItem={dataSelectedProduct}
					selectedunitMeasurement={dataSelectedProduct ? dataSelectedProduct?.unitMeasurement : unitMeasurement}
					totalQty={totalQty}
					onSave={this._saveStock}
					process={process}
					onSaveStock={this._onSaveStock}
					UMPrice={UMPrice}

				/>
			)


		} else {
			return (
				<EditProductAdminScreen
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
					selectedunitMeasurement={unitMeasurement || null}
					totalQty={totalQty}
					selectedCategory={subCategory ? subCategory : dataSelectedProduct.subCategory || null}
					goBack={() => this.onGoBack()}
					onSave={this._onAddProduct}
					process={process}
					onSelectImage={this._onSelectImage}
					image={this.state.cover}
					onSelectCamera={this._onSelectCamera}
					dataSelectedProduct={dataSelectedProduct}
					onChangeTrending={(item: any) => {
						this.setState({ trending: item });
					}}
					onChangeStatus={(item: any) => this.setState({ status: item })}
				/>
			);
		}

	}
}
