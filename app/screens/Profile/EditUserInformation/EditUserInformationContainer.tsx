import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import EditUserInformationScreen from './EditUserInformationScreen';
import { inject, observer } from 'mobx-react';
import ImagePicker from 'react-native-image-crop-picker';
import MODULE from '../../../modules';

export interface AppProps {
	auth: any;
	navigation: any;
}

export interface AppState {
	cover: string;
}

@inject('auth')
@observer
export default class EditUserInformationContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		const { profile } = this.props.auth;
		this.state = {
			cover: profile.photoURL
		};
	}

	componentDidMount() {
	
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

	_onUpdateProfile = (item: any, path: any) => {
		this.props.auth.updateProfile(item, path, (res: any) => {
			if (res) {
				Alert.alert('Profile Updated');
				this.props.navigation.goBack();
			}
		});
	};

	public render() {
		const { profile, process } = this.props.auth;
		return (
			<EditUserInformationScreen
				loading={process}
				onSelectCamera={this._onSelectCamera}
				onSelectImage={this._onSelectImage}
				account={profile}
				navigation={this.props.navigation}
				updateProfile={this._onUpdateProfile}
				image={this.state.cover}
			/>
		);
	}
}
