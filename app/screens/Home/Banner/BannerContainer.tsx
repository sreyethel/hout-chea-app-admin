import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import BannerScreen from './BannerScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
}

@inject('ads')
@observer
export default class BannerContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchBanner();
	}

	_onDelete = (item: any) => {

		Alert.alert(
			'Delete',
			'Are you sure you want to delete this banner?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deleteBanner(item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditBanner', { item: item });
	};

	public render() {
		const { dataBanner } = this.props.ads;

		return (
			<BannerScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataBanner}
				navigation={this.props.navigation}
			/>
		);
	}
}
