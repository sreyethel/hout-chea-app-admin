import React from 'react';
import { inject, observer } from 'mobx-react';
import { Alert } from 'react-native';
import { IProduct } from '../../../interface/product.interface';
import { firestore } from '../../../services/data.service';
import { toNumber } from '../../../services/mapping.service';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import EditProductScreen from './EditProductScreen';

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
			status: {}
		};
	}

	componentDidMount() {
		const { dataSelectedProduct } = this.props.product;
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

		this.props.product.size = dataSelectedProduct.size;
	}

	_onAddProduct = async () => {
		const { selectedStore } = this.props.auth;
		const { subCategory, dataSelectedProduct } = this.props.product;

		if (this.state.price >= this.state.cost) {
			Alert.alert('Normal Price cannot be lower higher than Sale Price');
			return;
		}

		let product: IProduct = {
			trending: this.state.trending.name ? this.state.trending : dataSelectedProduct.trending,
			key: dataSelectedProduct.key,
			page_key: dataSelectedProduct.page_key,
			created_date_key: dataSelectedProduct.created_date_key,
			created_by: dataSelectedProduct.created_by,
			created_date: dataSelectedProduct.created_date,
			status: this.state.status.name ? this.state.status : dataSelectedProduct.status,
			name: this.state.name,
			description: this.state.description,
			storeRef: firestore().doc(`store/${selectedStore.key}`),
			storeOwner: selectedStore.key,
			price: toNumber(this.state.price),
			compareToPrice: toNumber(this.state.comparePrice),
			cost: toNumber(this.state.cost),

			categoryRef: subCategory
				? firestore().doc(`category/${subCategory.categoryKey}`)
				: dataSelectedProduct.categoryRef,
			categoryKey: subCategory ? subCategory.categoryKey : dataSelectedProduct.categoryKey,
			subCategoryRef: subCategory
				? firestore().doc(`sub_category/${subCategory.key}`)
				: dataSelectedProduct.subCategoryRef,
			subCategoryKey: subCategory ? subCategory.key : dataSelectedProduct.subCategoryKey,

			code: this.state.code,
			approvalBy: null,
			isApproved: false,
			gallery: dataSelectedProduct.gallery ? dataSelectedProduct.gallery : []
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
		await this.props.product.updateProduct(product, async (res: boolean) => {
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

	onGoBack = () => {
		this.props.product.clearData();
		this.props.navigation.goBack();
	};

	render() {
		const { subCategory, process, dataSelectedProduct } = this.props.product;
		return (
			<EditProductScreen
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
				// dataColor={color.length > 0 ? color : dataSelectedProduct.color}
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
