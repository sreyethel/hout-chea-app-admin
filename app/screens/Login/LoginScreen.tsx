import React from 'react';
import { StatusBar, View } from 'react-native';
import _styles from '../../_styles';
import modules from '../../modules';
import LoginComponent from '../../components/LoginComponent';
interface Props {
	onLoginPhone: () => void;
	onCreateStore: () => void;
}

export default ({ onLoginPhone, onCreateStore }: Props) => {
	return (
		<View style={[ _styles.flx1, { backgroundColor: modules.COLOR_MAIN } ]}>
			<StatusBar backgroundColor={modules.COLOR_MAIN} barStyle="light-content" />
			<LoginComponent onSignIn={onLoginPhone} onSignUp={onCreateStore} />
		</View>
	);
};
