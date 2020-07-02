import * as React from 'react';
import { Alert, Text } from 'react-native';
import CategoryScreen from './CategoryScreen';
import { inject, observer } from 'mobx-react';
import _styles from '../../_styles';

interface AppProps {
	navigation: any;
	category: any;
	auth: any
}

interface AppState { }

@inject('category', 'auth')
@observer
export default class CategoryContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}


	_onDeleteCategory = (item: any) => {
		const { profile } = this.props.auth

		Alert.alert(
			'Delete Category',
			'Deleting this category and all it sub-catgory?',
			[
				{ text: 'Yes', onPress: () => this.props.category.deleteCategory(profile, item.key) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditCategory', { item: item });
	};
	_onCategoryByMarket = (key: string) => {
		if (key == 'All') {
			this.props.category.fetchCategory()
		} else {
			this.props.category.fetchCategory(key)
		}

	}
	_onSubCategory = (item: any) => {
		this.props.category.setCategory(item)
		this.props.navigation.navigate('SubCategory', { item: item, title: item.name });
		

	}

	public render() {
		const { dataCategory, loading, dataMarket, loadingMarket } = this.props.category;
	
			return (
				<CategoryScreen
					onEdit={this._onEdit}
					onDelete={this._onDeleteCategory}
					dataCategory={dataCategory}
					loadingMarket={loadingMarket}
					dataMarket={dataMarket}
					navigation={this.props.navigation}
					loading={loading}
					onCategoryByMarket={this._onCategoryByMarket}
					onSubCategory={this._onSubCategory}
				/>
			);

		
	}
}
