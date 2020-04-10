import React from 'react';
import { Alert } from 'react-native';
import AddProductColorDetail from './AddProductColorDetail';
import { NavigationStackScreenProps } from 'react-navigation-stack'
import { dColor } from '../../../../dummy/sampleData';
import { inject, observer } from 'mobx-react'

interface Props extends NavigationStackScreenProps{
  product: any;
}

interface State {
  text: string
}

@inject('product')
@observer
export default class AddProductColorDetailContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _removeItem = (item: any) => {
    this.props.product.removeColor(item);
  }

  _onAddColor = () => {
    const { text } = this.state
    const str = text.startsWith('#')
    const test = /^#([0-9A-F]{3}){1,2}$/i.test(str ? `${text}` : `#${text}`);
    if (test != true) {
      Alert.alert('Invalid Color', 'Please try other hax color')
      return
    }
    const result = `${text}`;
    this.setState({ text: '' })
    this.props.product.addColor(result);
  }



  render() {
    const { text } = this.state
    const { color } = this.props.product;
    return (
      <AddProductColorDetail
        goBack={() => this.props.navigation.goBack()}
        searchPlaceHolder={"Enter hax color"}
        loading={false} 
        value={text} 
        data={color}
        removeItem={this._removeItem}
        onReturn={this._onAddColor}
        onChangeText={text => this.setState({ text: text })}
      />
    );
  }
}
