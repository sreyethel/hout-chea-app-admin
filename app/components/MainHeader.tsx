import * as React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, SafeAreaView } from 'react-native';
import MODULE from '../modules';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { inject, observer } from 'mobx-react';
import FastImage from 'react-native-fast-image';
import modules from '../modules';

interface Props {
    onNoti: any,
    badge: number

}



export default ({ onNoti, badge }: Props) => {


    return (
        <View style={styles.header}>
            <View>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={onNoti} >
                <View style={styles.btnIcon} >
                    <Icon name="notifications-active" style={{
                        fontSize: MODULE.FONT_H3,
                        color: MODULE.WHITE
                    }} />
                </View>
                {
                    badge ?
                        <View style={{ backgroundColor: MODULE.BORDER_COLOR, width: 15, height: 15, borderRadius: 10, position: 'absolute', marginLeft: 36, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: MODULE.RED, fontSize: 10, fontWeight: '700' }}>{badge}</Text>
                        </View>
                        : null
                }

            </TouchableOpacity>



        </View>
    );
}


const styles = StyleSheet.create({
    header: {
        backgroundColor: MODULE.PRIMARY,
        paddingHorizontal: MODULE.BODY_HORIZONTAL,
        paddingVertical: MODULE.BODY_HORIZONTAL / 4,
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    logo: {
        height: MODULE.BODY_HORIZONTAL * 3,
        width: MODULE.BODY_HORIZONTAL * 14,
        // height:MODULE.BODY_HORIZONTAL*3,
        resizeMode: 'contain'
    },
    searchContainer: {
        backgroundColor: MODULE.BORDER_COLOR,
        width: MODULE.BODY_HORIZONTAL * 3,
        height: MODULE.BODY_HORIZONTAL * 3,
        borderRadius: MODULE.BODY_HORIZONTAL * 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchIcon: {
        fontSize: MODULE.FONT_H3,
        color: MODULE.ICON
    },
    btnIcon: {
        // backgroundColor: MODULE.BACKGROUND,
        width: MODULE.BODY_HORIZONTAL * 3,
        height: MODULE.BODY_HORIZONTAL * 3,
        borderRadius: MODULE.BODY_HORIZONTAL * 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        marginTop: 2,
    },
    profile: {
        height: MODULE.VIEW_PORT_WIDTH / 12,
        width: MODULE.VIEW_PORT_WIDTH / 12,
        borderRadius: MODULE.VIEW_PORT_WIDTH / 24,
        backgroundColor: '#2b2b2b',
        marginLeft: 12

    }
})