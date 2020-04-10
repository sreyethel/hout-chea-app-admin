import React from 'react';
import AddProductDetail from './AddProductDetail';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';

interface Props extends NavigationStackScreenProps {
	product: any;
}

interface State {
	data: Array<any>;
	text: string;
	items: Array<any>;
	loading: boolean;
}
@inject('product')
@observer
export default class AddProductDetailContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			text: '',
			data: [],
			items: [],
			loading: true
		};
	}

	async componentDidMount() {
		const params: any = this.props.navigation.state.params;
		let { dataSelectedProduct} = this.props.product;
		const data =
			params.TYPE === 'SIZE'
				? dataSelectedProduct.size.length > 0
					? (this.props.product.size = dataSelectedProduct.size)
					: this.props.product.size
				: params.TYPE === 'STYLE'
					? dataSelectedProduct.style.length > 0
						? (this.props.product.style = dataSelectedProduct.style)
						: this.props.product.style
					: params.TYPE === 'MATERIAL'
						? dataSelectedProduct.material.length > 0
							? (this.props.product.material = dataSelectedProduct.material)
							: this.props.product.material
						: dataSelectedProduct.grade.length > 0
							? (this.props.product.grade = dataSelectedProduct.grade)
							: this.props.product.grade;
		this.setState({ data, items: data, loading: false });
	}

	_onRemoveItem = (item: any) => {
		const params: any = this.props.navigation.state.params;
		this.props.product.removeVariant(item, params.TYPE);
		const data =
			params.TYPE === 'SIZE'
				? this.props.product.size
				: params.TYPE === 'STYLE'
					? this.props.product.style
					: params.TYPE === 'MATERIAL' ? this.props.product.material : this.props.product.grade;
		this.setState({ data, items: data, loading: false });
	};

	_onReturn = () => {
		const { text } = this.state;
		const params: any = this.props.navigation.state.params;
		this.props.product.addVariant(text, params.TYPE);
		const data =
			params.TYPE === 'SIZE'
				? this.props.product.size
				: params.TYPE === 'STYLE'
					? this.props.product.style
					: params.TYPE === 'MATERIAL' ? this.props.product.material : this.props.product.grade;
		this.setState({ data, items: data, loading: false, text: '' });
	};

	render() {
		const { data, text } = this.state;
		const params: any = this.props.navigation.state.params;
		return (
			<AddProductDetail
				goBack={() => this.props.navigation.goBack()}
				data={data}
				loading={false}
				search={text}
				title={
					params.TYPE === 'SIZE' ? (
						'Selection Size'
					) : params.TYPE === 'STYLE' ? (
						'Selection Style'
					) : params.TYPE === 'MATERIAL' ? (
						'Selection Material'
					) : (
						'Selection Grade'
					)
				}
				onChangeText={(text) => this.setState({ text: text })}
				onSearch={this._onReturn}
				searchPlaceHolder={`Input here...`}
				removeItem={this._onRemoveItem}
			/>
		);
	}
}
