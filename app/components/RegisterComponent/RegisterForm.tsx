import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RegisterUserInput from './RegisterUserInput';
import DatePicker from 'react-native-datepicker';
import modules from '../../modules';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Entypo';
import { fontSemiBold } from '../../../functions/customFont';
import _styles from '../../_styles';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import { TitleObject } from '../../dummy/status';

export interface Props {
	continue?: () => void;
}

export default ({  }: Props) => {
	const [ date, setDate ] = React.useState('2016-05-15');
	return (
		<View style={styles.container}>
			<View style={styles.titleBox}>
				<Text style={styles.loginText}>Welcome</Text>
				<Text style={styles.connect}>Welcome to HoutChea please enter your phone number to continue.</Text>
			</View>
			<View style={styles.innerContainer}>
				<View style={styles.labelContainer}>
					<Text style={styles.label}>Title</Text>
				</View>
					<RNPickerSelect
						style={{ inputIOS: styles.selectContainer, inputAndroid: styles.selectContainer }}
						placeholder={{
							label: 'Title',
							value: null,
							color: '#9EA0A4'
						}}
						onValueChange={(value) => console.log(value)}
						items={TitleObject}
					/>
				<View style={_styles.rows}>
					<View style={styles.inputLeftBox}>
						<RegisterUserInput iconName="user" placeholder="First Name" label="First Name" />
					</View>
					<View style={styles.inputRightBox}>
						<RegisterUserInput iconName="user" placeholder="Last Name" label="Last Name" />
					</View>
				</View>
				<View style={_styles.rows}>
					<View style={styles.inputLeftBox}>
						<RegisterUserInput iconName="user" placeholder="Display Name" label="Display Name" />
					</View>
					<View style={styles.inputRightBox}>
						<View style={styles.labelContainer}>
							<Text style={styles.label}>Date Of Birth</Text>
						</View>
						<DatePicker
							date={date}
							mode="date"
							format="D MMM YYYY"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							showIcon={false}
							style={styles.dateStyle}
							customStyles={dateStyle}
							onDateChange={(date) => {
								setDate(date);
							}}
						/>
					</View>
				</View>
				<RegisterUserInput iconName="phone" placeholder="Phone Number" label="Phone Number" />
				<RegisterUserInput iconName="mail" placeholder="Email" label="Email" />
			</View>
			<Ripple style={{ overflow: 'hidden', borderRadius: modules.RADIUS }}>
				<LinearGradient
					start={{ x: 0, y: 1 }}
					end={{ x: 0.5, y: 0 }}
					colors={modules.FACEBOOK}
					style={styles.buttonNext}
				>
					<Text style={styles.buttonText}>Continue</Text>
				</LinearGradient>
			</Ripple>
		</View>
	);
};

const styles = StyleSheet.create({
	inputLeftBox: {
		flex: 1,
		marginRight: modules.BIG_SPACE
	},
	inputRightBox: {
		flex: 1,
		marginLeft: modules.BIG_SPACE
	},
	titleBox: {
		// paddingTop: modules.BODY_HORIZONTAL
	},
	loginText: {
		...fontSemiBold,
		fontSize: modules.FONT
	},
	connect: {
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_P
	},
	container: {
		padding: modules.BODY_HORIZONTAL
	},
	innerContainer: {
		paddingVertical: modules.BODY_HORIZONTAL_24,
		paddingHorizontal: modules.BODY_HORIZONTAL_24 - modules.BODY_HORIZONTAL
	},
	label: {
		fontSize: modules.FONT_P,
		color: modules.DEFAULT
	},
	selectContainer: {
		paddingVertical: modules.BODY_HORIZONTAL,
		borderBottomColor: modules.CARD_BORDER,
		borderBottomWidth: 0.5
	},
	icon: {
		color: modules.DEFAULT,
		fontSize: modules.FONT - 1,
		marginRight: modules.BODY_HORIZONTAL / 2
	},
	labelContainer: {
		flexDirection: 'row'
	},
	buttonNext: {
		padding: modules.BODY_HORIZONTAL,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: modules.RADIUS
	},
	buttonText: {
		color: modules.WHITE,
		fontSize: modules.FONT,
		...fontSemiBold
	},
	dateStyle: {
		borderWidth: 1,
		borderColor: modules.CARD_BORDER,
		borderRadius: modules.RADIUS,
		marginTop: modules.BIG_SPACE
	}
});

const dateStyle = {
	dateText: {
		fontSize: modules.FONT_P,
		color: modules.TEXT
	},
	dateInput: {
		borderWidth: 0
	},
	btnTextConfirm: {
		color: modules.DEFAULT
	}
};
