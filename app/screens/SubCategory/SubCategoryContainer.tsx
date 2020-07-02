import * as React from 'react';
import SubCategoryScreen from './SubCategoryScreen';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react/native';
import { Alert } from 'react-native';

export interface AppProps {
	navigation: any;
	category: any;
	auth: any;
}

export interface AppState {
	category: any;
}

@inject('category', 'auth')
@observer
export default class SubCategoryContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			category: { name: '' }
		};
	}

	componentDidMount() {
		const { selectedCategory } = this.props.category
		this.props.category.fetchSubCategory(selectedCategory.key);
	}

	_onDelete = (item: any) => {
		const { profile } = this.props.auth
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Category?',
			[
				{ text: 'Yes', onPress: () => this.props.category.deleteSubCategory(profile, item.key) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditSubCategory', { item: item });
	};

	public render() {
		const { dataSubCategory, loadingSubCategory } = this.props.category;
		return (
			<SubCategoryScreen
				onEdit={this._onEdit}
				dataSubCategory={dataSubCategory}
				navigation={this.props.navigation}
				onDelete={this._onDelete}
				loading={loadingSubCategory}
			/>

		);
	}
}
