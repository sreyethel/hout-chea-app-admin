import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StatusBar, SafeAreaView, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import modules from '../modules';
import { fontSemiBold, fontExtraBold } from '../../functions/customFont';

interface Props {
	onGoBack?: any;
	title?: string;
	color?: string;
	isWhite?: boolean;
	borderBottomWidth?: number;
	rightText?: any;
	onRight?: any;
	activeSave?: boolean;
	arrowIcon?: any;
	process?: boolean;
	disabled?: boolean;
}

export default ({
	disabled,
	process,
	onGoBack,
	arrowIcon,
	title,
	color,
	isWhite,
	borderBottomWidth,
	rightText,
	onRight,
	activeSave
}: Props) => {
	if (Platform.OS == "android") {
		return (
			<SafeAreaView style={{ backgroundColor: modules.COLOR_MAIN }}>
				<View style={[styles.container, borderBottomWidth ? { borderBottomWidth: borderBottomWidth } : null]}>
					{onGoBack ? (
						<TouchableOpacity onPress={onGoBack} style={styles.buttonBox}>

							<Icon
								name={arrowIcon ? arrowIcon : 'md-arrow-back'}
								style={[
									styles.arrow,
									color ? { color: modules.WHITE } : null,
									isWhite ? { color: modules.WHITE } : null
								]}
							/>
						</TouchableOpacity>
					) : (
							<View style={styles.rightButton} />
						)}

					<Text style={[styles.title, isWhite ? { color: modules.WHITE,...fontExtraBold } : null]}>{title}</Text>
					{onRight ? (
						<TouchableOpacity
							activeOpacity={0.85}
							style={[styles.rightButton]}
							onPress={onRight}
							disabled={disabled || process}
						>
							{process ? (
								<ActivityIndicator color={"#fff"} />
							) : (
									<Text
										style={[
											styles.save,
											disabled ? { color: modules.DISABLED_TEXT } : null,
											color ? { color: color } : null
										]}
									>
										{rightText}
									</Text>
								)}
						</TouchableOpacity>
					) : (
							<View style={styles.rightButton} />
						)}
				</View>
			</SafeAreaView>
		);

	} else {
		return (
			<SafeAreaView style={{ backgroundColor: modules.COLOR_MAIN }}>
				<View style={[styles.container, borderBottomWidth ? { borderBottomWidth: borderBottomWidth } : null]}>
					{onGoBack ? (
						<TouchableOpacity onPress={onGoBack} style={styles.buttonBox}>

							<Icon
								name={arrowIcon ? arrowIcon : 'ios-arrow-back'}
								style={[
									styles.arrow,
									color ? { color: modules.WHITE } : null,
									isWhite ? { color: modules.WHITE } : null
								]}
							/>
							<Text style={{ color: '#fff', marginHorizontal: 8, fontSize: 17 }}>Back</Text>
						</TouchableOpacity>
					) : (
							<View style={styles.rightButton} />
						)}

					<Text style={[styles.title, isWhite ? { color: modules.WHITE, } : null,{textAlign: 'center'}]}>{title}</Text>
					{onRight ? (
						<TouchableOpacity
							activeOpacity={0.85}
							style={[styles.rightButton]}
							onPress={onRight}
							disabled={disabled || process}
						>
							{process ? (
								<ActivityIndicator color={"#fff"} />
							) : (
									<Text
										style={[
											styles.save,
											disabled ? { color: modules.DISABLED_TEXT } : null,
											color ? { color: color } : null
										]}
									>
										{rightText}
									</Text>
								)}
						</TouchableOpacity>
					) : (
							<View style={styles.rightButton} />
						)}
				</View>
			</SafeAreaView>
		);
	}

};

const styles = StyleSheet.create({
	title: {
		...fontSemiBold,
		color: modules.WHITE,
		fontSize: modules.FONT_P + 2,
		flex: 1,
		// textAlign: 'center'
	},
	container: {
		paddingHorizontal: modules.BODY_HORIZONTAL / 1.5,
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: modules.BODY_HORIZONTAL / 3,
		backgroundColor: modules.COLOR_MAIN
	},
	buttonBox: {
		width: 80,
		height: 38,
		alignItems: 'center',
		flexDirection: 'row',
	},
	arrow: {
		color: modules.WHITE,
		fontSize: modules.FONT_H3 + 2
	},
	save: {
		color: modules.PRIMARY,
		...fontSemiBold,
		fontSize: modules.FONT_P
	},
	rightButton: {
		width: 80,
		alignItems: 'flex-end',
		justifyContent: 'flex-end'
	}
});
