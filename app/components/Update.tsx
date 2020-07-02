import * as React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Platform ,TouchableOpacity} from 'react-native';
import MODULE from '../modules';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

export interface Props {
    onCancel: any,
    onUpdate: any

}

export default ({ onCancel, onUpdate }: Props) => {
    if (Platform.OS == "android") {
        return (
            <View
            style={[StyleSheet.absoluteFill, { padding: 12, backgroundColor:'rgba(218, 36, 39,0.8)'}]}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Update Version</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: MODULE.WHITE }}
                            onPress={onCancel}
                        >
                            <Text style={[styles.textStyle, { color: MODULE.PRIMARY }]}>NOT NOW</Text>
                        </TouchableOpacity>
                        <View style={{width:40}}/>
                        <TouchableOpacity
                            style={{ ...styles.openButton, backgroundColor: MODULE.PRIMARY }}
                            onPress={onUpdate}
                        >
                            <Text style={styles.textStyle}>UPDATE</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
            </View>
        )
    } else {
        return (
            <BlurView
                blurType="xlight"
                blurAmount={10}
                style={[StyleSheet.absoluteFill, { borderBottomWidth: 10, padding: 12 }]}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Update Version</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: MODULE.WHITE }}
                                onPress={onCancel}

                            >
                                <Text style={[styles.textStyle, { color: MODULE.PRIMARY }]}>NOT NOW</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ ...styles.openButton, backgroundColor: MODULE.PRIMARY }}
                                onPress={onUpdate}
                            >
                                <Text style={styles.textStyle}>UPDATE</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </BlurView>
        )

    }

}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        paddingHorizontal: 24,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontWeight: '600',
        fontSize: 24
    }
})

