import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import { inject, observer } from 'mobx-react';
import { ICategory, ISubCategory } from '../../../interface/category.interface';
import EditSubCategoryScreen from './EditSubCategoryScreen';
import { categoryRef } from '../../../services/data.service';

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
export default class EditSubCategoryContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			description: '',
			path: '',
			loading: false
		};
	}

	componentDidMount() {}

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
		await this.setState({ loading: true });
		const { profile } = this.props.auth;
		const { name, description, path } = this.state;
		const selectedItem = this.props.navigation.getParam('item');

		let item: ISubCategory = {
			key: selectedItem.key,
			page_key: selectedItem.page_key,
			categoryKey: selectedItem.categoryKey,
			category: selectedItem.category,
			created_by: profile,
			created_date: selectedItem.created_date,
			created_date_key: selectedItem.created_date_key,
			name: name ? name : selectedItem.name,
			description: description ? description : selectedItem.description,
			fileUrl: selectedItem.fileUrl,
			status: null
		};

		path
			? await this.props.category.uploadPhoto(path, (res: any) => {
					if (res) {
						item.fileUrl = res;
					} else {
						item.fileUrl = selectedItem.fileUrl;
					}
				})
			: (item.fileUrl = selectedItem.fileUrl);

		await this.props.category.updateSubCategory(item);
		this.setState({ loading: false });
		this.props.navigation.goBack();
	};

	public render() {
		const { name, description, path } = this.state;
		const { loading } = this.state;
		const item = this.props.navigation.getParam('item');

		return (
			<EditSubCategoryScreen
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				name={name ? name : item.name}
				image={path ? path : item.fileUrl}
				onSave={this._onAddCategory}
				description={description ? description : item.description}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeDescription={(val) => this.setState({ description: val })}
			/>
		);
	}
}
