import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import PromotionScreen from './PromotionScreen';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
}

@inject('ads')
@observer
export default class PromotionContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchPromotion();
	}

	_onDelete = (item: any) => {
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Promotion?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deletePromotion(item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditPromotion', { item: item });
	};

	public render() {
		const { dataPromotion } = this.props.ads;

		return (
			<PromotionScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataPromotion}
				navigation={this.props.navigation}
			/>
		);
	}
}
