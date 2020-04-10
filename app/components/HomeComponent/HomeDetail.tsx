import * as React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import _styles from '../../_styles';
import modules from '../../modules';
import QRCode from 'react-native-qrcode-svg';

import { fontSemiBold, fontGSans, FontGSansSemiBold, FontGSansBold } from '../../../functions/customFont';
import { isTypeX, qrVcard } from '../../../functions/functions';

interface Props {
	store?: any;
	account?: any;
}

export default ({ store, account }: Props) => {
	function vcard() {
		let qrValue = qrVcard(
			account ? account.displayName : 'HoutChea',
			store ? store.name : 'HoutChea',
			store ? store.phone : '+85578888111',
			store ? store.province.en_name : 'Cambodia',
			store ? store.email : 'seller@HoutChea.com'
		);
		return qrValue;
	}

	if (store)
		return (
			<View style={styles.container}>
				<View style={styles.StoreAddress}>
					{/* <View style={_styles.separate}>
					<View style={_styles.rows}>
						{store ? (
							<View style={styles.profileBorder}>
								<FastImage
									style={styles.img}
									source={{ uri: String(store.avatar ? store.avatar : null) }}
								/>
							</View>
						) : null}

						<View style={styles.textContainer}>
							{account.displayName ? (
								<Text style={styles.name}>{account.displayName}</Text>
							) : (
								<Text style={styles.name}>Admin</Text>
							)}

							<Text style={styles.role}>Owner</Text>
						</View>
					</View>
					<TouchableOpacity>
						<IoIcon style={styles.moreIcon} name="ios-more" />
					</TouchableOpacity>
				</View> */}
					<View style={_styles.separate}>
						<View style={_styles.flx1}>
							{store ? (
								<Text style={styles.storeName} numberOfLines={2}>
									{store.name}
								</Text>
							) : null}
							{store ? <Text style={styles.phone}>{store.phoneNumber}</Text> : null}

							<Text style={styles.textAddress}>
								{store.province.en_name}, {store.district.en_name}, {store.commune.en_name}},{' '}
								{store.village.en_name}
							</Text>
						</View>
						<View style={styles.qrContainer}>
							<QRCode
								size={Platform.OS === 'ios' ? isTypeX() ? 130 : 130 : modules.VIEW_PORT_HEIGHT / 5.2}
								value={vcard()}
								logoBackgroundColor={'transparent'}
							/>
						</View>
					</View>
				</View>
			</View>
		);

	return <View />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	StoreAddress: {
		backgroundColor: modules.WHITE,
		margin: modules.BODY_HORIZONTAL,
		padding: modules.BODY_HORIZONTAL,
		borderRadius: modules.RADIUS
	},
	icon: {
		fontSize: 24,
		color: modules.COLOR_MAIN
	},
	profileBorder: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 50,
		width: 50,
		borderRadius: modules.RADIUS,
		borderColor: modules.BORDER_COLOR,
		borderWidth: 2,
		overflow: 'hidden'
	},
	img: {
		width: '100%',
		height: '100%'
	},
	name: {
		fontSize: modules.FONT_P,
		...fontSemiBold
	},
	role: {
		fontSize: modules.FONT_S,
		marginTop: -modules.BODY_HORIZONTAL / 3,
		color: '#555'
	},
	textContainer: {
		marginLeft: modules.BODY_HORIZONTAL
	},
	moreIcon: {
		fontSize: modules.FONT_H5,
		color: '#555'
	},
	storeName: {
		fontSize: modules.FONT_H5,
		...FontGSansBold,
		marginTop: modules.BODY_HORIZONTAL
	},
	textAddress: {
		fontSize: modules.FONT_P,
		width: '100%',
		color: '#555',
		...fontGSans
	},
	qrContainer: {
		marginLeft: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL / 2
	},
	phone: {
		fontSize: modules.FONT,
		marginVertical: modules.BODY_HORIZONTAL / 2,
		...FontGSansSemiBold
	}
});
