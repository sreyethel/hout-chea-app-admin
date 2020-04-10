import * as React from 'react';
import { Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import _styles from '../_styles';
import modules from '../modules';
import AllProductContainer from '../screens/Products/AllProduct/AllProductContainer';

interface Props {
	navigation: any;
}

export default createMaterialTopTabNavigator(
	{
		AllProductTab: AllProductContainer
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarLabel: ({ focused }:any) => {
				const { routeName } = navigation.state;
				let labelName;
				let labelIcon: any;
				if (routeName === 'ProductRequestTab') {
					labelName = `Request`;
					labelIcon = `inbox`;
				} else if (routeName === 'AllProductTab') {
					labelName = `All`;
					labelIcon = `feather`;
				}
				return (
					<View style={[ _styles.flx1, _styles.rows ]}>
						{/* <Icon name={labelIcon} color={modules.WHITE} style={{ paddingRight: modules.BIG_SPACE, fontSize: 20, paddingBottom: 3 }} /> */}
						<Text style={focused ? _styles.TopTabActive : _styles.TopTab}>{labelName}</Text>
					</View>
				);
			}
		}),
		swipeEnabled: true,
		tabBarOptions: {
			activeTintColor: modules.WHITE_SUB,
			style: {
				backgroundColor: modules.DEFAULT,
				justifyContent: 'center',
				height: 55
			},
			labelStyle: {
				opacity: 1
			},
			indicatorStyle: {
				backgroundColor: modules.WHITE,
				height: 3.5
			}
		}
	}
);
