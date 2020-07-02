import React, { useState } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import modules from '../modules'
import _style from '../_styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
interface Props {
  onChangeText: (value: any) => void
  onCamera?: any
  style?: any
  searchPlaceHolder: string
  value: any
  onSearch: () => void
  disable?: boolean
  CATE: any
}

export default (props: Props) => {
  const { onCamera, onSearch, style, searchPlaceHolder, value, onChangeText, disable, CATE } = props
  return (
    <View style={styles.container}>
      <View style={[styles.rows, styles.header, style]}>
        <View style={[styles.search]}>
          <Feather style={styles.inputIcon} name='search' />
          <TextInput
            editable={!disable}
            placeholder={searchPlaceHolder}
            ref={CATE}
            style={{
              flex: 1,
              margin: 0,
              padding: 0,
              marginLeft: modules.PADDING,
              color: modules.TEXT,
              fontSize: modules.FONT_P,
            }}
            keyboardType='web-search'
            autoCapitalize='none'
            value={value}
            autoCorrect={false}
            onSubmitEditing={onSearch}
            onChangeText={text => onChangeText(text)}
          />
        </View>
        {onCamera ? (
          <TouchableOpacity onPress={onCamera} style={styles.iconButton}>
            <Icon style={styles.buttonIcon} name='photo-camera' />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: modules.BODY_HORIZONTAL_12 + 3
  },
  exploreText: {
    fontSize: modules.FONT_P,
    marginLeft: 5,
    color: modules.SUB_TEXT,
    fontWeight: '600'
  },
  iconButton: {
    borderRadius: 100,
    backgroundColor: modules.SEARCH_BG,
    padding: modules.PADDING / 1.5,
    marginLeft: modules.PADDING
  },
  inputSearch: {
    flex: 1,
    marginLeft: modules.PADDING,
    color: modules.PLACE_HOLDER,
    fontSize: modules.FONT_P
  },
  inputIcon: {
    fontSize: 22,
    color: modules.PRIMARY_TAB
  },
  buttonIcon: {
    fontSize: 22,
    color: modules.TEXT
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: modules.SEARCH_BG,
    paddingHorizontal: modules.PADDING,
    paddingVertical: modules.BODY_HORIZONTAL_24 / 3,
    borderRadius: modules.BODY_HORIZONTAL_24
  },
  header: {
    paddingHorizontal: modules.BODY_HORIZONTAL
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerButton: {
    display: 'flex',
    flexDirection: 'row'
  },

})
