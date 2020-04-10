import * as React from 'react';
import { Alert } from 'react-native';
import CategoryScreen from './CategoryScreen';
import { inject, observer } from 'mobx-react';

export interface AppProps {
	navigation: any;
	category: any;
}

export interface AppState {}

@inject('category')
@observer
export default class CategoryContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		this.props.category.fetchCategory();
	}

	_onDeleteCategory = (item: any) => {
		Alert.alert(
			'Delete Category',
			'Deleting this category and all it sub-catgory?',
			[
				{ text: 'Yes', onPress: () => this.props.category.deleteCategory(item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditCategory', { item: item });
	};

	public render() {
		const { dataCategory } = this.props.category;
		return (
			<CategoryScreen
				onEdit={this._onEdit}
				onDelete={this._onDeleteCategory}
				dataCategory={dataCategory}
				navigation={this.props.navigation}
			/>
		);
	}
}
