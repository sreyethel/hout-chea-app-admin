import React from 'react'
import { Component, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, } from 'react-native'
import Modal from 'react-native-modal';
import modules from '../../modules';
import { FontGSansSemiBold, fontSemiBold } from '../../../functions/customFont';
import _styles from '../../_styles';

interface Props {
	title: string;
	onText: (text: string) => void;
	setIsVisible: (show: boolean) => void;
	value: string;
	visible: boolean;
}

export default ({ title, onText, value, visible, setIsVisible }: Props) => {
	return (
		<Modal isVisible={visible} onBackdropPress={() => setIsVisible(false)}>
			<KeyboardAvoidingView behavior="padding">
				<View style={styles.content}>
					<Text style={styles.contentTitle}>{title}</Text>
					<View style={styles.priceBox}>
						<TextInput autoFocus={true} placeholder={title} style={styles.input} onChangeText={(value: any) => onText(value)} value={value} />
					</View>
					<TouchableOpacity style={styles.btn} onPress={() => setIsVisible(false)}>
						<Text style={styles.cartStyle}>OK</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	)
}

const styles = StyleSheet.create({
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: modules.BORDER_COLOR,
		paddingVertical: modules.BODY_HORIZONTAL_24,
		paddingHorizontal: modules.BODY_HORIZONTAL,
		margin: 0,
		padding: 0,
		fontSize: modules.FONT_H5,
		borderRadius: modules.RADIUS,
	},
	content: {
		backgroundColor: modules.WHITE,
		..._styles.centerMode,
		borderRadius: modules.RADIUS,
		marginBottom:55,
	},
	contentTitle: {
		padding: modules.BODY_HORIZONTAL,
		color: modules.TEXT,
		...FontGSansSemiBold,
		textAlign: 'center',
		width: '100%'
	},
	priceBox: {
		..._styles.rows,
		paddingVertical: modules.BODY_HORIZONTAL_24,
		paddingHorizontal: modules.BODY_HORIZONTAL,
	},
	price: {
		fontSize: modules.FONT_H5,
		...fontSemiBold
	},
	btn: {
		paddingBottom: modules.BODY_HORIZONTAL,
		width: '100%',
		..._styles.centerMode
	},
	cartStyle: {
		...fontSemiBold,
		color: modules.PRIMARY
	}
})