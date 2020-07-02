import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import PosterScreen from './PosterScreen';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
	auth:any;
}

@inject('ads','auth')
@observer
export default class PosterContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchPoster();
	}

	_onDelete = (item: any) => {
		const {profile}= this.props.auth
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Poster?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deletePoster(profile,item.key) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditPoster', { item: item });
	};

	public render() {
		const { dataPoster } = this.props.ads;
		const {userCanActive} = this.props.auth
		return (
			<PosterScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataPoster}
				navigation={this.props.navigation}
				userCanActive={userCanActive}
			/>
		);
	}
}
