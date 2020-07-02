import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import { createId } from '../../../../services/data.service';
import { pageKey } from '../../../../services/mapping.service';
import { IBanner } from '../../../../interface/ads.interface';
import EditBannerScreen from './EditPromotionScreen';
import EditPromotionScreen from './EditPromotionScreen';
import moment from 'moment';
import { Alert } from 'react-native';

interface AppProps extends NavigationStackScreenProps {
	ads: any;
	auth: any;
	product: any
}

interface State {
	name: string;
	description: string;
	path: string;
	loading: boolean;
	index: number;
	discount: number;
	date: Date;
}

@inject('ads', 'auth', 'product')
@observer
export default class EditPromotionContainer extends React.Component<AppProps, State> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: '',
			description: '',
			path: '',
			loading: true,
			index: 0,
			discount: 0,
			date: null,

		};
	}

	async	componentDidMount() {
		const { dataSelectedItem } = this.props.product
		await this.setState({
			name: dataSelectedItem.promotion_name,
			description: dataSelectedItem.promotion_description,
			path: dataSelectedItem.promotion_fileUrl,
			discount: dataSelectedItem.discount,
			date: dataSelectedItem.promotion_expriry_date
		})
		await this.setState({ loading: false })
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

	_onSave = async (date: Date, discount: number) => {
		await this.setState({ loading: true });
		const { profile } = this.props.auth;
		const { name, description, path, index } = this.state;
		const { dataSelectedItem, totalQty, UMPrice, varaint } = this.props.product
		const { userCanActive } = this.props.auth
		const date1 = Number(moment(date).format('YYYYMMDD'))
		const date2 = Number(moment(new Date).format('YYYYMMDD'))

		if (date1 == date2) {
			Alert.alert("Expriry date must be bigger than today!")
			this.setState({ loading: false });
			return
		}
		if (!userCanActive) {
			Alert.alert("Category add failed!")
			this.setState({ loading: false });
			return
		}
		if (!name) {
			Alert.alert("Invalid promotion name!")
			this.setState({ loading: false });
			return
		}
		if (!description) {
			Alert.alert("Invalid description name!")
			this.setState({ loading: false });
			return
		}
		if (!discount) {
			Alert.alert("Invalid Dicount(%) !")
			this.setState({ loading: false });
			return
		}
		if (discount > 99) {
			Alert.alert("Dicount(%) cannot bigger than 100!")
			this.setState({ loading: false });
			return
		}
		if (!path) {
			Alert.alert("Invalid promotion image name!")
			this.setState({ loading: false });
			return
		}
	
		const doc: any = {
			...dataSelectedItem,
		}
		doc.promotion_expriry_date = date
		doc.promotion_expriry_date_key = Number(new Date(date1));
		doc.promotion_name = this.state.name
		doc.promotion_description = this.state.description
		doc.promotion_edit_by = profile
		doc.promotion_edit_date = new Date
		doc.promotion_edit_date_key = Number(new Date)
		doc.discount = discount
		if(path !== doc.promotion_fileUrl ){
			await this.props.ads.uploadPromotionPhoto(path, (res: any) => {
				if (res) {
					doc.promotion_fileUrl = res;
				} else {
					doc.promotion_fileUrl = '';
				}
			});
		}
		
		await this.props.ads.EditPromotion(doc, (success: any) => {
			if (success == true) {
				Alert.alert("Promotion have been updated successfuly.")
			} else {
				Alert.alert("Update Promotion Failed!")
			}
			this.setState({ loading: false });
			this.props.navigation.goBack();
		});
	};

	public render() {
		const { name, description, path, index, discount, date } = this.state;
		const { loading } = this.state;
		const { dataSelectedItem, totalQty } = this.props.product
		return (
			<EditPromotionScreen
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				name={name ? name : dataSelectedItem.promotion_name}
				image={path ? path : dataSelectedItem.promotion_fileUrl}
				date={date ? date : dataSelectedItem.promotion_expriry_date}
				onSave={this._onSave}
				description={description ? description : dataSelectedItem.promotion_description}
				discount={discount ? discount : dataSelectedItem.discount}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeDescription={(val) => this.setState({ description: val })}
				onDiscount={(val: number) => this.setState({ discount: val })}
				dataSelectedItem={dataSelectedItem}
				totalQty={totalQty}
			/>
		);
	}
}
