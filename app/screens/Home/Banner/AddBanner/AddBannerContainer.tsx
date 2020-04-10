import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../../modules';
import { inject, observer } from 'mobx-react';
import { ICategory } from '../../../../interface/category.interface';
import { createId } from '../../../../services/data.service';
import { pageKey } from '../../../../services/mapping.service';
import AddBannerScreen from './AddBannerScreen';
import { IBanner } from '../../../../interface/ads.interface';

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
export default class AddBannerContainer extends React.Component<AppProps, State> {
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
			width: 740,
			height: 493,
			cropping: true
		}).then((image: any) => {
			this.setState({ path: image.path });
		});
	};

	_onSelectCamera = () => {
		ImagePicker.openCamera({
			width: 740,
			height: 493,
			cropping: true
		}).then((image: any) => {
			this.setState({ path: image.path });
		});
	};

	_onAddCategory = async () => {
		await this.setState({ loading: true });
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
			status: null,
			index: Number(index)
		};

		await this.props.ads.uploadPhoto(path, (res: any) => {
			if (res) {
				item.fileUrl = res;
			} else {
				item.fileUrl = '';
			}
		});
		await this.props.ads.saveBanner(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	public render() {
		const { name, description, path, index } = this.state;
		const { loading } = this.state;
		return (
			<AddBannerScreen
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
