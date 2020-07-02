
import React from 'react';
import { inject, observer } from 'mobx-react';
import SelectProductDetail from './SelectProductDetail';
import { NavigationStackScreenProps } from 'react-navigation-stack';

interface Props extends NavigationStackScreenProps {
	product: any;
	auth: any;
	category: any;
}

interface State {
	category: string;
	loading: boolean;
	data: any;
	items: Array<any>;
}

@inject('product', 'auth', 'category')
@observer
export default class SelectProductDetailContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			category: '',
			loading: true,
			data: [],
			items: []
		};
	}

	async	componentDidMount() {
	
		 this.props.category.fetchSubCategory('', (data: any) => {
        if (data) {
            this.setState({ data, items: data, loading: false });
        }
    });

	}

	_onSearch = () => {
		const { category, items } = this.state;
		if (!category) {
			this.setState({ data: items });
			return;
		}
		const rows = items.filter((m) => m && `${m.name}`.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
		this.setState({ data: rows });
	};

	_onSelect = (item: any) => {
		this.props.product.selectedCategory(item);
		this.props.navigation.goBack();
	};

	render() {
		const { category, data } = this.state;
		return (
			<SelectProductDetail
				goBack={() => this.props.navigation.goBack()}
				data={data}
				onPress={this._onSelect}
				loading={false}
				search={category}
				onChangeText={(text) => this.setState({ category: text })}
				onSearch={this._onSearch}
				searchPlaceHolder={'Search category'}
			/>
		);
	}
}
