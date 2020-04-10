import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import SelectDepartmentScreen from './SelectDepartmentScreen';
import { inject } from 'mobx-react/native';
import { observer } from 'mobx-react';

export interface AppProps {
	navigation: any;
	store: any;
	auth: any;
}

export interface AppState {
	selected: Array<any>;
	isCheck: boolean;
	isContinue: boolean;
}

@inject('store', 'auth')
@observer
export default class SelectDepartmentContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = { selected: [], isCheck: false, isContinue: false };
	}
	componentDidMount() {
		this.props.store.fetchDepartment();
	}

	_onSelected = (item: any) => {
		const { selected } = this.state;
		let newArr: Array<any> = [];
		if (!selected.includes(item)) {
			newArr = [ ...selected, item ];
		} else {
			newArr = selected.filter((a: any) => a !== item);
		}
		this.setState({ selected: newArr });
		if (this.state.selected.length > 0) {
			this.setState({ isContinue: true });
		} else {
			this.setState({ isContinue: false });
		}
	};

	_onSaveDepartment = async () => {
		const { selectedStore } = this.props.auth;
		const { profile } = this.props.auth;
		await this.props.store.addStoreDepartment(profile, selectedStore.key, this.state.selected, (success: any) => {
			if (success) {
				Alert.alert('successfully Add Department');
			}
		});
	};

	public render() {
		const { dataDepartment, process } = this.props.store;
		return (
			<SelectDepartmentScreen
				isCheck={this.state.isCheck}
				selected={this.state.selected}
				onSelect={this._onSelected}
				dataDepartment={dataDepartment}
				navigation={this.props.navigation}
				isContinue={this.state.isContinue}
				loading={process}
				onSaveDepartment={this._onSaveDepartment}
			/>
		);
	}
}
