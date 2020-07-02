import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SelectProductScreen from './SelectProductScreen';
import { inject, observer } from 'mobx-react';

interface Props {
    navigation: any,
    product: any;
    auth: any;
    category: any;
}

interface State {
    category: string;
    loading: boolean;
    data: any;
    items: Array<any>;
}

@inject('product', 'auth', 'category')
@observer
export default class SelectProductContainer extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            category: '',
            loading: true,
            data: [],
            items: []
        };
    }
    async  componentDidMount() {
        const { data, loading } = this.props.product;
        if (data) {
            this.setState({ data, items: data, loading: loading });
        }

    }
    _onSearch = () => {
        const { category, items } = this.state;
        if (!category) {
            this.setState({ data: items });
            return;
        }
        const rows = items.filter((m) => m && `${m.name}`.toLocaleLowerCase().includes(category.toLocaleLowerCase()));
        this.setState({ data: rows });
    };

    _onSelect = (item: any) => {
        this.props.product.selectedProduct(item);
        this.props.navigation.goBack();
    };

    public render() {
        const { category, data } = this.state;
        return (
            <SelectProductScreen
                goBack={() => this.props.navigation.goBack()}
                data={data}
                onPress={this._onSelect}
                loading={false}
                search={category}
                onChangeText={(text) => this.setState({ category: text })}
                onSearch={this._onSearch}
                searchPlaceHolder={'Search products'}

            />
        );
    }
}
