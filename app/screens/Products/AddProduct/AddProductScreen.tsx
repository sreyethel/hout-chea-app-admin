import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import _styles from '../../../_styles';
import modules from '../../../modules';
import Header from '../../../components/Header';
import ListAddProduct from '../../../components/ListAddProduct';
import { styles } from './AddProductStyle'
interface Props {
	navigation: any
	onSave: any,
	dataSelectedItem: any
	selectedunitMeasurement: any,
	totalQty: any,
	process: boolean
	onSelectProduct: () => void
}

export default ({ onSelectProduct, process, navigation, onSave, dataSelectedItem, selectedunitMeasurement, totalQty }: Props) => {


	return (
		<View style={_styles.containerPrimary}>
			<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
			<Header
				title="Add Product"
				loading={process}
				onBack={() => navigation.goBack()}
				onEdit={true}
				isEdit={true}
				onSave={onSave}
			/>
			<View style={styles.listView}>
				<ListAddProduct title="Product" onPress={onSelectProduct} icon={`inbox`} img={dataSelectedItem?.cover}>
					{dataSelectedItem ? <Text>{dataSelectedItem.name}</Text> : null}
				</ListAddProduct>
				<ListAddProduct title="Stock" onPress={() => dataSelectedItem ? navigation.navigate('Stock') : Alert.alert("Please select product")} icon={`dns`}>
					{totalQty ? <Text>Qty: {totalQty} | {selectedunitMeasurement ? selectedunitMeasurement?.code : ''}</Text> : null}
				</ListAddProduct>
			</View>
		</View>
	);
}

