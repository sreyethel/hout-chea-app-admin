import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import BannerScreen from './BannerScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import _styles from '../../../_styles';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
	auth: any
}

@inject('ads', 'auth')
@observer
export default class BannerContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchBanner();
	}

	_onDelete = (item: any) => {
		const { profile } = this.props.auth
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this banner?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deleteBanner(profile,item.key) },
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
		const {userCanActive} = this.props.auth
		return (
			<BannerScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataBanner}
				navigation={this.props.navigation}
				userCanActive={userCanActive}
			/>
		);
		
	}
}
