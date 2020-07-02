import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import modules from '../../modules';
import CategoryCard from '../../components/CategoryCard';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-navigation';
import { fontGSans, fontSemiBold } from '../../../functions/customFont';
import { ScrollView } from 'react-native-gesture-handler';
import RnProductRecentPost from '../../components/RnProductRecentPost';

interface Props {
	navigation: any;
	dataCategory: any;
	dataMarket: any;

	onSubCategory: (item: any) => void;
	onDelete: (item: any) => void;
	onEdit: (item: any) => void;
	onCategoryByMarket: (item: any) => void;
	loading: boolean;
	loadingMarket: boolean;
}

export interface AppState {
	modal: boolean;
	item: any;
}
const _onShowModal = (item: string, modal: boolean, setmodal: any, setItem: any) => {
	setItem(item)
	setmodal(!modal)
};
export default ({ onSubCategory, navigation, dataCategory, dataMarket, onDelete, onEdit, loading, onCategoryByMarket, loadingMarket, }: Props) => {
	const [modal, setmodal] = useState(false)
	const [Item, setItem] = useState(null)
	const [selected, setSelected] = useState(dataMarket[0])
	const [category, setCategory] = useState([])
	const [Index, setIndex] = useState(0)
	return (
		<View style={[_styles.flx1, _styles.background]}>
			{/* <View style={{ backgroundColor: '#fff', }}>
				<View style={styles.product}>
					<Text style={styles.txtProfile}>Your Market</Text>
				</View>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={{ paddingVertical: 12, }}
				>
					{dataMarket ?
						dataMarket.map((i: any, index: any) => {
							return (
								<RnProductRecentPost
									key={index}
									click={() =>
										_onSelected(
											i, setSelected,
											index, setIndex,
											category, setCategory, onCategoryByMarket
										)
									}
									path={i.fileUrl}
									iconName="car"
									name={i.name}
									style={Index == index ? styles.btnSelected : styles.notSelected}

								/>
							)
						})
						: <View style={{ width: modules.VIEW_PORT_WIDTH, height: modules.VIEW_PORT_WIDTH }} />}
				</ScrollView>
				<View style={styles.product}>
					<Text style={styles.txtProfile}>List Categories</Text>
					<Icon name="list" style={styles.icon} color={modules.RED} />
				</View>
			</View> */}
			<View style={styles.productContainer}>
				{
					loading ? <ActivityIndicator />
						:
						<FlatList
							ListFooterComponent={() => {
								return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }} >
									{
										dataCategory.length > 0 ? null
											: <Text style={styles.noData}>No Data</Text>
									}

								</View>;
							}}
							data={dataCategory.slice()}
							renderItem={({ item }: any) => {
								return (
									<CategoryCard
										click={() => onSubCategory(item)}
										clickMore={() => _onShowModal(item, modal, setmodal, setItem)}
										data={item}
									/>
								);
							}}
						/>
				}

			</View>

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
							onPress={async () => {
								await setmodal(!modal);
								onEdit(Item);
							}}
							style={styles.buttonEdit}
						>
							<Icon style={styles.icon} color={modules.SECONDARY} name="edit" />
							<Text style={styles.label}>Edit</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={async () => {
								await setmodal(!modal);
								setTimeout(() => {
									onDelete(Item);
								}, 500);
							}}
							style={styles.buttonEdit}
						>
							<Icon style={styles.icon} color={modules.COLOR_MAIN} name="delete-forever" />
							<Text style={styles.label}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
			<SafeAreaView />
		</View>
	);
}
const _onSelected = (
	selected: any,
	setSelected: any,
	index: any,
	setIndex: any,
	category: any,
	setCategory: any,
	onProbyCate: any
) => {
	setSelected(selected);
	setIndex(index);
	setCategory(category);
	onProbyCate(selected.key)
};

const styles = StyleSheet.create({
	noData: {
		textAlign: 'center',
		margin: 12,
		color: modules.SUB_TEXT
	},
	btnSelected: {
		backgroundColor: modules.PRIMARY,
		color: modules.WHITE
	},
	notSelected: {
		backgroundColor: modules.WHITE,

	},
	product: {
		justifyContent: 'space-between',
		padding: 12,
		backgroundColor: '#fff',
		..._styles.rows
	},
	txtProfile: {
		fontSize: 16,
		...fontSemiBold,
		color: '#2b2b2b'
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
	productContainer: {
		flex: 1
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