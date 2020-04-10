import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import PosterScreen from './PosterScreen';

export interface AppProps extends NavigationStackScreenProps {
	ads: any;
}

@inject('ads')
@observer
export default class PosterContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.ads.fetchPoster();
	}

	_onDelete = (item: any) => {
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Poster?',
			[
				{ text: 'Yes', onPress: () => this.props.ads.deletePoster(item) },
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
		return (
			<PosterScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataPoster}
				navigation={this.props.navigation}
			/>
		);
	}
}
