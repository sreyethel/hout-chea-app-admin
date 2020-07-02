import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import _styles from '../../_styles';
import modules from '../../modules';

export default () => {
	return <View style={[_styles.containerPrimary, { backgroundColor: modules.PRIMARY, flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
		<StatusBar backgroundColor={modules.PRIMARY} />
		<Image
			source={require("../../modules/assets/logo.png")}
			style={{ width: modules.VIEW_PORT_WIDTH / 3, height: modules.VIEW_PORT_WIDTH / 3 }} />

	</View>;
};
