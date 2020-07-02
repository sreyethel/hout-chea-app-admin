import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import PromotionScreen from './PromotionScreen';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
	auth: any;
	product: any
}

@inject('ads', 'auth', 'product')
@observer
export default class PromotionContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchPromotion();
	}

	_onDelete = (item: any) => {
		const { profile } = this.props.auth
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Promotion?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deletePromotion(profile, item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = async (item: any) => {
		await this.props.product.selectedProduct(item)
		await this.props.product.selectedTotalQty(item.totalQty)
		this.props.navigation.navigate('EditPromotion');

	};

	public render() {
		const { dataPromotion } = this.props.ads;
		const { userCanActive } = this.props.auth

		return (
			<PromotionScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataPromotion}
				navigation={this.props.navigation}
				userCanActive={userCanActive}
			/>
		);
	}
}
