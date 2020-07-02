import * as React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MODULE from '../modules';
import Icon from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';
import { _formatDateTime } from '../services/formatdate.service';
import modules from '../modules';

export interface AppProps {
  data: any;
  onClick: any
}
export default ({ data, onClick }: AppProps) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.container}>
      <FastImage
        source={data.items_cover[0]}
        style={styles.img}>
        <Icon name={"archive"} style={styles.icon} />
      </FastImage>
      <View style={styles.textContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.price}>{data.name}</Text>
          <View style={styles.point}>
          </View>
          <Text style={[styles.price, { color: MODULE.PRIMARY }]}>{data?.date_create ? _formatDateTime(data.date_create.seconds) : "none"}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.name} numberOfLines={1}>
            {`Products: `}
          </Text>
          {
            data.items_name.map((i: any) => {
              return (
                <Text style={[styles.name, { fontWeight: '400', color: modules.BLUE,paddingLeft:2 }]} numberOfLines={1}>
                 | {i}
                </Text>
              )
            })
          }

        </View>

        <Text style={styles.price} numberOfLines={2}>
          {data.description}
        </Text>
        <View style={{ flex: 1 }} />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: MODULE.BODY_HORIZONTAL,
    backgroundColor: MODULE.WHITE,
    width: MODULE.VIEW_PORT_WIDTH - MODULE.BODY_HORIZONTAL_12,
    height: MODULE.VIEW_PORT_WIDTH / 4.5,
    marginHorizontal: MODULE.BODY_HORIZONTAL_12 / 2,
    marginTop: MODULE.BODY_HORIZONTAL_12 / 2,
    flexDirection: 'row'
  },
  img: {
    width: MODULE.VIEW_PORT_WIDTH / 8,
    height: MODULE.VIEW_PORT_WIDTH / 8,
    padding: MODULE.BODY_HORIZONTAL_12,
    backgroundColor: '#f7f9fa',
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    marginHorizontal: MODULE.BODY_HORIZONTAL,
  },
  name: {
    fontSize: MODULE.FONT_P,
    fontWeight: '600',
  },
  price: {
    fontSize: MODULE.FONT_P - 1,
    color: MODULE.TEXT,
    marginBottom: MODULE.BODY_HORIZONTAL / 2,
  },
  point: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: MODULE.TEXT,
    marginHorizontal: 4
  },
  status: {
    width: MODULE.VIEW_PORT_WIDTH / 6,
    height: MODULE.VIEW_PORT_WIDTH / 6,
    borderRadius: MODULE.VIEW_PORT_WIDTH / 12,
    backgroundColor: MODULE.BORDER_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    fontSize: 24,
    color: MODULE.PRIMARY
  }
});
