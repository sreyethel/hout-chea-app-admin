import * as React from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, Image } from 'react-native';
import MODULE from '../modules';
import FastImage from 'react-native-fast-image';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
export interface Props {
    onClick?: any,
    data: any,
    index: any
}

export default ({ data, index }: Props) => {
    return (
        <View style={[styles.container, styles.SHADOW1]}>
            <Text style={styles.order}>{index + 1}.</Text>
            <View style={{ flex: 1 }}>
                <Text style={styles.txtItem}>{data?.item?.name}</Text>
                <Text style={styles.txtQty}>Qty: {data.totalQty} {data?.item?.unitMeasurement?.code}</Text>
                <Text style={styles.txtQty}>Price: ${data.totalPrice}</Text>
            </View>

            {
                data.stockAvaible == false ?
                    <View style={{ flex: 1 }}>
                        <Icon name="warning" style={[styles.txtQty,{fontSize:17}]} />
                        <Text style={styles.txtQty}>Out of Stock</Text>
                        <Text style={styles.txtQty}>Avaible: {data.stockCurrent} {data?.item?.unitMeasurement?.code}</Text>

                    </View>
                    : null
            }

            {
                !data.item.cover ? null
                    :
                    <FastImage style={styles.img} source={{ uri: data.item.cover }} />
            }

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        paddingVertical: 10
    },
    order: {
        paddingHorizontal: 20,
        fontSize: 14,
        color: '#2b2b2b'
    },
    txtItem: {
        fontSize: 16,
        color: '#2b2b2b',
        height:40

    },
    txtQty: {
        fontWeight: '500',
        fontSize: 12,
        color: '#000',
        marginVertical: 2
    },
    SHADOW1: {
        // backgroundColor: '#fff',
        shadowColor: "#efeeec",
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowRadius: 10,
        shadowOpacity: 0.5,
        elevation: 0,

    },
    img: {
        width: 50,
        height: 50,
        marginHorizontal: 12
    }

})