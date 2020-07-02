import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import _styles from '../../../_styles';
import modules from '../../../modules';
import Header from '../../../components/Header';
import ListAddProduct from '../../../components/ListAddProduct';
import { styles } from './EditProductStyle'
import FastImage from 'react-native-fast-image';
interface Props {
	navigation: any
	onSave: any,
	dataSelectedItem: any
	selectedunitMeasurement: any,
	totalQty: any,
	onSaveStock: any,
	process: boolean
	UMPrice: any
}

export default ({ UMPrice, process, navigation, onSave, dataSelectedItem, selectedunitMeasurement, totalQty, onSaveStock }: Props) => {


	return (
		<View style={_styles.containerPrimary}>
			<SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
			<Header
				title="Edit Product"
				loading={process}
				onBack={() => navigation.goBack()}
				onEdit={true}
				isEdit={true}
				onSave={onSave}
			/>
			<View style={styles.containDetail}>
				<FastImage
					source={{ uri: dataSelectedItem.cover }}
					style={styles.imgProduct} />
				<View style={styles.containText}>
					<Text style={styles.name}>{dataSelectedItem.name}</Text>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.oldqty}>Old Stock: {dataSelectedItem.totalQty} {selectedunitMeasurement ? selectedunitMeasurement?.code : ''}</Text>
						<Text style={{ color: modules.BLUE }}> | </Text>
						<Text style={styles.textqty}>
							{totalQty ? totalQty - dataSelectedItem.totalQty >= 0 ? "Add more : " : "Drop : " : "Invalid qty"}
							{totalQty ? totalQty - dataSelectedItem.totalQty : ""} {totalQty ? selectedunitMeasurement ? selectedunitMeasurement?.code : '' : ""}</Text>
					</View>




				</View>
			</View>

			<View style={styles.listView}>
				<ListAddProduct title="Stock" onPress={onSaveStock} icon={`dns`}>
					{totalQty ? <Text>Qty: {totalQty} | {selectedunitMeasurement ? selectedunitMeasurement?.code : ''}</Text> : null}
				</ListAddProduct>
			</View>
			<Text style={{ color: modules.RED, margin:6, fontWeight:'600' }}> Price range</Text>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
				{
					UMPrice.map((item: any) => {
						return (
							<Text style={styles.price}>{item.code}: ${item.price}</Text>
						)
					})
				}
			</View>
		</View>

	);
}

