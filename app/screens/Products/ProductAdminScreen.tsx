import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import modules from '../../modules';
import { FontGSansBold, fontSemiBold, fontGSans } from '../../../functions/customFont';
import _styles from '../../_styles';
import CartCard from '../../components/CartCard';
import Modal from 'react-native-modal';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { styles } from './ProductStyle'
import Department from '../../components/Department';
import RnProductRecentPost from '../../components/RnProductRecentPost';
import InputHeader from '../../components/InputHeader';
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
    onProductByCategory: (item: any) => void;
    modal: boolean;
    item: any;
    dataCategory: any;
    search: any,
    onChangeText: any,
    onSearch: any,
}

let swipeRowRef: any;
let CATE:any
export default (props: Props) => {
    const [Item, setItem] = useState(null)
    const [selected, setSelected] = useState(props.dataCategory[0])
    const [category, setCategory] = useState([])
    const [Index, setIndex] = useState(0)
    return (
        <View style={_styles.containerPrimary}>
            <View style={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: modules.BORDER_COLOR }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingVertical: 12, flexWrap: 'wrap' }}
                >
                    {props.dataCategory ?
                        props.dataCategory.map((i: any, index: any) => {
                            return (
                                <RnProductRecentPost
                                    key={index}
                                    click={() => {_onSelected(
                                        i, setSelected,
                                        index, setIndex,
                                        category, setCategory, props.onProductByCategory),
                                        CATE.clear()
                                    }

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
                <InputHeader
                    CATE={(ref: any) => CATE = ref}
                    value={props.search}
                    onChangeText={props.onChangeText}
                    onSearch={props.onSearch}
                    searchPlaceHolder={"Search products"}
                />
            </View>

            <View style={_styles.flx1}>
                {props.dataProduct ? (
                    <FlatList
                        ListFooterComponent={() => {
                            return <View style={{ marginBottom: modules.VIEW_PORT_HEIGHT / 4 }}>
                                {
                                    props.dataProduct.length > 0 ? null
                                        : <Text style={_styles.noData}>No Data</Text>
                                }

                            </View>
                                ;
                        }}
                        ref={(ref) => (swipeRowRef = ref)}
                        data={props.dataProduct}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }: any) => (
                            <CartCard
                                clickMore={() => props.onShowModal(item)}
                                data={item}
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