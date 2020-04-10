import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import LocationScreen from './LocationScreen';
import { inject, observer } from 'mobx-react';
import { Alert } from 'react-native';

export interface AppProps extends NavigationStackScreenProps {
	location: any;
}

@inject('location')
@observer
export default class LocationContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	componentDidMount() {
		this.props.location.fetchLocation();
	}

	_onDelete = (item: any) => {
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Branch?',
			[
				{ text: 'Yes', onPress: () => this.props.location.deleteLocation(item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditLocation', { item: item });
	};

	public render() {
		const { dataLocation } = this.props.location;
		return (
			<LocationScreen
				onDelete={this._onDelete}
				onEdit={this._onEdit}
				data={dataLocation}
				navigation={this.props.navigation}
			/>
		);
	}
}
