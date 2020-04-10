import * as React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react/native';

export interface AppProps {
	navigation: any;
	auth: any;
}

export interface AppState {}

@inject('auth')
@observer
export default class ProfileContainer extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
	
	}

	_onSignOut = () => {
		Alert.alert(
			'',
			'Are you sure you want to sign out?',
			[
				{ text: 'Yes', onPress: () => this.props.auth.logOut() },
				{
					text: 'Cancel',
					onPress: () => console.log('cancel'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		);
	};

	public render() {
		const { profile } = this.props.auth;
		return <ProfileScreen onSignOut={this._onSignOut} user={profile} navigation={this.props.navigation} />;
	}
}
