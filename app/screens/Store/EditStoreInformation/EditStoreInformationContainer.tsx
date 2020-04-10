import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import EditStoreInformationScreen from './EditStoreInformationScreen';
import { inject, observer } from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import MODULE from '../../../modules';

export interface AppProps {
	auth: any;
	navigation: any;
	store: any;
}

export interface AppState {
	cover: string;
}

@inject('auth', 'store')
@observer
export default class EditStoreInformationContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		const { selectedStore, profile } = this.props.auth;
		this.state = {
			cover: selectedStore.avatar
		};
	}

	componentDidMount() {
		const { selectedStore, profile } = this.props.auth;
	}

	_onSelectImage = () => {
		ImagePicker.openPicker({
			width: MODULE.VIEW_PORT_WIDTH,
			height: MODULE.VIEW_PORT_WIDTH,
			cropping: false
		}).then((image: any) => {
			this.setState({ cover: image.path });
		});
	};
	_onSelectCamera = () => {
		ImagePicker.openCamera({
			width: MODULE.VIEW_PORT_WIDTH,
			height: MODULE.VIEW_PORT_WIDTH,
			cropping: false
		}).then((image: any) => {
			this.setState({ cover: image.path });
		});
	};

	_onUpdateStore = (item: any, path: any, store: any) => {
		this.props.store.updateStore(item, path, store, (res: any) => {
			if (res) {
				Alert.alert('Store Information Updated');
				this.props.navigation.goBack();
			}
		});
	};

	public render() {
		const { selectedStore } = this.props.auth;
		const { process } = this.props.store;
		return (
			<EditStoreInformationScreen
				loading={process}
				onSelectCamera={this._onSelectCamera}
				onSelectImage={this._onSelectImage}
				store={selectedStore}
				navigation={this.props.navigation}
				onUpdateStore={this._onUpdateStore}
				image={this.state.cover}
			/>
		);
	}
}
