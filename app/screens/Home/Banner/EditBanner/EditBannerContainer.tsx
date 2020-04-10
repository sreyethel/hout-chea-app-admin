import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import { createId } from '../../../../services/data.service';
import { pageKey } from '../../../../services/mapping.service';
import { IBanner } from '../../../../interface/ads.interface';
import EditBannerScreen from './EditBannerScreen';

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
export default class EditBannerContainer extends React.Component<AppProps, State> {
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
		const selectedItem = this.props.navigation.getParam('item');

		let item: IBanner = {
			key: selectedItem.key,
			page_key: selectedItem.page_key,
			created_by: profile,
			created_date: selectedItem.created_date,
			created_date_key: selectedItem.created_date_key,
			name: name ? name : selectedItem.name,
			description: description ? description : selectedItem.description,
			fileUrl: selectedItem.fileUrl,
			status: null,
			index: index ? Number(index) : selectedItem.index
		};
		path
			? await this.props.ads.uploadPhoto(path, async (res: any) => {
					if (res) {
						await this.props.ads.deleteFile(selectedItem.fileUrl);
						item.fileUrl = res;
					} else {
						item.fileUrl = selectedItem.fileUrl;
					}
				})
			: null;

		await this.props.ads.EditBanner(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	public render() {
		const { name, description, path, index } = this.state;
		const { loading } = this.state;
		const item = this.props.navigation.getParam('item');
		return (
			<EditBannerScreen
				index={String(index) == '0' ? String(item.index) : String(index)}
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				name={name ? name : item.name}
				image={path ? path : item.fileUrl}
				onSave={this._onAddCategory}
				description={description}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeDescription={(val) => this.setState({ description: val })}
				onChangeIndex={(val) => this.setState({ index: val })}
			/>
		);
	}
}
