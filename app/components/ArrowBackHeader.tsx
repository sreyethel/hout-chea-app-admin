import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import modules from '../modules';
import { fontSemiBold } from '../../functions/customFont';

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
	return (
		<SafeAreaView style={{ backgroundColor: modules.COLOR_MAIN }}>
			<View style={[ styles.container, borderBottomWidth ? { borderBottomWidth: borderBottomWidth } : null ]}>
				{onGoBack ? (
					<TouchableOpacity disabled={process} onPress={onGoBack} style={styles.buttonBox}>
						<Icon
							name={arrowIcon ? arrowIcon : 'chevron-left'}
							style={[
								styles.arrow,
								color ? { color: color } : null,
								isWhite ? { color: modules.WHITE } : null
							]}
						/>
					</TouchableOpacity>
				) : (
					<View style={styles.rightButton} />
				)}

				<Text style={[ styles.title, isWhite ? { color: modules.WHITE } : null ]}>{title}</Text>
				{onRight ? (
					<TouchableOpacity
						activeOpacity={0.85}
						style={[ styles.rightButton ]}
						onPress={onRight}
						disabled={disabled || process}
					>
						{process ? (
							<ActivityIndicator />
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
};

const styles = StyleSheet.create({
	title: {
		...fontSemiBold,
		color: modules.WHITE,
		fontSize: modules.FONT_P,
		flex: 1,
		textAlign: 'center'
	},
	container: {
		paddingHorizontal: modules.BODY_HORIZONTAL,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: modules.BORDER_COLOR,
		paddingVertical: modules.BODY_HORIZONTAL / 3,
		backgroundColor: modules.COLOR_MAIN
	},
	buttonBox: {
		width: 80,
		height: 38,
		alignItems: 'flex-start'
	},
	arrow: {
		color: modules.PRIMARY,
		fontSize: modules.FONT_H3
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
