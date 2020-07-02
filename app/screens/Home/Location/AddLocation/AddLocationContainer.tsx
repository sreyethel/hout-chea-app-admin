import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import { createId, storeAccountRef } from '../../../../services/data.service';
import { pageKey } from '../../../../services/mapping.service';
import { IBanner, IStoreLocation } from '../../../../interface/ads.interface';
import AddLocationScreen from './AddLocationScreen';
import AddLocationAdminScreen from './AddLocationAdminScreen'
import { Alert } from 'react-native';

interface AppProps extends NavigationStackScreenProps {
	auth: any;
	location: any;
}

interface State {
	name: string;
	address: string;
	path: string;
	loading: boolean;
	index: number;
	latitute: number;
	longitute: number;
	coordinate: any;
}

@inject('location', 'auth')
@observer
export default class AddLocationContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			address: '',
			path: '',
			loading: false,
			index: 0,
			latitute: 0,
			longitute: 0,
			coordinate: {
				latitude: 11.5564,
				longitude: 104.9282,
				latitudeDelta: 0.02,
				longitudeDelta: 0.02
			}
		};
	}

	_onSelectImage = () => {
		ImagePicker.openPicker({
			width: 1024,
			height: 1024,
			cropping: true
		}).then((image: any) => {
			this.setState({ path: image.path });
		});
	};

	async componentDidMount() {
		const item = await this.props.navigation.getParam('item');
		item ? await this.setState({ latitute: item.latitute, longitute: item.longitute }) : null;
	}

	_onSelectCamera = () => {
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: false
		}).then((image: any) => {
			this.setState({ path: image.path });
		});
	};

	_onAddCategory = async () => {
		await this.setState({ loading: true });
		const { profile } = this.props.auth;
		const { name, address } = this.state;
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			Alert.alert("Invalid location!")
			this.setState({ loading: false });
			return
		}
		const { coords } = this.props.location;
		const key: string = createId();
		let item: IStoreLocation = {
			key: key,
			page_key: pageKey(),
			created_by: profile,
			created_date: new Date(),
			created_date_key: pageKey(),
			name: name,
			address: address,
			status: null,
			location: this.props.location.addGeoPoint(coords.latitude, coords.longitude)
		};


		await this.props.location.saveLocation(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	componentWillUnmount() {
		this.props.location.clearAll();
	}
	_onSaveStoreLocation = async () => {
		const { name, address } = this.state;
		const { coords } = this.props.location;
		const { profile } = this.props.auth
		if (!name) {
			Alert.alert("Invalid name!")
			return
		}
		if (!address) {
			Alert.alert("Invalid address!")
			return
		}
		if (!coords) {
			Alert.alert("Invalid location!")
			return
		}
		const item = {
			map: coords,
			updated_by: profile,
			updated_date: new Date(),
			location_name: name,
			address: address

		}
		this.setState({ loading: true })
		await storeAccountRef().doc(profile.key).update(item).then(()=>{
			this.setState({ loading: false })
			Alert.alert("Successfully Updated!")
			this.props.navigation.goBack()
		}).catch((err)=>{
			Alert.alert("Update failed")
			this.setState({ loading: false })
		})
		


	}

	public render() {
		const { name, address, coordinate } = this.state;
		const { loading } = this.state;
		const { coords } = this.props.location;
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			return (
				<AddLocationScreen
					defaultCoords={coordinate}
					coords={this.props.location.toJs(coords)}
					loading={loading}
					onPresCamera={this._onSelectCamera}
					onPresImage={this._onSelectImage}
					navigation={this.props.navigation}
					latitude={coords.latitude}
					longitude={coords.longitude}
					name={name}
					onSave={this._onSaveStoreLocation}
					address={address}
					onChangeName={(val) => this.setState({ name: val })}
					onChangeAddress={(val) => this.setState({ address: val })}
					onChangeIndex={(val) => this.setState({ index: val })}
					changeLongitute={(val) => this.setState({ longitute: val })}
					changeLatitute={(val) => this.setState({ latitute: val })}
				/>
			);

		} else {
			return (
				<AddLocationAdminScreen
					defaultCoords={coordinate}
					coords={this.props.location.toJs(coords)}
					loading={loading}
					onPresCamera={this._onSelectCamera}
					onPresImage={this._onSelectImage}
					navigation={this.props.navigation}
					latitude={coords.latitude}
					longitude={coords.longitude}
					name={name}
					onSave={this._onAddCategory}
					address={address}
					onChangeName={(val) => this.setState({ name: val })}
					onChangeAddress={(val) => this.setState({ address: val })}
					onChangeIndex={(val) => this.setState({ index: val })}
					changeLongitute={(val) => this.setState({ longitute: val })}
					changeLatitute={(val) => this.setState({ latitute: val })}
				/>
			);
		}

	}
}
