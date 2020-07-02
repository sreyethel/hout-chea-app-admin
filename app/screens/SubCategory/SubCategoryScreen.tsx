import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Feather';
import modules from './../../modules';
import _styles from '../../_styles';
import CategoryCard from '../../components/CategoryCard';
import Modal from 'react-native-modal';
import { fontGSans } from '../../../functions/customFont';

interface Props {
	navigation: any;
	loading:boolean
	dataSubCategory: any;
	onDelete: (item: any) => void;
	onEdit: (item: any) => void;
}


const _onShowModal = (item: string, modal: boolean, setmodal: any, setItem: any) => {
	setItem(item)
	setmodal(!modal)
};
export default ({
	navigation,
	onDelete,
	onEdit,
	dataSubCategory,
	loading
}: Props) => {
	const [modal, setmodal] = useState(false)
	const [Item, setItem] = useState(null)
	return (
		<View style={[_styles.flx1, _styles.background]}>
			{
				loading?<ActivityIndicator/>
				:
				<FlatList
				ListFooterComponent={() => {
					return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }}>
						{
							dataSubCategory.length > 0 ? null
								: <Text style={styles.noData}>No Data</Text>
						}
					</View>;
				}}
				data={dataSubCategory.slice()}
				renderItem={({ item }: any) => {
					return (
						<CategoryCard
							click={() => navigation.navigate('SubCategory', { item: item })}
							clickMore={() => _onShowModal(item, modal, setmodal, setItem)}
							data={item}
						/>
					);
				}}
			/>
			}
			
			<Modal
				backdropTransitionOutTiming={0}
				onBackdropPress={() => setmodal(!modal)}
				useNativeDriver={true}
				style={styles.modal}
				isVisible={modal}
			>
				<View style={styles.modalBox}>
					<View style={_styles.row}>
						<TouchableOpacity
							onPress={() => {
								setmodal(!modal);
								setTimeout(() => {
									onEdit(Item);
								}, 500);
							}}
							style={styles.buttonEdit}
						>
							<Icon style={styles.icon} color={modules.SECONDARY} name="edit" />
							<Text style={styles.label}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setmodal(!modal);
								setTimeout(() => {
									onDelete(Item);
								}, 500);
							}}
							style={styles.buttonEdit}
						>
							<Icon style={styles.icon} color={modules.COLOR_MAIN} name="trash" />
							<Text style={styles.label}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	noData: {
		textAlign: 'center',
		margin: 12,
		color: modules.SUB_TEXT
	},
	icon: {
		fontSize: modules.FONT_H1
	},
	buttonEdit: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: modules.BODY_HORIZONTAL * 2
	},
	label: {
		fontSize: modules.FONT_P,
		...fontGSans,
		marginTop: modules.BODY_HORIZONTAL / 4
	},
	modalBox: {
		height: modules.VIEW_PORT_HEIGHT / 6,
		width: modules.VIEW_PORT_WIDTH,
		backgroundColor: modules.WHITE,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modal: {
		flex: 1,
		margin: 0,
		justifyContent: 'flex-end'
	},
	chip: {
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.BODY_HORIZONTAL * 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 12,
		zIndex: 2,
		..._styles.rows,
		borderWidth: 1,
		borderColor: modules.COLOR_MAIN,
		width: modules.BODY_HORIZONTAL * 5,
		height: modules.BODY_HORIZONTAL * 5,
		position: 'absolute',
		right: modules.BODY_HORIZONTAL * 2,
		bottom: modules.BODY_HORIZONTAL * 2,
		shadowColor: modules.COLOR_MAIN,
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6
	}
});