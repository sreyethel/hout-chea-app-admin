import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import { createId } from '../../../../services/data.service';
import { pageKey, StatusObject } from '../../../../services/mapping.service';
import { IBanner } from '../../../../interface/ads.interface';
import AddPosterScreen from './AddPosterScreen';
import { Alert } from 'react-native';

interface AppProps extends NavigationStackScreenProps {
	ads: any;
	auth: any;
}

interface State {
	name: string;
	description: string;
	path: string;
	loading: boolean;
	index: number;
}

@inject('ads', 'auth')
@observer
export default class AddPosterContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			description: '',
			path: '',
			loading: false,
			index: 0
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
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			Alert.alert("Poster add failed!")
			this.setState({ loading: false });
			return
		}
		const { profile } = this.props.auth;
		const { name, description, path, index } = this.state;
		const key: string = createId();
		let item: IBanner = {
			key: key,
			page_key: pageKey(),
			created_by: profile,
			created_date: new Date(),
			created_date_key: pageKey(),
			name: name,
			description: description,
			fileUrl: '',
			status: StatusObject().ACTIVE,
			index: Number(index)
		};

		await this.props.ads.uploadPosterPhoto(path, (res: any) => {
			if (res) {
				item.fileUrl = res;
			} else {
				item.fileUrl = '';
			}
		});
		await this.props.ads.savePoster(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	public render() {
		const { name, description, path, index } = this.state;
		const { loading } = this.state;
		return (
			<AddPosterScreen
				index={String(index)}
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				name={name}
				image={path}
				onSave={this._onAddCategory}
				description={description}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeDescription={(val) => this.setState({ description: val })}
				onChangeIndex={(val) => this.setState({ index: val })}
			/>
		);
	}
}
