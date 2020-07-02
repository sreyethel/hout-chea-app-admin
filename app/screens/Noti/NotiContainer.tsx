import * as React from 'react';
import { View, StyleSheet, Text, Platform, NativeModules } from 'react-native';
import { inject, observer } from 'mobx-react';
import NotiScreen from './NotiScreen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import firebase from 'react-native-firebase';
interface Props {
    navigation: any,
    transaction: any,
    auth: any,
    order: any
}

interface State {
}

@inject('transaction', 'auth', 'order')
@observer
export default class NotiContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        Platform.OS === 'android' && firebase.notifications().setBadge(0);
        Platform.OS === 'ios' && PushNotificationIOS.setApplicationIconBadgeNumber(0);
        const { profile, userCanActive } = this.props.auth;
        if (profile) {
            await this.props.transaction.clearBadge(profile,userCanActive)
            this.props.transaction.fetchNoti(profile, userCanActive)
        }
    }

    _onNoti = async (item: any) => {
        await this.props.order.fetchOrderByKey(item.order_key)
        this.props.navigation.navigate("ORDER_DETAIL")

    }

    public render() {
        const { loadingNoti, notiDoc } = this.props.transaction
        const { processingOrder } = this.props.order
        return (
            <NotiScreen
                loadingNoti={loadingNoti}
                notiDoc={notiDoc}
                onNoti={this._onNoti}
                processingOrder={processingOrder}
            />
        );
    }
}
