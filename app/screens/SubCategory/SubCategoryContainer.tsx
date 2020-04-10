import * as React from 'react';
import SubCategoryScreen from './SubCategoryScreen';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react/native';
import { Alert } from 'react-native';

export interface AppProps {
	navigation: any;
	category: any;
}

export interface AppState {
	category: any;
}

@inject('category')
@observer
export default class SubCategoryContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			category: { name: '' }
		};
	}

	componentDidMount() {
		const item = this.props.navigation.getParam('item');
		this.setState({ category: item });
		this.props.category.fetchSubCategory(item.key);
	}

	_onDelete = (item: any) => {
		Alert.alert(
			'Delete',
			'Are you sure you want to delete this Category?',
			[
				{ text: 'Yes', onPress: () => this.props.category.deleteSubCategory(item) },
				{ text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
			],
			{ cancelable: false }
		);
	};

	_onEdit = (item: any) => {
		this.props.navigation.navigate('EditSubCategory', { item: item });
	};

	public render() {
		const { dataSubCategory } = this.props.category;
		return (
			<SubCategoryScreen
				onEdit={this._onEdit}
				dataSubCategory={dataSubCategory}
				category={this.state.category}
				navigation={this.props.navigation}
				onDelete={this._onDelete}
			/>
		);
	}
}
