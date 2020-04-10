import React, { Component } from 'react'
import { Text, StyleSheet, View, SafeAreaView, FlatList,TouchableOpacity } from 'react-native'
import _styles from '../../../../_styles'
import ArrowBackHeader from '../../../../components/ArrowBackHeader'
import modules from '../../../../modules'
import FastImage from 'react-native-fast-image'
import PlaceholderSpinner from '../../../../components/PlaceholderSpinner'
import InputHeader from '../../../../components/InputHeader'
import Icon from 'react-native-vector-icons/Feather'

interface Props {
  goBack: () => void
  data: Array<{ text: string }>
  loading: boolean
  search: string
  onChangeText: (text: string) => void
  onSearch: () => void
  searchPlaceHolder: string
  removeItem: (index: any) => void
  title:string;
}

export default ({title, goBack, data, loading, search, onChangeText, onSearch, searchPlaceHolder, removeItem }: Props) => {
  return (
    <View style={_styles.flx1}>
      <ArrowBackHeader
        process={loading}
        activeSave={false}
        onGoBack={goBack}
        title={title}
        color={modules.WHITE}
      />
      <InputHeader
        value={search}
        onChangeText={onChangeText}
        onSearch={onSearch}
        disable={loading}
        searchPlaceHolder={searchPlaceHolder}
      />
      {loading ? <PlaceholderSpinner /> :
        <FlatList
          keyExtractor={(i, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => renderItem(item, () => removeItem(item))}
        />}
    </View>
  )
}

const renderItem = (item: any, removeItem: any) => {
  return <View style={styles.listItem}>
    <View style={styles.leftContent}>
      <View style={_styles.rows}>
        <View style={[_styles.flx1, { paddingRight: modules.BODY_HORIZONTAL }]}>
          <Text numberOfLines={1} style={styles.itemText}>
            {item}
          </Text>
        </View>
        <TouchableOpacity onPress={removeItem}>
          <Icon name="trash-2" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  </View>
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
    color: modules.RED
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: modules.BORDER,
    backgroundColor: modules.WHITE
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: modules.TEXT
  },

  pinIcon: {
    fontSize: 16,
    marginRight: 10,
    color: modules.BLUE
  },
  saleBox: {
    ..._styles.rows,
    justifyContent: 'space-between',
    color: modules.SUB_TEXT,
    fontSize: modules.FONT_S
  },
})
