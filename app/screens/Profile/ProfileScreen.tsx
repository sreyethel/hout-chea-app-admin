import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

import MODULE from '../../modules';
import FastImage from 'react-native-fast-image';
import MenuIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Feather';
import _styles from '../../_styles';
import modules from '../../modules';
import Header from '../../components/Header';
import { FontGSansBold } from '../../../functions/customFont';

export interface AppProps {
	navigation: any;
	user: any;
	onSignOut: any;
}

export interface AppState { }

export default class ProfileScreen extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {};
	}

	_renderProfile = () => {
		const { user } = this.props;
		return (
			<View style={styles.profileContainer}>
				{user ? (
					<View style={[styles.textContainer, { flex: 1 }]}>
						<Text style={styles.textName}>{user.displayName}</Text>
						<Text style={styles.textPhone}>{user.phoneNumber}</Text>
						<Text style={styles.textPhone}>{user.email}</Text>
					</View>
				) : (
						<Text style={styles.textName}>Welcome Member</Text>
					)}
				<View style={styles.profileShadow}>
					{user ? (
						<View style={styles.ImgContainer}>
							<FastImage
								style={styles.profileImg}
								source={{
									uri: String(user.photoURL ? user.photoURL : '')
								}}
							/>
						</View>
					) : (
							<View style={styles.ImgContainer}>
								<FastImage
									style={styles.profileImg}
									source={{
										uri:
											'https://images.unsplash.com/photo-1475821660373-587d74229161?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'
									}}
								/>
							</View>
						)}
				</View>
			</View>
		);
	};

	_renderAccountSetting = () => {
		const { user } = this.props;
		return (
			<View style={styles.bodyContainer}>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('EDIT_USER')}
					style={styles.settingButton}
				>
					<View style={styles.iconContainer}>
						<MenuIcon style={styles.settingIcon} name="portrait" />
					</View>
					<View style={styles.textSettingContainer}>
						<Text style={styles.settingText}>User Information</Text>
						<Text numberOfLines={1} style={styles.settingSubText}>
							Update your name, phone numbers and email address.
						</Text>
					</View>
					<Icon style={styles.arrowIcon} name="chevron-right" />
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('AddLocation')}
					style={styles.settingButton}
				>
					<View style={styles.iconContainer}>
						<MenuIcon style={styles.settingIcon} name="map" />
					</View>
					<View style={styles.textSettingContainer}>
						<Text style={styles.settingText}>Store Location</Text>
						<Text numberOfLines={1} style={styles.settingSubText}>
							Make Update to your current address.
						</Text>
					</View>
					<Icon style={styles.arrowIcon} name="chevron-right" />
				</TouchableOpacity>
				{user ? (
					<TouchableOpacity onPress={() => this.props.onSignOut()} style={styles.settingButton}>
						<View style={styles.iconContainer}>
							<MenuIcon style={styles.settingIcon} name="exit-to-app" />
						</View>
						<View style={styles.textSettingContainer}>
							<Text style={styles.settingText}>Sign Out</Text>
							<Text numberOfLines={1} style={styles.settingSubText}>
								Sign out from system
							</Text>
						</View>
						<Icon style={styles.arrowIcon} name="chevron-right" />
					</TouchableOpacity>
				) : (
						<TouchableOpacity
							onPress={() => this.props.navigation.navigate('LOGIN')}
							style={styles.settingButton}
						>
							<View style={styles.iconContainer}>
								<MenuIcon style={styles.settingIcon} name="exit_to_app" />
							</View>
							<View style={styles.textSettingContainer}>
								<Text style={styles.settingText}>Sign In</Text>
								<Text numberOfLines={1} style={styles.settingSubText}>
									Sign in to system
							</Text>
							</View>
							<Icon style={styles.arrowIcon} name="chevron-right" />
						</TouchableOpacity>
					)}
			</View>
		);
	};

	renderNavBar = () => <View style={{ backgroundColor: '#fff' }} />;

	public render() {
		return (
			<View style={[_styles.flx1, _styles.background]}>
				{this._renderProfile()}
				{this._renderAccountSetting()}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	arrowIcon: {
		color: '#999',
		fontSize: MODULE.FONT_H6 - 2
	},
	textPhone: {
		fontSize: modules.FONT,
		color: modules.WHITE
	},
	HeaderContainer: {
		backgroundColor: MODULE.COLOR_MAIN
	},
	profileContainer: {
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		shadowColor: '#555',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.12,
		shadowRadius: 5.46,
		elevation: 0,
		padding: modules.BODY_HORIZONTAL * 2,

		backgroundColor: MODULE.COLOR_MAIN,
		marginTop: MODULE.BODY_HORIZONTAL,
		..._styles.shadowSmall
	},
	ImgContainer: {
		width: MODULE.VIEW_PORT_WIDTH / 4,
		height: MODULE.VIEW_PORT_WIDTH / 4,
		borderRadius: MODULE.VIEW_PORT_WIDTH / 4 / 2,
		borderWidth: 2,
		borderColor: MODULE.WHITE,
		backgroundColor: MODULE.WHITE,
		overflow: 'hidden'
	},
	profileImg: {
		flex: 1
	},
	profileShadow: {
		backgroundColor: MODULE.WHITE,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.32,
		shadowRadius: 5.46,
		elevation: 0,
		width: MODULE.VIEW_PORT_WIDTH / 4,
		height: MODULE.VIEW_PORT_WIDTH / 4,
		borderRadius: MODULE.VIEW_PORT_WIDTH / 4 / 2
	},
	textContainer: {
		// marginTop: MODULE.BODY_HORIZONTAL,
		// alignItems: 'center',
		// justifyContent: 'center'
	},
	textName: {
		fontSize: MODULE.FONT_H6,
		...FontGSansBold,
		color: MODULE.WHITE,
		textTransform: 'uppercase',
		marginBottom: MODULE.BODY_HORIZONTAL
	},
	textMember: {
		fontSize: MODULE.FONT_P,
		color: MODULE.SUB_TEXT
	},
	IconMember: {
		fontSize: MODULE.FONT,
		color: 'rgba(255,255,255,0.7)',
		marginRight: MODULE.BODY_HORIZONTAL / 2
	},
	optionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
		width: '100%',
		paddingHorizontal: MODULE.BODY_HORIZONTAL
	},
	MenuOption: {
		width: MODULE.BODY_HORIZONTAL_24 * 1.2,
		height: MODULE.BODY_HORIZONTAL_24 * 1.2
	},
	buttonOption: {
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor:MODULE.COLOR_MAIN,
		// width: (MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL * 7) / 4,
		padding: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS,
		borderColor: 'rgba(0,0,0,0.2)',
		flex: 1
	},
	textMenu: {
		marginTop: MODULE.BODY_HORIZONTAL / 1.2,
		fontWeight: '500',
		fontSize: MODULE.FONT_P - 2,
		color: 'rgba(255,255,255,1)'
	},
	imgIconContainer: {
		// borderWidth: 1,
		width: MODULE.BODY_HORIZONTAL_24 * 2,
		borderRadius: MODULE.CARD_RADIUS,
		height: MODULE.BODY_HORIZONTAL_24 * 2,
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: MODULE.BORDER_COLOR
	},
	iconOption: {
		fontSize: MODULE.FONT_H4,
		color: MODULE.WHITE
	},
	textSettingContainer: {
		flex: 1,

		paddingBottom: MODULE.BODY_HORIZONTAL
	},
	bodyContainer: {
		backgroundColor: MODULE.WHITE,
		paddingBottom: MODULE.BODY_HORIZONTAL,
		borderBottomWidth: 10,
		borderBottomColor: MODULE.BORDER_COLOR,
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		marginTop: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.RADIUS / 2,
		..._styles.shadowSmall
	},
	PrivacyContainer: {
		backgroundColor: MODULE.WHITE,
		paddingBottom: MODULE.BODY_HORIZONTAL,
		borderBottomWidth: 10,
		borderBottomColor: MODULE.BORDER_COLOR
	},
	iconContainer: {
		// backgroundColor: MODULE.BORDER_COLOR,

		marginLeft: MODULE.BODY_HORIZONTAL,

		width: MODULE.BODY_HORIZONTAL_24 * 2
	},
	settingButton: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: MODULE.BODY_HORIZONTAL,
		borderRadius: MODULE.CARD_RADIUS,
		marginTop: MODULE.BODY_HORIZONTAL * 2,
		borderBottomWidth: 1,
		borderBottomColor: MODULE.BORDER_COLOR
	},
	settingText: {
		fontSize: MODULE.FONT - 1,
		color: 'rgba(0,0,0,0.9)',
		fontWeight: '400'
	},
	settingSubText: {
		fontSize: MODULE.FONT_S,
		color: 'rgba(0,0,0,0.5)',
		marginTop: MODULE.BODY_HORIZONTAL / 4
	},
	settingIcon: {
		fontSize: MODULE.FONT_H2 + 2,
		color: 'rgba(0,0,0,0.5)'
	},
	iconRight: {
		marginLeft: MODULE.BODY_HORIZONTAL,
		fontSize: MODULE.FONT - 3,
		color: 'rgba(0,0,0,0.2)',
		opacity: 0
	},
	labelContainer: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL_24,
		paddingTop: MODULE.BODY_HORIZONTAL_24
	},
	labelText: {
		fontSize: MODULE.FONT_H3 - 5,
		fontWeight: '400'
	},
	sublabelText: {
		fontSize: MODULE.FONT_P,
		fontWeight: '400',
		marginTop: MODULE.BODY_HORIZONTAL / 2,
		color: 'rgba(0,0,0,0.4)'
	},
	navBar: {
		paddingHorizontal: MODULE.BODY_HORIZONTAL,

		backgroundColor: MODULE.WHITE,
		borderBottomWidth: 1,
		height: '100%',

		alignItems: 'center',
		borderBottomColor: '#e0e0e0',
		flexDirection: 'row'
	},
	navbarText: {
		marginLeft: MODULE.BODY_HORIZONTAL,
		fontWeight: '500',
		fontSize: MODULE.FONT_H5
	},
	navbarImage: {
		width: MODULE.BODY_HORIZONTAL_24 * 2,
		height: MODULE.BODY_HORIZONTAL_24 * 2,
		borderRadius: MODULE.BODY_HORIZONTAL_24 * 2 / 2
	},
	AuthButton: {
		width: MODULE.BODY_HORIZONTAL_24 * 4,
		height: MODULE.BODY_HORIZONTAL_24 * 1.5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MODULE.COLOR_MAIN,
		borderRadius: MODULE.RADIUS_BUTTON
	},
	textSignIn: {
		color: MODULE.COLOR_MAIN,
		fontWeight: '600'
	},
	SubmitButton: {
		borderColor: MODULE.COLOR_MAIN,
		padding: MODULE.BODY_HORIZONTAL,
		marginHorizontal: MODULE.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: MODULE.RADIUS,
		marginTop: MODULE.BODY_HORIZONTAL,
		borderWidth: 1
	}
});
