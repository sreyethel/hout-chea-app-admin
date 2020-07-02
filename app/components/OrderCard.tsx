import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FastImage from "react-native-fast-image";
import MODULE from "./../modules";
import { FontGSansSemiBold, fontGSans } from "../../functions/customFont";
import { _formatShortDate, _formatDate } from "../services/formatdate.service";
import module from "./../modules";

export interface AppProps {
  orderDate: any;
  orderID: any;
  price: any;
  fileUrl: any;
  qty: any;
  totalPrice: any;
  showViewDetail: boolean;
  showOrderDate: any;
  color: any;
  size: string;
  status: any;
  onDetail: any;
  data: any
}

export default ({
  status,
  onDetail,
  data
}: AppProps) => {
  const name = data.items.length > 2 ? data.items.slice(0, 2) : data.items
  return (
    <TouchableOpacity onPress={onDetail} style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.separate}>
          <FastImage
            style={styles.img}
            source={{ uri: data ? data.items[0].item.cover : "" }}
          >
            {
              data.items.length > 12 ?
                data.items.slice(0, 12).map((m:any) => {
                  return (
                    <FastImage
                      style={styles.imgItem}
                      source={{ uri: m.item.cover }}
                    />
                  )
                })
                :
                data.items.map((m:any) => {
                  return (
                    <FastImage
                      style={styles.imgItem}
                      source={{ uri: m.item.cover }}
                    />
                  )
                })
            }

          </FastImage>

          <View style={styles.title}>
            <Text style={styles.name} numberOfLines={2}>
              {_formatShortDate(data.order_date.seconds)}
            </Text>
            <View style={{flex:1}}>
            {
              name.map((i: any) => {
                return (
                  <Text  style={[styles.date,]} numberOfLines={2}>
                    . {i.item.name}
                  </Text>
                )
              })
            }
           
            {
              data.items.length > 2 ?
                <Text style={styles.date} numberOfLines={2}>
                  ....more
            </Text>
                : null
            }
             </View>
            <View style={{ flex: 1 }} />
            <Text style={[styles.date, { color: module.BLUE }]}>Time:( {_formatDate(data.order_date.seconds)})  </Text>
          </View>

        </View>
      </View>
      <View style={styles.colume}>
        <View>{renderStatus(data.order_status.key)}</View>
        <Text style={styles.txtTotal}>${data.order_total_price}</Text>
      </View>
    </TouchableOpacity>
  );
};
const renderStatus = (item: any) => {
  if (item == 1) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"local-mall"}
            style={[styles.icon, { color: MODULE.SUB_TEXT }]}
          />
        </View>
        <Text style={[styles.status, { color: MODULE.SUB_TEXT }]}>pending</Text>
      </View>
    );
  } else if (item == 2) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"assignment-turned-in"}
            style={[styles.icon, { color: "#F3AD49" }]}
          />
        </View>
        <Text style={[styles.status, { color: "#F3AD49" }]}>confirm</Text>
      </View>
    );
  } else if (item == 3) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"local-shipping"}
            style={[styles.icon, { color: MODULE.BLUE }]}
          />
        </View>
        <Text style={[styles.status, { color: MODULE.BLUE }]}>delivery</Text>
      </View>
    );
  } else if (item == 6) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"indeterminate-check-box"}
            style={[styles.icon, { color: MODULE.RED }]}
          />
        </View>
        <Text style={[styles.status, { color: MODULE.RED }]}>rejected</Text>
      </View>
    );
  } else if (item == 4) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"verified-user"}
            style={[styles.icon, { color: MODULE.PRIMARY }]}
          />
        </View>
        <Text style={[styles.status, { color: MODULE.PRIMARY }]}>
          complete
        </Text>
      </View>
    );
  } else if (item == 5) {
    return (
      <View style={{ alignItems: "center" }}>
        <View style={styles.button}>
          <Icon
            name={"autorenew"}
            style={[styles.icon, { color: MODULE.PROGRESS_COLOR[5] }]}
          />
        </View>
        <Text style={[styles.status, { color: MODULE.PROGRESS_COLOR[5] }]}>
          return
        </Text>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  status: {
    fontSize: MODULE.FONT_S,
    marginTop: MODULE.BODY_HORIZONTAL / 2,
    ...fontGSans,
    textTransform: "uppercase",
  },
  colume: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: MODULE.BODY_HORIZONTAL_24,
  },
  mainContainer: {
    flex: 1,
    alignItems: "flex-start",
    borderRightColor: MODULE.COLOR_MAIN,
    borderRightWidth: 0.3,
  },
  rowPrice: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    paddingHorizontal: MODULE.BODY_HORIZONTAL_12,
    flex:1
  },
  separate: {
    flexDirection: "row",
  },
  container: {
    flex: 1,
    padding: MODULE.BODY_HORIZONTAL,
    marginTop: MODULE.BODY_HORIZONTAL,
    backgroundColor: MODULE.WHITE,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: MODULE.BODY_HORIZONTAL / 4,
  },
  textLabel: {
    fontSize: MODULE.FONT_P,
    color: MODULE.COLOR_MAIN,
    fontWeight: "600",
  },
  date: {
    fontSize: MODULE.FONT_P,
    fontWeight: "400",
    ...fontGSans,
  },
  icon: {
    fontSize: MODULE.FONT_H4,
    color: MODULE.TEXT,
  },
  img: {
    width: MODULE.VIEW_PORT_WIDTH / 4,
    height: MODULE.VIEW_PORT_WIDTH / 4,
    borderColor: "rgba(0,0,0,0.5)",
    borderWidth: 0.5,
    padding: MODULE.BIG_SPACE / 2,
    borderRadius: MODULE.RADIUS,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  imgItem: {
    width: MODULE.VIEW_PORT_WIDTH / 22,
    height: MODULE.VIEW_PORT_WIDTH / 22,
    borderWidth: 1,
    borderColor: MODULE.WHITE,
    margin: 2
  },
  titleContainer: {
    marginTop: MODULE.BODY_HORIZONTAL / 2,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    fontSize: MODULE.FONT,
    fontWeight: "300",
    color: MODULE.COLOR_MAIN,
    width: MODULE.VIEW_PORT_WIDTH / 2.2,
  },
  price: {
    fontSize: MODULE.FONT_P,
    marginTop: MODULE.BODY_HORIZONTAL / 2,
    ...fontGSans,
    textTransform: "uppercase",
  },
  qtyContainer: {
    marginVertical: MODULE.BODY_HORIZONTAL,
  },
  txtTotal: { fontSize: 24, fontWeight: "600", color: MODULE.SUB_TEXT },
  button: {
    padding: MODULE.BODY_HORIZONTAL_12,
    borderRadius: MODULE.BODY_HORIZONTAL_12 * 2,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  textqty: {
    color: MODULE.TEXT,
    fontSize: MODULE.FONT_S + 1,
  },
  textDetail: {
    fontSize: MODULE.FONT_H5,
    fontWeight: "700",
    color: MODULE.WHITE,
    textTransform: "uppercase",
  },
  color: {
    width: MODULE.BODY_HORIZONTAL * 3,
    height: MODULE.BODY_HORIZONTAL,
    borderWidth: 1,
    borderRadius: MODULE.BODY_HORIZONTAL * 1.5,
    borderColor: MODULE.BORDER_COLOR,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeContainer: {
    // width: MODULE.BODY_HORIZONTAL * 3,
    // height: MODULE.BODY_HORIZONTAL * 3,
    // borderWidth: 1,
    // borderRadius: MODULE.BODY_HORIZONTAL * 1.5,
    // borderColor: MODULE.BORDER_COLOR,
    flexDirection: "row",
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  colorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: MODULE.FONT_P,
    fontWeight: "500",
    marginRight: MODULE.BODY_HORIZONTAL / 2,
  },
});
