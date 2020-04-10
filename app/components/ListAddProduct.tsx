import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import modules from '../modules';
import Icon from 'react-native-vector-icons/Feather'
import Ripple from 'react-native-material-ripple'
import _styles from '../_styles';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
export interface Props {
    onPress: any
    title: string
    children: any
    icon: string
}

export default ({ onPress, children, title, icon }: Props) => {
    {
        return (
            <View >
                <Ripple onPress={onPress} style={styles.container}>
                    <View style={styles.list} >
                        <Icon name={icon} style={styles.iconI} />
                        <View style={styles.border}>
                            <Text style={styles.txtName}>{title}</Text>
                            {children ? <View style={[_styles.flx1, { marginBottom: 12, height: 20, overflow: 'hidden', }]}>
                                {children}
                            </View> : <View style={{ marginBottom: 12, height: 20 }}>
                                    <Text style={styles.subtitle}>Select {title}</Text>
                                </View>}
                        </View>
                        <Icon name="chevron-right" style={styles.listIcon} />
                    </View>
                </Ripple>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: modules.WHITE,
        paddingHorizontal: modules.BODY_HORIZONTAL,
    },
    list: {
        backgroundColor: modules.WHITE,
        borderBottomWidth: 1,
        borderColor: modules.BORDER_COLOR,
        flexDirection: 'row',
        alignItems: 'center'

    },
    txtName: {
        fontSize: modules.FONT_S,
        color: modules.SUB_TEXT,
        marginBottom: 5,
        marginTop: modules.BODY_HORIZONTAL_12

    },
    iconI: {
        fontSize: 21,
        color: '#0064E1'
    },
    listIcon: {
        color: '#d3d3d3',
        fontSize: 21,
    },
    border: {
        flex: 1,
        marginHorizontal: modules.BODY_HORIZONTAL,
    },
    subtitle: {
        fontSize: modules.FONT_P
    }
})