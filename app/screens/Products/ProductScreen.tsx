import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import modules from '../../modules';
import { FontGSansBold, fontSemiBold, fontGSans } from '../../../functions/customFont';
import _styles from '../../_styles';
import Header from '../../components/Header';
import CartCard from '../../components/CartCard';
import Modal from 'react-native-modal';
import { FlatList } from 'react-native-gesture-handler';

export interface Props {
	onAddProduct: () => void;
	goBack: () => void;
	title: string;
	dataProduct: any;
	dataStore: any;
	onDeleteProduct: (key: any) => void;
	onEdit: (item: any) => void;
	onGallery: (item: any) => void;
	onShowModal: (item: any) => void;
	modal: boolean;
	item: any;
}

let swipeRowRef: any;

export default (props: Props) => {
	return (
		<View style={_styles.containerPrimary}>
			<Header goBack={props.goBack} title={props.title} />

			<View style={_styles.flx1}>
				{props.dataProduct ? (
					<FlatList
						ListFooterComponent={() => {
							return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }} />;
						}}
						ref={(ref) => (swipeRowRef = ref)}
						data={props.dataProduct}
						showsVerticalScrollIndicator={false}
						keyExtractor={(item, index) => index.toString()}
						renderItem={({ item }: any) => (
							<CartCard
								clickMore={() => props.onShowModal(item)}
								desc={item.description}
								bgColor={item.color}
								shipping={item.code}
								fileUrl={item.cover}
								title={item.name}
								price={item.price}
							/>
						)}
					/>
				) : null}
			</View>

			<TouchableOpacity onPress={props.onAddProduct} style={styles.chip}>
				<Icon name="add" size={modules.FONT_H3} color="#fff" />
			</TouchableOpacity>
			<Modal
				backdropTransitionOutTiming={0}
				onBackdropPress={() => props.onShowModal(props.dataProduct)}
				useNativeDriver={true}
				style={styles.modal}
				isVisible={props.modal}
			>
				<View style={styles.modalBox}>
					<View style={_styles.row}>
						<TouchableOpacity onPress={() => props.onGallery(props.item)} style={styles.buttonEdit}>
							<Icon style={styles.icon} color={modules.SUB_TEXT} name="image" />
							<Text style={styles.labelText}>Gallery</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => props.onEdit(props.item)} style={styles.buttonEdit}>
							<Icon style={styles.icon} color={modules.SECONDARY} name="edit" />
							<Text style={styles.labelText}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => props.onDeleteProduct(props.item)} style={styles.buttonEdit}>
							<Icon style={styles.icon} color={modules.COLOR_MAIN} name="delete-forever" />
							<Text style={styles.labelText}>Delete</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	icon: {
		fontSize: modules.FONT_H1
	},
	buttonEdit: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: modules.BODY_HORIZONTAL * 2
	},
	labelText: {
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
	container: {
		flex: 1
	},
	chip: {
		backgroundColor: modules.COLOR_MAIN,
		borderRadius: modules.BODY_HORIZONTAL * 2.5,
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 12,
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
	},
	header: {
		justifyContent: 'space-between',
		backgroundColor: modules.WHITE,
		paddingBottom: 8
	},
	search: {
		flex: 1,
		padding: 8,
		backgroundColor: '#f7f9fa',
		borderRadius: 10
	},
	txtSearch: {
		fontSize: 14,
		...fontSemiBold,
		color: modules.SUB_TITLE
	},

	txtProfile: {
		fontSize: 16,
		...fontSemiBold,
		color: '#2b2b2b'
	},
	logo: {
		width: 40,
		height: 40,
		borderRadius: 20
	},
	product: {
		justifyContent: 'space-between',
		padding: 12,
		backgroundColor: '#fff',
		..._styles.rows
	},
	border: {
		flex: 1,
		marginRight: 12,
		borderBottomWidth: 1,
		borderColor: modules.BORDER_COLOR
	},
	borderLine: {
		borderBottomWidth: 1,
		borderTopWidth: 1,
		borderColor: modules.BORDER_COLOR,
		paddingVertical: 12
	},
	borderLine1: {
		// borderBottomWidth: 5,
		// borderTopWidth: 2,
		borderColor: '#fafafa',
		paddingVertical: 5
	},
	txtName: {
		fontSize: 15,
		color: '#2b2b2b',
		...FontGSansBold,
		marginBottom: 5,
		marginTop: 12
	},
	txtSimi: {
		fontSize: 12,
		color: modules.SUB_TEXT,
		marginBottom: 12,
		...fontSemiBold
	},
	CIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#fafafa',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 12
	},
	txtSlide: {
		fontSize: 12,
		...fontSemiBold,
		color: '#2b2b2b',
		paddingHorizontal: 8
	},
	buttonDelete: {
		flex: 1,
		marginTop: modules.BODY_HORIZONTAL,
		justifyContent: 'flex-end',
		flexDirection: 'row'
	},
	Delete: {
		width: 75,
		height: '100%',
		backgroundColor: 'red',
		justifyContent: 'center',
		alignItems: 'center'
	},
	Edit: {
		width: 75,
		height: '100%',
		backgroundColor: modules.COLOR_MAIN,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gallery: {
		width: 75,
		height: '100%',
		backgroundColor: modules.PROGRESS_COLOR_2[2],
		justifyContent: 'center',
		alignItems: 'center'
	},
	label: {
		color: modules.WHITE,
		fontWeight: '700',
		marginTop: modules.BODY_HORIZONTAL / 2
	},
	iconHidden: {
		fontSize: modules.FONT,
		color: modules.WHITE
	}
});
