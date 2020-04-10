import React from 'react';
import { useState } from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import modules from '../modules';

interface Props {
	onContinue: (code: string) => void;
}

export default ({ onContinue }: Props) => {
	const [ passCode, setPassCode ] = useState('');
	return (
		<View style={styles.codeWrapper}>
			<View style={styles.passCodeEnter}>
				<TextInput
					secureTextEntry={true}
					style={styles.textBox}
					keyboardType="numeric"
					autoFocus={true}
					maxLength={6}
					keyboardAppearance="dark"
					onChangeText={(passCode) => {
						setPassCode(passCode);
						if (passCode.length === 6) {
							onContinue(passCode);
						}
					}}
				/>
			</View>
			<View style={styles.circleBlock}>
				<View style={[ styles.circle, passCode.length >= 1 && styles.circleFill ]} />
				<View style={[ styles.circle, passCode.length >= 2 && styles.circleFill ]} />
				<View style={[ styles.circle, passCode.length >= 3 && styles.circleFill ]} />
				<View style={[ styles.circle, passCode.length >= 4 && styles.circleFill ]} />
				<View style={[ styles.circle, passCode.length >= 5 && styles.circleFill ]} />
				<View style={[ styles.circle, passCode.length >= 6 && styles.circleFill ]} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	textBox: {
		fontSize: 30,
		letterSpacing: 15,
		textAlign: 'center'
	},
	codeWrapper: {
		position: 'relative',
		marginTop: modules.BODY_HORIZONTAL
	},
	passCodeEnter: {
		height: '100%',
		opacity: 0,
		position: 'absolute',
		width: '100%',
		zIndex: 9
	},
	circleBlock: {
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: modules.BODY_HORIZONTAL,
		justifyContent: 'center'
	},
	circle: {
		borderRadius: modules.BODY_HORIZONTAL_24,
		borderWidth: 1,
		borderColor: modules.PRIMARY_TAB,
		height: 20,
		width: 20,
		marginHorizontal: modules.BIG_SPACE
	},
	circleFill: {
		backgroundColor: modules.PRIMARY_TAB,
		borderColor: modules.PRIMARY_TAB,
		padding: 2,
		borderRadius: 30,
		borderWidth: 1,
		height: 20,
		width: 20
	}
});
