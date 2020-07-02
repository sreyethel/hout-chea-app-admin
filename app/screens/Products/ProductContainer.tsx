import React from 'react';
import ProductScreen from './ProductScreen';
import { inject, observer } from 'mobx-react';
import { View, ActivityIndicator, Alert } from 'react-native';
import _styles from '../../_styles';
import ProductAdminScreen from './ProductAdminScreen';
import { storeAccountRef } from '../../services/data.service';
import { pushToArray } from '../../services/mapping.service';

interface Props {
	navigation: any;
	auth: any;
	store: any;
	product: any;
	category: any;

}
interface States {
	modal: boolean;
	item: any;
	product: any;
	loadingProduction: boolean;
	pds: any;
	category: string
}

@inject('auth', 'store', 'product', 'category')
@observer
export default class ProductContainer extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
		this.state = {
			modal: false,
			item: {},
			product: [],
			loadingProduction: true,
			pds: [],
			category: ''
		};
	}

	async componentDidMount() {

		const { userCanActive, profile } = this.props.auth
		if (!userCanActive) {
			storeAccountRef()
				.doc(profile.key)
				.collection("products")
				.where("status.key", "==", 1)
				.onSnapshot((item: any) => {
					const data = pushToArray(item)
					this.setState({ pds: data })
					this.setState({ product: data })
					this.setState({ loadingProduction: false })
				})
		} else {
			const { data } = this.props.product;
			this.setState({ pds: data })
		}

	}

	_onAddProduct = () => {
		this.props.navigation.navigate('ADD_PRODUCT');
	};

	_onDeleteProduct = async (item: any) => {
		const { profile } = this.props.auth
		await this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			Alert.alert(
				'Delete Product',
				'Are you sure you want to delete this product?',
				[
					{ text: 'Yes', onPress: () => this.props.product.deleteProduct(profile, item.key) },
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel'
					}
				],
				{ cancelable: false }
			);
		}, 500);
	};

	_onEditProduct = async (item: any) => {
		await this.setState({ modal: !this.state.modal });
		await this.props.product.fetchSelectedProduct(item);
		await this.props.product.selectedUnitMeasurement(item.unitMeasurement, item.umPrice)
		await this.props.product.setEditUMPrice(item.umPrice, item.totalQty)
		this.props.navigation.navigate('EDIT_PRODUCT');
	};

	_onAddGallery = async (item: any) => {
		await this.setState({ modal: !this.state.modal });

		this.props.navigation.navigate('AddProductGallery', { KEY: item.key });
	};

	_onShowModal = (item?: string) => {
		this.setState({ modal: !this.state.modal, item: item ? item : '' });
	};
	_onDeleteStock = async (item: any) => {
		const { profile } = this.props.auth
		await this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			Alert.alert(
				'Delete Product',
				'Are you sure you want to delete this product?',
				[
					{ text: 'Yes', onPress: () => this.props.product.deleteItem(profile, item) },
					{
						text: 'Cancel',
						onPress: () => console.log('Cancel Pressed'),
						style: 'cancel'
					}
				],
				{ cancelable: false }
			);
		}, 500);
	}
	_onProductByCategory = (item: any) => {
		const {  userCanActive } = this.props.auth;
		if (userCanActive) {
			const { data } = this.props.product;
			if (item == 0) {
				this.setState({ category: '' })
				this.setState({ pds: data })
			} else {
				const main = data.filter((m: any) => { return m.category.key == item })
				this.setState({ category: '' })
				this.setState({ pds: main })
			}
		} else {
			const data = this.state.product;
			if (item == 0) {
				this.setState({ category: '' })
				this.setState({ pds: data })
			} else {
				const main = data.filter((m: any) => { return m.category.key == item })
				this.setState({ category: '' })
				this.setState({ pds: main })
			}
		}

	}
	_onSearch = () => {
		const { category, pds } = this.state;
		if (!category) {
			return;
		}
		const rows = pds.filter((m) => m && `${m.name}`.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
		this.setState({ pds: rows });
	};
	render() {
		const { data, loading } = this.props.product;
		const { selectedStore, userCanActive } = this.props.auth;
		const { listCategory } = this.props.category;
		const { modal, item } = this.state;

		if (loading)
			return (
				<View style={[_styles.flx1, _styles.center]}>
					<ActivityIndicator />
				</View>
			);
		if (!userCanActive) {
			return (
				<ProductScreen
					item={item}
					modal={modal}
					onShowModal={this._onShowModal}
					title="Product"
					dataProduct={this.state.pds}
					dataStore={selectedStore}
					onDeleteProduct={this._onDeleteStock}
					onEdit={this._onEditProduct}
					onGallery={this._onAddGallery}
					dataCategory={listCategory}
					onProductByCategory={this._onProductByCategory}
					search={this.state.pds}
					onChangeText={(text) => this.setState({ category: text })}
					onSearch={this._onSearch}

				/>
			);
		} else {
			return (
				<ProductAdminScreen
					item={item}
					modal={modal}
					onShowModal={this._onShowModal}
					goBack={() => this.props.navigation.goBack()}
					onAddProduct={this._onAddProduct}
					title="Product"
					dataProduct={this.state.pds}
					dataStore={selectedStore}
					onDeleteProduct={this._onDeleteProduct}
					onEdit={this._onEditProduct}
					onGallery={this._onAddGallery}
					dataCategory={listCategory}
					onProductByCategory={this._onProductByCategory}
					search={this.state.pds}
					onChangeText={(text) => this.setState({ category: text })}
					onSearch={this._onSearch}
				/>
			)
		}

	}
}
