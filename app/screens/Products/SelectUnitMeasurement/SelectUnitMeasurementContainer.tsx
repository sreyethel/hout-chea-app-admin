
import React from 'react';
import { inject, observer } from 'mobx-react';
import SelectUnitMeasurement from './SelectUnitMeasurement';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { UNIT_MEASUREMENT } from '../../../dummy/unitmeasurement';

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
export default class SelectUnitMeasurementContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			category: '',
			loading: true,
			data: [],
			items: []
		};
	}

	componentDidMount() {

		this.setState({data:UNIT_MEASUREMENT})

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
		const {UMPrice} = this.props.product
		this.props.product.selectedUnitMeasurement(item,UMPrice);
		this.props.navigation.goBack();
	};

	render() {
		const { category, data } = this.state;
		
		return (
			<SelectUnitMeasurement
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
