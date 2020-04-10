import * as React from 'react';
import AddGalleryScreen from './AddGalleryScreen';
import ImagePicker from 'react-native-image-crop-picker';
import { Alert, Clipboard } from 'react-native';
import { inject, observer } from 'mobx-react';
import { MobXGlobals } from 'mobx/lib/internal';

interface AppProps {
	product: any;
	navigation: any;
}
interface State {
	images: any;
	myCat: any;
	edit: boolean;
}

@inject('product')
@observer
export default class AddGalleryContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			images: [],
			myCat: [],
			edit: false
		};
	}

	componentDidMount() {
		const { params }: any = this.props.navigation.state;
		const { KEY } = params;

		this.props.product.getSelectedProduct(KEY, (item: any) => {
			if (item) {
				this.setState({ myCat: item.gallery });
			}
		});
	}

	_pickMultiple = () => {
		const { dataSelectedProduct } = this.props.product;
		ImagePicker.openPicker({
			multiple: true,
			width: 300,
			height: 400,
			cropping: true,
			compressImageQuality:0.8
		})
			.then(async (images: any) => {
				await this.setState({
					images: images.map((i: any) => {
						return { img: i.path, width: i.width, height: i.height, mime: i.mime };
					}),
					edit: false
				});
				await this.props.product.onSaveGallery(this.state.images, dataSelectedProduct);
			})
			.catch((e: any) => console.log('e', e));
	};

	_removeImage = async (item: any, index: any) => {
		const { dataSelectedProduct } = this.props.product;
		await this.props.product.removeGallery(item, dataSelectedProduct);
		// this.state.myCat.splice(index, 1);
		// this.setState({ myCat: this.state.myCat });
	};

	_onPassImgArrayToContainer = (item: any) => {
		this.setState({ myCat: item });
	};

	_onEdit = () => {
		this.setState({
			edit: !this.state.edit
		});
	};

	_onSaveImage = () => {
		// const { dataSelectedProduct } = this.props.product;
		// if (this.state.myCat.length < 1) {
		// 	Alert.alert('No image Selected');
		// 	return;
		// }
		// if (this.state.images.length < 1) {
		// 	return;
		// }
	};

	public render() {
		const { loading, loadingProduct } = this.props.product;
		return (
			<AddGalleryScreen
				removeImage={this._removeImage}
				onEdit={this._onEdit}
				edit={this.state.edit}
				goBack={() => this.props.navigation.goBack()}
				images={this.state.myCat}
				selectImage={this._pickMultiple}
				loading={loadingProduct}
				onSave={() => this._onSaveImage()}
			/>
		);
	}
}
