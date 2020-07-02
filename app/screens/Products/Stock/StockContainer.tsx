import * as React from 'react';
import { View, StyleSheet, Text, Alert, ColorPropType } from 'react-native';
import StockScreen from './StockScreen'
import { inject, observer } from 'mobx-react';

interface Props {
    product: any
    navigation: any,
    auth: any

}

interface State {
    UMPrice: any
    unitMeasurement: any
}

@inject('auth', 'store', 'product')
@observer
export default class StockContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            UMPrice: null,
            unitMeasurement: null
        };
    }
    componentDidMount() {
        const { UMPrice, unitMeasurement, dataSelectedItem } = this.props.product;
        this.setState({ UMPrice })
        if (unitMeasurement) {
            this.setState({ unitMeasurement: unitMeasurement })
        } else {
            this.setState({ unitMeasurement: dataSelectedItem.unitMeasurement })
        }
    }
    _onSave = async (um: any, qty: number, cost: number, price: number, color: any, size: any) => {
        if (!um) {
            Alert.alert('Invalid Base Unit Measurement!');
            return;
        }
        if (!qty) {
            Alert.alert('Invalid Qty!');
            return;
        }
        if (!price) {
            Alert.alert('Invalid Price!');
            return;
        }
        if (!cost) {
            Alert.alert('Invalid Cost!');
            return;
        }
        const { dataSelectedItem } = this.props.product;
        const UMPrice = {
            multiply: um.multiply,
            text: um.text,
            qty: qty,
            cost: cost,
            price: price,
            color: color,
            size: size,
            totalQty: Math.round(10 * qty * um.multiply) / 10,
            code: um.code
        }
        const { userCanActive } = this.props.auth
        if (userCanActive) {
            await this.props.product.setUMPrice(UMPrice)
        } else {
            if (dataSelectedItem.totalQty < UMPrice.totalQty) {
                Alert.alert("Product's not much in stock")
                return
            } else {
                await this.props.product.setUMPrice(UMPrice)
            }
        }





    }
    _onRemoveUMPrice = async (item: any) => {
        await this.props.product.removeUMPrice(item)
    }
    public render() {
        const { UMPrice, dataSelectedItem } = this.props.product;
        return (
            <StockScreen
                unitMeasurement={this.state.unitMeasurement}
                navigation={this.props.navigation}
                loading={false}
                onSave={this._onSave}
                UMPrice={UMPrice}
                onRemoveUMPrice={this._onRemoveUMPrice}
            />
        );
    }
}
