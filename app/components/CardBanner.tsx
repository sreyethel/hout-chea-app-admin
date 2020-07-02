import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import modules from '../modules';
import { fontGSans } from '../../functions/customFont';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    name: any,
    image: any,
    clickMore: () => void
}

export default ({ name, image, clickMore }: Props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={clickMore}>
            <FastImage style={styles.img} source={{ uri: image }} />
            <View style={styles.row}>
                <Text style={styles.title}>{name}</Text>
                <Icon style={styles.iocn} name="md-more" />
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        padding: modules.BODY_HORIZONTAL_12,
        marginTop: modules.BODY_HORIZONTAL_12,
        backgroundColor: modules.WHITE,
        marginHorizontal: modules.BODY_HORIZONTAL_12,
        borderRadius: modules.SPACE,
    },
    img: {
        height: modules.VIEW_PORT_WIDTH / 2.3,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: modules.BODY_HORIZONTAL_12,
    },
    title: {
        fontSize: modules.FONT_H6,
        ...fontGSans,
        flex: 1,
    },
    iocn: {
        fontSize: modules.FONT_H5,
        color: modules.SUB_TITLE,
    },
});
