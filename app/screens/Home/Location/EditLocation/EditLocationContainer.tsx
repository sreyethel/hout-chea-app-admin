import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import { createId } from '../../../../services/data.service';
import { pageKey } from '../../../../services/mapping.service';
import { IBanner, IStoreLocation } from '../../../../interface/ads.interface';
import EditLocationScreen from './EditLocationScreen';

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
export default class EditLocationContainer extends React.Component<AppProps, State> {
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
		const { name, address } = this.state;

		const { coords } = this.props.location;
		const Item = this.props.navigation.getParam('item');

		let item: IStoreLocation = {
			key: Item.key,
			page_key: Item.page_key,
			created_by: Item.created_by,
			created_date: Item.created_date,
			created_date_key: Item.created_date_key,
			name: name ? name : Item.name,
			address: address ? address : Item.address,
			status: Item.status,
			location: coords.latitude
				? this.props.location.addGeoPoint(coords.latitude, coords.longitude)
				: Item.location
		};

		await this.props.location.updateLocation(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	componentWillUnmount() {
		this.props.location.clearAll();
	}

	public render() {
		const { name, address, coordinate } = this.state;
		const { loading } = this.state;
		const { coords } = this.props.location;

		const item: any = this.props.navigation.getParam('item');

		const lastCoord: any = {
			latitude: item.location.latitude,
			longitude: item.location.longitude,
			latitudeDelta: 0.02,
			longitudeDelta: 0.02
		};

		return (
			<EditLocationScreen
				coords={coords.latitude ? this.props.location.toJs(coords) : lastCoord}
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				latitude={coords.latitude ? coords.latitude : item.location.latitude}
				longitude={coords.longitude ? coords.longitude : item.location.longitude}
				name={name ? name : item.name}
				onSave={this._onAddCategory}
				address={address ? address : item.address}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeAddress={(val) => this.setState({ address: val })}
				changeLongitute={(val) => this.setState({ longitute: val })}
				changeLatitute={(val) => this.setState({ latitute: val })}
			/>
		);
	}
}
