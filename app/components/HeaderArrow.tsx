import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import modules from '../modules';
import { fontBold } from '../../functions/customFont';

interface Props {
  goBack: () => void;
  title: string;
}

export default ({ goBack, title }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack} style={[styles.btn]}>
        <Icon name="chevron-left" style={styles.arrowBack}/>
      </TouchableOpacity>
      <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
      </View>
     <View style={styles.btn}/>
    </View>
  )
}

const styles = StyleSheet.create({
  arrowBack:{
    fontSize:modules.FONT_H3-2,
  },
  title:{
    fontSize:modules.FONT_H6,
    ...fontBold,
    marginBottom:3,
  },
  header:{
    flex:1,
  },
  btn:{
    width:32,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal:modules.BODY_HORIZONTAL,
    paddingVertical:modules.BODY_HORIZONTAL,
    alignItems:"center",
    borderBottomColor:modules.BORDER_COLOR,
    borderBottomWidth:1,
    backgroundColor:modules.WHITE,
  }
})
