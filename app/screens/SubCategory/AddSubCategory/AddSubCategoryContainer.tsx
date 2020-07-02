import * as React from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import AddGalleryScreen from '../../Products/AddGallery/AddGalleryScreen';
import AddCategoryScreen from './AddSubCategoryScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import { inject, observer } from 'mobx-react';
import { ICategory, ISubCategory } from '../../../interface/category.interface';
import { createId } from '../../../services/data.service';
import { pageKey, StatusObject } from '../../../services/mapping.service';

interface AppProps extends NavigationStackScreenProps {
	category: any;
	auth: any;
}

interface State {
	name: string;
	description: string;
	path: string;
	loading: boolean;
}

@inject('category', 'auth')
@observer
export default class AddSubCategoryContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			description: '',
			path: '',
			loading: false
		};
	}

	_onSelectImage = () => {
		ImagePicker.openPicker({
			width: modules.VIEW_PORT_WIDTH,
			height: modules.VIEW_PORT_WIDTH,
			cropping: false
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
		this.setState({ loading: true });
		const { profile } = this.props.auth;
		const { name, description, path } = this.state;
		const category = this.props.category.selectedCategory;
		const key: string = createId();
		let item: ISubCategory = {
			key: key,
			page_key: pageKey(),
			created_by: profile,
			created_date: new Date(),
			created_date_key: pageKey(),
			name: name,
			description: description,
			fileUrl: '',
			status: StatusObject().ACTIVE,
			category: category,
			categoryKey: category.key
		};

		await this.props.category.uploadSubPhoto(path, (res: any) => {
			if (res) {
				item.fileUrl = res;
			} else {
				item.fileUrl = '';
			}
		});

		await this.props.category.saveSubCategory(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	public render() {
		const { name, description, path } = this.state;
		const { loading } = this.state;
		return (
			<AddCategoryScreen
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
			/>
		);
	}
}
