import React from 'react';
import SignUpScreen from './SignUpScreen';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { inject, observer } from 'mobx-react';
import { Alert, StatusBar } from 'react-native';

interface Props extends NavigationStackScreenProps {
	store: any;
}

interface State {
	name: string;
	disabled: boolean;
}

@inject('store')
@observer
export default class SignUpContainer extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			name: '',
			disabled: true
		};
	}
	componentDidMount() {
		StatusBar.setBarStyle('dark-content');
	}

	componentWillUnmount() {
		StatusBar.setBarStyle('light-content');
	}

	onContinue = () => {
		const { name } = this.state;
		if (!name) {
			Alert.alert('Create Your Store', 'Store name is required. Please try again!');
			return;
		}
		this.props.store.validateStore(name, this.props.navigation);
	};

	render() {
		const { process } = this.props.store;
		return (
			<SignUpScreen
				name={this.state.name}
				onChangeName={(value: any) => {
					this.setState({ name: value, disabled: value ? false : true });
				}}
				onContinue={this.onContinue}
				process={process}
				disabled={this.state.disabled}
				goBack={() => this.props.navigation.goBack()}
			/>
		);
	}
}
