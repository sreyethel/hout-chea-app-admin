import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import modules from '../../../modules';
import _styles from '../../../_styles';
import { SafeAreaView } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';

export interface AppProps {
	process: boolean;
	onSave: () => void;
	onChangeName: (val: any) => void;
	onChangEmail: (val: any) => void;
}

export default class RegisterUserScreen extends React.Component<AppProps, any> {
	constructor(props: AppProps) {
		super(props);
	}

	public render() {
		const { process } = this.props;
		return (
			<SafeAreaView style={[ _styles.flx1, { justifyContent: 'space-between' } ]}>
				<View>
					<View style={styles.header}>
						<Text style={styles.title}>Register</Text>
						<Text style={styles.subTitle}>Enter Your information to continue</Text>
					</View>
					<View style={styles.container}>
						<View style={styles.textBox}>
							<OutlinedTextField
								tintColor={modules.COLOR_MAIN}
								onChangeText={(val) => this.props.onChangeName(val)}
								label="Name"
							/>
						</View>
						<View style={styles.textBox}>
							<OutlinedTextField
								tintColor={modules.COLOR_MAIN}
								onChangeText={(val) => this.props.onChangEmail(val)}
								label="Email"
							/>
						</View>
					</View>
				</View>

				<View style={styles.continue}>
					<Text style={styles.agreement}>Please fill in your name and email before continue.</Text>
					<Ripple disabled={process} onPress={() => this.props.onSave()} style={styles.continueButton}>
						{process ? (
							<ActivityIndicator color={modules.WHITE} />
						) : (
							<Icon style={styles.continueButtonIcon} name="arrow-forward" />
						)}
					</Ripple>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	continueButtonIcon: {
		color: modules.WHITE,
		fontSize: modules.FONT_H2
	},
	subTitle: {
		color: modules.SUB_TEXT,
		marginTop: modules.BODY_HORIZONTAL / 2
	},
	header: {
		paddingHorizontal: modules.BODY_HORIZONTAL,
		paddingTop: modules.BODY_HORIZONTAL * 3
	},
	title: {
		fontSize: modules.FONT_H2
	},
	textBox: {
		marginBottom: modules.BODY_HORIZONTAL / 2
	},
	container: {
		padding: modules.BODY_HORIZONTAL,
		marginTop: modules.BODY_HORIZONTAL * 3
	},
	agreement: {
		color: modules.TEXT,
		fontSize: modules.FONT_P,
		flex: 1
	},
	continueButton: {
		overflow: 'hidden',
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.RADIUS_BUTTON,
		alignItems: 'center',
		justifyContent: 'center',
		padding: modules.BODY_HORIZONTAL,
		marginLeft: modules.BODY_HORIZONTAL
	},
	continue: {
		flexDirection: 'row',
		padding: modules.BODY_HORIZONTAL,
		alignItems: 'center'
	}
});
