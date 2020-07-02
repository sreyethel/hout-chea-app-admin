import * as React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
import NotiList from '../../components/NotiList';
import modules from '../../modules';

interface Props {
    loadingNoti: boolean
    notiDoc: any
    onNoti: (item: any) => void
    processingOrder: boolean
}

export default ({ processingOrder, loadingNoti, notiDoc, onNoti }: Props) => {
    if (loadingNoti) {
        return <ActivityIndicator />
    } else {
        return (
            <View style={styles.container}>
                {
                    notiDoc.length <= 0 ?
                        <Text style={{ textAlign: 'center', margin: 12, color: modules.SUB_TEXT }}>No Data</Text>
                        : null
                }
                <FlatList
                    ListHeaderComponent={() => {

                        return (
                            <View>
                                {processingOrder ? <ActivityIndicator  color={modules.PRIMARY}/> : null}
                            </View>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    data={notiDoc}
                    renderItem={({ item }) => _renderItem(item, onNoti)}
                />

            </View>
        )

    }

}

const _renderItem = (i: any, onNoti: any) => {
    return <NotiList
        data={i}
        onClick={() => onNoti(i)}
    />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: modules.BORDER_COLOR
    }
})