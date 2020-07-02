import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import LocationScreen from './LocationScreen';
import LocationAdminScreen from './LocationAdminScreen';
import { inject, observer } from 'mobx-react';
import { Alert ,Text} from 'react-native';
import { locale } from 'moment';
import _styles from '../../../_styles';

export interface AppProps extends NavigationStackScreenProps {
	location: any;
	auth: any
}

@inject('location', 'auth')
@observer
export default class LocationContainer extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			latitute: 0,
			longitute: 0,
			coordinate: {
				latitude: 11.5564,
				longitude: 104.9282,
				latitudeDelta: 0.02,
				longitudeDelta: 0.02
			}
		}
	}

	componentDidMount() {

		const { userCanActive, profile, store } = this.props.auth
		this.props.location.fetchLocation();
		// if (userCanActive) {
		// 	this.props.location.fetchLocation();
		// } else {
		// 	this.props.location.fetchStoreLocation(profile);
		// }
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
		const { dataLocation,storeLocation } = this.props.location;
		const { userCanActive } = this.props.auth
		const { coords } = this.props.location;
		const { coordinate } = this.state
		console.log('storeLocation', storeLocation)
		if (!userCanActive) {
			return (
				// <LocationScreen
				// 	defaultCoords={coordinate}
				// 	coords={storeLocation.toJs(coords)}
				// 	latitude={coords.latitude}
				// 	longitude={coords.longitude}
				// 	onDelete={this._onDelete}
				// 	onEdit={this._onEdit}
				// 	data={dataLocation}
				// 	navigation={this.props.navigation}
				// 	userCanActive={userCanActive}
				// />
				<Text style={_styles.noData}>No Data</Text>
			);
		} else {
			return (
				<LocationAdminScreen
					onDelete={this._onDelete}
					onEdit={this._onEdit}
					data={dataLocation}
					navigation={this.props.navigation}
					userCanActive={userCanActive}
				/>
			);
		}

	}
}
