import React from 'react';
import ProductScreen from './ProductScreen';
import { inject, observer } from 'mobx-react';
import { View, ActivityIndicator, Alert } from 'react-native';
import _styles from '../../_styles';

interface Props {
	navigation: any;
	auth: any;
	store: any;
	product: any;
}
interface States {
	modal: boolean;
	item: any;
}

@inject('auth', 'store', 'product')
@observer
export default class ProductContainer extends React.Component<Props, States> {
	constructor(props: Props) {
		super(props);
		this.state = {
			modal: false,
			item: {}
		};
	}

	async componentDidMount() {
		await this.props.product.fetchData();
	}

	_onAddProduct = () => {
		this.props.navigation.navigate('ADD_PRODUCT');
	};

	_onDeleteProduct = async (item: any) => {
		await this.setState({ modal: !this.state.modal });
		setTimeout(() => {
			Alert.alert(
				'Delete Product',
				'Are you sure you want to delete this product?',
				[
					{ text: 'Yes', onPress: () => this.props.product.deleteProduct(item.key) },
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
		this.props.navigation.navigate('EDIT_PRODUCT');
	};

	_onAddGallery = async (item: any) => {
		await this.setState({ modal: !this.state.modal });

		this.props.navigation.navigate('AddProductGallery', { KEY: item.key });
	};

	_onShowModal = (item?: string) => {
		this.setState({ modal: !this.state.modal, item: item ? item : '' });
	};

	render() {
		const { data, loading } = this.props.product;
		const { selectedStore } = this.props.auth;
		const { modal, item } = this.state;

		if (loading)
			return (
				<View style={[ _styles.flx1, _styles.center ]}>
					<ActivityIndicator />
				</View>
			);

		return (
			<ProductScreen
				item={item}
				modal={modal}
				onShowModal={this._onShowModal}
				goBack={() => this.props.navigation.goBack()}
				onAddProduct={this._onAddProduct}
				title="Product"
				dataProduct={data}
				dataStore={selectedStore}
				onDeleteProduct={this._onDeleteProduct}
				onEdit={this._onEditProduct}
				onGallery={this._onAddGallery}
			/>
		);
	}
}
