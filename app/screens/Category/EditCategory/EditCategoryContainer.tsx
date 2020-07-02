import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import modules from '../../../modules';
import { inject, observer } from 'mobx-react';
import { ICategory } from '../../../interface/category.interface';
import { createId } from '../../../services/data.service';
import { pageKey, StatusObject } from '../../../services/mapping.service';
import EditCategoryScreen from './EditCategoryScreen';

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
export default class EditCategoryContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			description: '',
			path: '',
			loading: false
		};
	}

	componentDidMount() { }

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
		const selectedItem = this.props.navigation.getParam('item');
		let item: ICategory = {
			key: selectedItem.key,
			page_key: selectedItem.page_key,
			created_by: profile,
			created_date: selectedItem.created_date,
			created_date_key: selectedItem.created_date_key,
			name: name ? name : selectedItem.name,
			description: description ? description : selectedItem.description,
			fileUrl: selectedItem.fileUrl,
			status: StatusObject().ACTIVE,
			market: selectedItem.market
		};

		path
			? await this.props.category.uploadPhoto(path, (res: any) => {
				if (res) {
					item.fileUrl = res;
				} else {
					item.fileUrl = selectedItem.fileUrl;
				}
			})
			: null;

		await this.props.category.updateCategory(item,(success:any)=>{
			if(success){
				this.setState({ loading: false });
				this.props.navigation.goBack();
			}else{
				this.setState({ loading: false });
			}
		
		});
	
	
	};

	public render() {
		const { name, description, path } = this.state;
		const { loading } = this.state;
		const item = this.props.navigation.getParam('item');

		return (
			<EditCategoryScreen
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
