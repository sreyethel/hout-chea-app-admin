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
export default class AddProductContainer extends React.Component<Props, State> {
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

	_onAddProduct = async () => {
		const { profile, selectedStore } = this.props.auth;
		const { subCategory, material, size, style } = this.props.product;
		if (!subCategory) {
			Alert.alert('Please Select Category');
			return;
		}
		if (this.state.price >= this.state.cost) {
			Alert.alert('Normal Price cannot be lower higher than Sale Price');
			return;
		}
		const key = createId();
		let product: IProduct = {
			key: key,
			page_key: pageKey(),
			created_date_key: toDateKey(new Date()),
			created_by: profile.key,
			created_date: new Date(),
			status: this.state.status.name ? this.state.status : status[0],
			name: this.state.name,
			description: this.state.description,
			storeRef: firestore().doc(`store/${selectedStore.key}`),
			storeOwner: selectedStore.key,
			price: toNumber(this.state.price),
			compareToPrice: toNumber(this.state.comparePrice),
			cost: toNumber(this.state.cost),

			subCategoryRef: subCategory ? firestore().doc(`sub_category/${subCategory.key}`) : null,
			subCategoryKey: subCategory ? subCategory.key : null,

			categoryRef: subCategory ? firestore().doc(`category/${subCategory.categoryKey}`) : null,
			categoryKey: subCategory ? subCategory.categoryKey : null,

			code: this.state.code,
			approvalBy: null,
			isApproved: false,
			gallery: [],
			trending: this.state.trending.name ? this.state.trending : trending[0]
		};

		console.log('product', product);

		if (this.state.cover != '') {
			await this.props.product.uploadPhoto(product.key, this.state.cover, (img: any) => {
				if (img) {
					product.cover = img;
				}
			});
		}

		await this.props.product.AddProduct(product, (success: boolean, res: any) => {
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

	render() {
		const { subCategory, process } = this.props.product;
		return (
			<AddProductScreen
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
				selectedCategory={subCategory || null}
				goBack={() => this.onGoBack()}
				onSave={this._onAddProduct}
				process={process}
				onSelectImage={this._onSelectImage}
				image={this.state.cover}
				onSelectCamera={this._onSelectCamera}
				onChangeTrending={(item: any) => {
					this.setState({ trending: item });
				}}
				onChangeStatus={(item: any) => this.setState({ status: item })}
			/>
		);
	}
}
