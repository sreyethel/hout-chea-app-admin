import * as React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import ImagePicker from 'react-native-image-crop-picker';
import { inject, observer } from 'mobx-react';
import AddPromotionScreen from './AddPromotionScreen';
import { Alert } from 'react-native';
import moment from 'moment';

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

}

@inject('ads', 'auth', 'product')
@observer
export default class AddPromotionContainer extends React.Component<AppProps, State> {
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
	async componentDidMount() {
		await this.props.product.clearData()
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

	_onAddPromotion = async (date: Date, discount: number) => {
		await this.setState({ loading: true });
		const { userCanActive } = this.props.auth
		if (!userCanActive) {
			Alert.alert("Promotion add failed!")
			this.setState({ loading: false });
			return
		}
		const { profile } = this.props.auth;
		const { name, description, path, index } = this.state;
		const { dataSelectedItem, totalQty, UMPrice, varaint } = this.props.product
		// const { userCanActive } = this.props.auth
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
		if (dataSelectedItem.totalQty < totalQty) {
			Alert.alert("Invalid qty!", "Products are not much in stock")
			this.setState({ loading: false });
			return
		}
		const doc: any = {
			...dataSelectedItem,
		}
		const local: any = await UMPrice.filter((m: any) => { return m.multiply == 1 })

		if (local.length > 0) {
			doc.basePrice = Math.round(100 * local[0].price) / 100
		} else {
			const arr: any = await UMPrice.filter((m: any) => { return m.multiply >= 1 })
			if (arr.length > 0) {
				doc.basePrice = Math.round(100 * arr[0].price / arr[0].multiply) / 100
			} else {
				const array = await UMPrice.filter((m: any) => { return m.multiply <= 1 })
				doc.basePrice = Math.round(100 * array[0].price * array[0].multiply) / 100
			}

		}
		doc.totalQty = totalQty
		doc.umPrice = UMPrice
		doc.varaint = varaint
		doc.promotion_expriry_date = date
		doc.promotion_expriry_date_key = Number(new Date(date1));
		doc.promotion_name = this.state.name
		doc.promotion_description = this.state.description
		doc.promotion_create_by = profile
		doc.promotion_create_date = new Date
		doc.promotion_create_date_key = Number(new Date)
		doc.discount = discount
		await this.props.ads.uploadPromotionPhoto(path, (res: any) => {
			if (res) {
				doc.promotion_fileUrl = res;
			} else {
				doc.promotion_fileUrl = '';
			}
		});
		await this.props.ads.savePromotion(doc, (success: any) => {
			if (success == true) {
				Alert.alert("Promotion have been create successfuly.")
			} else {
				Alert.alert("Promotion failed!")
			}
			this.setState({ loading: false });
			this.props.navigation.goBack();
		});

	};

	public render() {
		const { name, description, path, index } = this.state;
		const { dataSelectedItem, totalQty } = this.props.product
		const { loading } = this.state;
		return (
			<AddPromotionScreen
				index={String(index)}
				loading={loading}
				onPresCamera={this._onSelectCamera}
				onPresImage={this._onSelectImage}
				navigation={this.props.navigation}
				name={name}
				image={path}
				onSave={this._onAddPromotion}
				description={description}
				onChangeName={(val) => this.setState({ name: val })}
				onChangeDescription={(val) => this.setState({ description: val })}
				onChangeIndex={(val) => this.setState({ index: val })}
				dataSelectedItem={dataSelectedItem}
				isDiscount={true}
				totalQty={totalQty}
			/>
		);
	}
}
