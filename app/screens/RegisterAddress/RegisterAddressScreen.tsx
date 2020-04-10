import React, { Component, useState } from 'react';
import {
	Text,
	StyleSheet,
	View,
	SafeAreaView,
	TouchableOpacity,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform
} from 'react-native';

import RegistrationItem from './RegistrationItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

import _styles from '../../_styles';
import modules from '../../modules';
import ArrowBackHeader from '../../components/ArrowBackHeader';
import EntryItem from '../EntryItem';
import { Alert } from 'react-native';
import { FontGSansBold } from '../../../functions/customFont';

interface Props {
	onContinue: () => void;
	onEmail: (text: any) => void;
	onWebsite: (text: any) => void;
	onContactNumberChange: (text: any) => void;
	onStreetChange: (text: any) => void;
	onHomeNoChange: (text: any) => void;
	onProvince: () => void;
	onDistrict: () => void;
	onCommune: () => void;
	onVillage: () => void;
	name: any;
	last_name: any;
	contact_number: any;
	province: any;
	district: any;
	commune: any;
	village: any;
	street: any;
	homeNo: any;
	process: boolean;
	language: any;
	loading: boolean;
	email: string;
	website: string;
	goBack: () => void;
}

export default ({
	language,
	onCommune,
	onDistrict,
	onProvince,
	onVillage,
	onHomeNoChange,
	onEmail,
	onWebsite,
	onStreetChange,
	onContactNumberChange,
	onContinue,
	goBack,
	process,
	contact_number,
	province,
	commune,
	district,
	village,
	street,
	homeNo,
	email,
	website
}: Props) => {
	const [ showWebsite, setShowWebsite ] = useState(false);
	const [ showEmail, setShowEmail ] = useState(false);
	const [ showContactNumber, setShowContactNumber ] = useState(false);
	const [ showStreet, setStreet ] = useState(false);
	const [ showHomeNo, setHomeNo ] = useState(false);
	return (
		<View style={_styles.containerColorPrimary}>
			<ArrowBackHeader
				onRight={onContinue}
				process={process}
				arrowIcon="x-circle"
				onGoBack={goBack}
				rightText={'continue'}
				title={'New Store'}
				color={modules.WHITE}
			/>
			<View style={_styles.containerPrimary}>
				<View style={styles.title}>
					<Text style={styles.residentialAddress}>Store Contact</Text>
				</View>

				<RegistrationItem
					icon="phone"
					onValueChange={() => setShowContactNumber(true)}
					text={'Contact numbers'}
					value={contact_number}
					required={true}
				/>
				<RegistrationItem
					icon="user"
					onValueChange={() => setShowEmail(true)}
					text={'Email'}
					value={email}
					required={true}
				/>
				<RegistrationItem
					icon="user"
					onValueChange={() => setShowWebsite(true)}
					text={'Website'}
					value={website}
					required={true}
				/>
				<View style={styles.title}>
					<Text style={styles.residentialAddress}>{'Location'}</Text>
				</View>
				<RegistrationItem
					icon="map-pin"
					onValueChange={onProvince}
					text={'province'}
					value={province ? language === 'kh' ? province.name : province.en_name : null}
					required={true}
				/>
				<RegistrationItem
					icon="map-pin"
					onValueChange={onDistrict}
					text={'district'}
					value={district ? language === 'kh' ? district.name : district.en_name : null}
					required={true}
					disable={province ? false : true}
				/>
				<RegistrationItem
					icon="map-pin"
					onValueChange={onCommune}
					text={'commune'}
					value={commune ? language === 'kh' ? commune.name : commune.en_name : null}
					required={true}
					disable={district ? false : true}
				/>
				<RegistrationItem
					icon="map-pin"
					onValueChange={onVillage}
					text={'village'}
					value={village ? language === 'kh' ? village.name : village.en_name : null}
					required={true}
					disable={commune ? false : true}
				/>
				<RegistrationItem icon="map" onValueChange={() => setStreet(true)} text={'street'} value={street} />
				<RegistrationItem icon="hexagon" onValueChange={() => setHomeNo(true)} text={'homeNo'} value={homeNo} />
				{/* <View style={styles.continue}>
						<View style={_styles.flx1}/>
						<TouchableOpacity
							disabled={true}
							onPress={onContinue}
							style={[styles.continueButton, process ? styles.active : null]}
						>
							{process ? (
								<ActivityIndicator color={modules.WHITE} />
							) : (
									<Icon style={styles.continueButtonIcon} name="arrow-forward" />
								)}
						</TouchableOpacity>
					</View> */}
			</View>
			<EntryItem setIsVisible={setShowEmail} title={'Email'} onText={onEmail} value={email} visible={showEmail} />
			<EntryItem
				setIsVisible={setShowWebsite}
				title={'Website'}
				onText={onWebsite}
				value={website}
				visible={showWebsite}
			/>
			<EntryItem
				setIsVisible={setShowContactNumber}
				title={'Contact Numbers'}
				onText={onContactNumberChange}
				value={contact_number}
				visible={showContactNumber}
			/>
			<EntryItem
				setIsVisible={setStreet}
				title={'street'}
				onText={onStreetChange}
				value={street}
				visible={showStreet}
			/>
			<EntryItem
				setIsVisible={setHomeNo}
				title={'homeNo'}
				onText={onHomeNoChange}
				value={homeNo}
				visible={showHomeNo}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		paddingVertical: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL,
		paddingHorizontal: modules.BODY_HORIZONTAL
	},
	residentialAddress: {
		color: modules.TEXT,
		fontSize: modules.FONT + 2,
		...FontGSansBold
	},
	sendCode: {
		justifyContent: 'center',
		flexDirection: 'column',
		flex: 1
	},
	continueButtonIcon: {
		color: modules.WHITE,
		fontSize: modules.FONT_H2 - 8
	},
	agreement: {
		color: modules.LINK,
		fontSize: modules.FONT
	},
	continueButton: {
		backgroundColor: modules.SUB_TITLE,
		borderRadius: modules.RADIUS_BUTTON,
		alignItems: 'center',
		justifyContent: 'center',
		padding: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL,
		width: 58,
		height: 58
	},
	active: {
		backgroundColor: modules.ACTIVE
	},
	continue: {
		flexDirection: 'row',
		paddingVertical: modules.BODY_HORIZONTAL_24,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		alignItems: 'center'
	}
});
