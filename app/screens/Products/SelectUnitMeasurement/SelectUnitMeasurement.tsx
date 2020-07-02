import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, FlatList } from 'react-native';
import _styles from '../../../_styles';
import ArrowBackHeader from '../../../components/ArrowBackHeader';
import modules from '../../../modules';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import PlaceholderSpinner from '../../../components/PlaceholderSpinner';
import InputHeader from '../../../components/InputHeader';

interface Props {
	goBack: () => void;
	data: any;
	onPress: (item: any) => void;
	loading: boolean;
	search: string;
	onChangeText: (text: string) => void;
	onSearch: () => void;
	searchPlaceHolder: string;
}

export default ({ goBack, data, onPress, loading, search, onChangeText, onSearch, searchPlaceHolder }: Props) => {
	return (
		<View style={_styles.flx1}>
			{loading ? (
				<PlaceholderSpinner />
			) : (
				<FlatList
					keyExtractor={(i, index) => index.toString()}
					showsVerticalScrollIndicator={false}
					data={data}
					renderItem={({ item, index }) => renderItem(item, () => onPress(item))}
				/>
			)}
		</View>
	);
};

const renderItem = (item: any, onPress: any) => {
	const { name, fileUrl, department,name_kh } = item;
	return (
		<TouchableOpacity activeOpacity={0.65} style={styles.listItem} onPress={onPress}>
			<View style={styles.leftContent}>
				{fileUrl ? (
					<FastImage source={{ uri: `${fileUrl}` }} style={styles.image} />
				) : (
					<FastImage source={modules.PRODUCT_NO_IMAGE} style={styles.image} />
				)}
				<View style={_styles.flx1}>
					<Text numberOfLines={1} style={styles.itemText}>
						{name_kh}
					</Text>
					<Text style={styles.saleBox}>{department ? department.name : ''}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 40,
		height: 40,
		marginRight: modules.BODY_HORIZONTAL
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderColor: modules.BORDER,
		backgroundColor: modules.WHITE
	},
	leftContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
		marginRight: 10
	},
	rightContent: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemText: {
		fontSize: 16,
		fontWeight: '500',
		color: modules.TEXT
	},

	pinIcon: {
		fontSize: 16,
		marginRight: 10,
		color: modules.BLUE
	},
	saleBox: {
		..._styles.rows,
		justifyContent: 'space-between',
		color: modules.SUB_TEXT,
		fontSize: modules.FONT_S
	}
});
