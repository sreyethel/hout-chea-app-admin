import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { styles } from './StockStyle'
import _styles from '../../../_styles';
import modules from '../../../modules';
import { OutlinedTextField } from 'react-native-material-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import Header from '../../../components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

interface Props {
    unitMeasurement: any
    UMPrice: any
    navigation: any
    loading: boolean
    onSave: (um: any, qty: number, cost: number, price: number, color: any, size: any) => void
    onRemoveUMPrice: (item: any) => void

}
const selectedUM = async (setUm: any) => {
    setTimeout(async () => {
        const docs = await trending.selectedItem();
        await setUm(docs);
    }, 500);
};
const selectedColor = async (setUm: any) => {
    setTimeout(async () => {
        const docs = await Colors.selectedItem();
        await setUm(docs.text);
    }, 500);
};
const selectedSize = async (setUm: any) => {
    setTimeout(async () => {
        const docs = await Size.selectedItem();
        await setUm(docs.text);
    }, 500);
};

let trending: any
let Colors: any
let Size: any
let QTY: any;
let COST: any;
let PRICE: any;
const COLOR = [
    { key: 0, text: 'NONE' },
    { key: 1, text: 'RED' },
    { key: 2, text: 'YELLOW' },
    { key: 3, text: 'BLUE' }
]
const SIZE = [
    { key: 0, text: 'NONE' },
    { key: 1, text: 'XS' },
    { key: 2, text: 'S' },
    { key: 3, text: 'M' },
    { key: 4, text: 'L' },
    { key: 5, text: 'XL' },
    { key: 1, text: 'XS' },
    { key: 2, text: 'S' },
    { key: 3, text: 'M' },
    { key: 4, text: 'L' },
    { key: 5, text: 'XL' }
]
export default ({ UMPrice, unitMeasurement, loading, onSave, navigation, onRemoveUMPrice }: Props) => {
    const [um, setUm] = useState(null)
    const [qty, setQty] = useState(0)
    const [cost, setCost] = useState(0)
    const [price, setPrice] = useState(0)
    const [color, setColor] = useState('NONE')
    const [size, setSize] = useState('NONE')

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ backgroundColor: modules.PRIMARY }} />
            <Header
                title="Add Stock"
                loading={loading}
                onBack={() => navigation.goBack()}
                onEdit={true}
                isEdit={true}
                onSave={() => {
                    onSave(um, qty, cost, price, color, size),
                        QTY.clear(),
                        COST.clear(),
                        PRICE.clear()
                }}

            />
            <View style={styles.topContainer}>


                <View style={{ flex: 1 }} />
                <Dropdown
                    ref={(ref: any) => (trending = ref)}
                    valueExtractor={({ kh, multiply }: any) => kh + " ( " + multiply + "x ) "}
                    label="Base Unit Measurement"
                    data={unitMeasurement?.range}
                    onChangeText={async () => await selectedUM(setUm)}
                    containerStyle={{ width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL_24) }}
                />
                <OutlinedTextField
                    inputContainerStyle={styles.textfield}
                    label={"QTY"}
                    tintColor={modules.PRIMARY}
                    ref={(ref: any) => QTY = ref}
                    keyboardType="decimal-pad"
                    labelFontSize={10}

                    onChangeText={(val) => setQty(Number(val))}

                />
                <View style={_styles.rows}>
                    <View style={styles.leftBox}>
                        <OutlinedTextField
                            inputContainerStyle={styles.textfield}
                            label="Cost (USD)"
                            tintColor={modules.PRIMARY}
                            ref={(ref: any) => COST = ref}
                            keyboardType="decimal-pad"
                            onChangeText={(val) => setCost(Number(val))}
                        />
                    </View>
                    <View style={styles.rightBox}>
                        <OutlinedTextField
                            inputContainerStyle={styles.textfield}
                            label="Price (USD)"
                            tintColor={modules.PRIMARY}
                            ref={(ref: any) => PRICE = ref}
                            labelFontSize={10}
                            keyboardType="decimal-pad"
                            onChangeText={(val) => setPrice(Number(val))}
                        />
                    </View>
                </View>
                <Text style={styles.label}>( Optional )</Text>
                <View style={[_styles.rows, { justifyContent: 'space-between', marginHorizontal: 6 }]}>
                    <Dropdown
                        ref={(ref: any) => (Colors = ref)}
                        valueExtractor={({ text }: any) => text}
                        label="Color"
                        data={COLOR}
                        value={COLOR[0].text}
                        onChangeText={async () => await selectedColor(setColor)}
                        containerStyle={{ width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL_24) / 2.5 }}
                    />

                    <Dropdown
                        ref={(ref: any) => (Size = ref)}
                        valueExtractor={({ text }: any) => text}
                        label="Size"
                        data={SIZE}
                        value={SIZE[0].text}
                        onChangeText={async () => await selectedSize(setSize)}
                        containerStyle={{ width: (modules.VIEW_PORT_WIDTH - modules.BODY_HORIZONTAL_24) / 2.5 }}
                    />

                </View>
            </View>
            <View style={{ paddingVertical: 12, flex: 1 }}>
                <ScrollView >
                    {
                        UMPrice?.length > 0 ?
                            UMPrice.map((item: any, index: any) => {
                                return (

                                    <View style={styles.listContainer}>
                                        <Text>{index + 1}. </Text>
                                        <View style={{ flex: 1 }}>
                                            <Text> PRICE PER UNIT : ${item?.price}</Text>
                                            <Text> QTY : {item?.qty}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                {
                                                    item.color == "NONE" ? <Text style={styles.subText}></Text>
                                                        : <Text style={styles.subText}> COLOR : {item?.color}</Text>
                                                }
                                                {
                                                    item.size == "NONE" ? <Text style={styles.subText}></Text>
                                                        : <Text style={styles.subText}> SIZE : {item?.size}</Text>

                                                }


                                            </View>
                                            <Text style={styles.unitText}>( {item?.text} x{item?.multiply} )</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => { onRemoveUMPrice(item) }}>
                                            <Icon name="delete" style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>

                                )
                            })
                            : null
                    }
                </ScrollView>
            </View>
        </View>
    );
}

