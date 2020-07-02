import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import modules from '../modules';
import { fontGSans } from '../../functions/customFont';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    name: any,
    image: any
    clickMore: () => void
}

export default ({ name, image, clickMore }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={clickMore}>
            <View style={styles.row}>
                <Text style={styles.title}>{name}</Text>
                <Icon style={styles.icon} name="ios-apps" />
            </View>
            <FastImage
                style={styles.img} source={{ uri: image }}
            />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        marginTop: modules.BODY_HORIZONTAL_12,
        backgroundColor: modules.WHITE,
    },
    img: {
        height: modules.VIEW_PORT_HEIGHT / 4.2,
    },
    title: {
        fontSize: modules.FONT_H6,
        ...fontGSans,
        flex: 1,

    },
    icon: {
        fontSize: modules.FONT_H5,
        color: modules.SUB_TITLE,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        padding: modules.BODY_HORIZONTAL_12,
    },
});
