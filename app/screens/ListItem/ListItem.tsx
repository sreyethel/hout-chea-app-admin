import React from 'react'
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native'
import IonIcons from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import modules from '../../modules'
import { fontSemiBold } from '../../../functions/customFont'



interface Props{
id:any;
name:any;
item:any;
onSelected:any;
}

export default ({id,name,item,onSelected}:Props)=> {
  return (
    <TouchableOpacity key={id} activeOpacity={1} style={styles.locationItem} onPress={()=>onSelected(item)}>
      <IonIcons name='flag' style={styles.locationIcon} />
      <Text style={styles.link}>{name}</Text>
      <View style={styles.flx1}></View>
      {/* <Text style={styles.shortcut}>{id}</Text> */}
      <Icon name='arrow-right' style={styles.navigateNext} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  locationItem: {
    overflow: 'hidden',
    backgroundColor: modules.WHITE,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',

  },
  locationIcon: {
    color: modules.PRIMARY,
    fontSize: 24,
    marginRight: 12,
  },
  flx1: {
    flex: 1,
  },
  link: {
    ...fontSemiBold,
    fontSize: 15,
    color: modules.TEXT,
  },
  shortcut: {
    color: modules.SUB_TITLE,
    marginRight: 5,
    ...fontSemiBold
  },
  navigateNext: {
    fontSize: 14,
    color: modules.SUB_TITLE,
  },
});