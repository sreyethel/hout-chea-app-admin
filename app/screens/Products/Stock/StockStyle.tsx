import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import modules from '../../../modules';


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modules.BORDER_COLOR
    },
    topContainer: {
        paddingHorizontal: 12,
        backgroundColor: modules.WHITE
    },
    leftBox: {
        flex: 1,
        marginRight: modules.BODY_HORIZONTAL / 2
    },
    rightBox: {
        flex: 1,
        marginLeft: modules.BODY_HORIZONTAL / 2
    },
    textfield: {
        marginBottom: modules.BODY_HORIZONTAL
    },
    textAreaContainer: {
        marginBottom: modules.BODY_HORIZONTAL
    },
    textArea: {
        minHeight: 150,
        marginBottom: modules.BODY_HORIZONTAL
    },
    listContainer:{
        alignItems:'center',
        flexDirection:'row',
        padding:12,
        marginHorizontal:12,
        marginBottom:12,
        backgroundColor:modules.WHITE
    },
    subText:{
        color:modules.SUB_TEXT,
        fontSize:13
    },
    unitText:{
        color:modules.BLUE,
        marginTop:10
    },
    icon:{
        fontSize:24,
        padding:12
    },
    label:{
        textDecorationLine:'underline',
        fontSize:17,
        fontWeight:'700'
    }

})