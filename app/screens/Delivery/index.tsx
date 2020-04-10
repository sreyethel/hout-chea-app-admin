import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import ArrowBackHeader from '../../components/ArrowBackHeader';
import _styles from '../../_styles';
import Icon from 'react-native-vector-icons/Feather'
import modules from '../../modules';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fontSemiBold, fontLight, FontGSansBold } from '../../../functions/customFont';
export interface Props {
}

export interface State {
}

export default class DeliveryScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }

    public render() {
        return (
            <View style={[_styles.flx1, { backgroundColor: '#fff' }]}>
                <SafeAreaView />
                <ArrowBackHeader
                    onGoBack
                    title="Delivery"
                    color="#2b2b2b"
                    borderBottomWidth={1} />
                <View style={{ backgroundColor: '#fafafa' }}>

                    <View>
                        <ScrollView
                            showsHorizontalScrollIndicator={false}

                            horizontal={true} style={[styles.borderLine,]}>
                            <View style={[styles.row, styles.chip]}>
                                <Icon name="plus" size={14} color='#2b2b2b' />
                                <Text style={styles.txtSlide}>Create</Text>
                            </View>
                            <View style={[styles.row, styles.chip]}>
                                <Icon name="box" size={14} color='#2b2b2b' />
                                <Text style={styles.txtSlide}>Discover</Text>
                            </View>
                            <View style={[styles.row, styles.chip]}>
                                <Icon name="settings" size={14} color='#2b2b2b' />
                                <Text style={styles.txtSlide}>Setting</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={[styles.row, styles.product]}>
                        <Text style={styles.txtProfile}>Recent Delivery</Text>
                    </View>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true} style={[styles.borderLine1,]}>
                        <View style={[styles.card, _styles.shadow]}>
                            <View style={[{ flexDirection: 'row' }]}>
                                <Image source={require('../../modules/assets/avatar.png')} style={styles.profile} />
                                <View style={styles.profile1}>
                                    <View style={styles.row}>
                                        <Text style={{ color: '#2b2b2b', fontSize: 16, fontWeight: '500', flex: 1 }}>Phon Vannaroth</Text>
                                        <Text style={{ color: '#9aa0a6', fontSize: 14 }}>N10017</Text>
                                    </View>
                                    <View style={[styles.row,]}>
                                        <Text style={{ color: '#2b2b2b', fontSize: 10, }}>Oct, 24 2019</Text>
                                        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                                            <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: modules.RED, marginHorizontal: 12 }}>
                                            </View>
                                        </View>
                                        <Text style={{ color: '#9aa0a6', fontSize: 14 }}>Phnom Penh</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Icon name="user" size={12} color='#2b2b2b' />
                                        <Text style={{ color: '#2b2b2b', fontSize: 12, paddingHorizontal: 12 }}>: Ethan Hunt</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Icon name="truck" size={12} color='#2b2b2b' />
                                        <Text style={{ color: modules.BLUE, fontSize: 12, paddingHorizontal: 12 }}>: Delivering</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.row, { justifyContent: 'space-between', marginTop: 12 },]}>
                                <View style={[styles.row,]}>
                                    <Icon name="layers" size={18} color={modules.BLUE} />
                                    <Text style={{ color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 }}>12 Items</Text>
                                </View>
                                <View style={{ width: 1, height: 15, backgroundColor: modules.BLUE }}>

                                </View>
                                <View style={[styles.row]}>
                                    <Icon name="dollar-sign" size={18} color={modules.BLUE} />
                                    <Text style={{ color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 }}>12.75</Text>
                                </View>
                            </View>

                        </View>
                        <View style={[styles.card, _styles.shadow]}>
                            <View style={[{ flexDirection: 'row' }]}>
                                <Image source={require('../../modules/assets/avatar.png')} style={styles.profile} />
                                <View style={styles.profile1}>
                                    <View style={styles.row}>
                                        <Text style={{ color: '#2b2b2b', fontSize: 16, fontWeight: '500', flex: 1 }}>Phon Vannaroth</Text>
                                        <Text style={{ color: '#9aa0a6', fontSize: 14 }}>N10017</Text>
                                    </View>
                                    <View style={[styles.row,]}>
                                        <Text style={{ color: modules.BLUE, fontSize: 10, }}>Oct, 24 2019</Text>
                                        <View style={{ width: 5, height: 5, borderRadius: 2.5, backgroundColor: modules.RED, marginHorizontal: 12 }}>
                                        </View>
                                        <Text style={{ color: '#9aa0a6', fontSize: 14 }}>Phnom Penh</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={{ color: modules.PRICECCOLOR, fontSize: 14 }}>Open</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.row, { justifyContent: 'space-between', marginTop: 12 },]}>
                                <View style={[styles.row,]}>
                                    <Icon name="layers" size={18} color={modules.BLUE} />
                                    <Text style={{ color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 }}>12 Items</Text>
                                </View>
                                <View style={{ width: 1, height: 15, backgroundColor: modules.BLUE }}>

                                </View>
                                <View style={[styles.row]}>
                                    <Icon name="dollar-sign" size={18} color={modules.BLUE} />
                                    <Text style={{ color: modules.SUB_TEXT, fontSize: 12, paddingHorizontal: 8 }}>12.75</Text>
                                </View>
                            </View>

                        </View>

                    </ScrollView>
                    {/* <TouchableOpacity style={{ padding: 12 }}> */}
                    {/* <View style={[{ padding: 14, backgroundColor: modules.WHITE, borderRadius: 5, flexDirection: 'row', alignItems: 'center', }, _styles.SHADOW1]}>
                        <Text style={{ flex: 1, color: '#9aa0a6', fontSize: 14 }}>Delivery by date</Text>
                        <Icon name="sliders" />
                    </View> */}
                    <View style={[styles.row, styles.product]}>
                        <Text style={styles.txtProfile}>Delivery by date</Text>
                        <Icon name="sliders" />
                    </View>
                    <View style={[styles.row, { backgroundColor: '#fff' }]} >
                        <Icon name="check-square" style={styles.icon} color={modules.BLUE} />
                        <View style={styles.border}>
                            <Text style={styles.txtName}>Task schedule list</Text>
                            <Text style={styles.txtSimi}>Check your task schedule list by the calendar</Text>
                        </View>
                    </View>
                    <View style={[styles.row, { backgroundColor: '#fff' }]} >
                        <Icon name="check-square" style={styles.icon} color={modules.BLUE} />
                        <View style={[styles.border, { borderColor: 'rgb(255,255,255)' }]}>
                            <Text style={styles.txtName}>Task schedule list</Text>
                            <Text style={styles.txtSimi}>Check your task schedule list by the calendar</Text>
                        </View>
                    </View>
                    {/* </TouchableOpacity> */}
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 5,
        backgroundColor: modules.BLUE
    },
    profile1: {
        width: modules.VIEW_PORT_WIDTH / 1.6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    chip: {
        backgroundColor: '#f7f9fa',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: 12
    },
    card: {
        backgroundColor: '#ffff',
        padding: 14,
        borderRadius: 5,
        marginLeft: 12,
        width: modules.VIEW_PORT_WIDTH / 1.2
    },
    safe: {
        backgroundColor: '#ffffff'
    },
    header: {
        justifyContent: 'space-between',
        backgroundColor: modules.WHITE,
        paddingBottom: 8

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
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
    icon: {
        marginHorizontal: 12,
        fontSize: 18
    },
    txtProfile: {
        fontSize: 16,
        ...fontSemiBold,
        color: '#2b2b2b'
    },
    txtSub: {
        fontSize: 12,
        ...fontLight,
        color: modules.SUB_TEXT,
        paddingRight: 12
    },
    txtSlide: {
        fontSize: 12,
        ...fontSemiBold,
        color: '#2b2b2b',
        paddingHorizontal: 8
    },
    txtSlide1: {
        fontSize: 16,
        ...fontSemiBold,
        color: '#2b2b2b',
        marginHorizontal: 12,
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    product: {
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff'
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
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    borderLine1: {
        // borderBottomWidth: 5,
        // borderTopWidth: 2,
        borderColor: '#fafafa',
        paddingVertical: 5,
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
        ...fontSemiBold,
    },
    CIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 12,

    }

})
