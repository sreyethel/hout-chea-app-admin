import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import modules from '../../modules';
import _styles from '../../_styles';
import { fontSemiBold, fontLight, fontBold, FontGSansSemiBold, FontGSansBold } from './../../../functions/customFont';
import ArrowBackHeader from '../../components/ArrowBackHeader';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  onGoBack: () => void;
  onCountry: () => void;
  onChangePhone: (value: any) => void;
  onContinue: () => void;
  process: boolean;
  country: string;
  phone: any;
  disabled: boolean;
}

export default ({ onCountry, country, onGoBack, onContinue, process, disabled, phone, onChangePhone }: Props) => {
  return (
    <View style={_styles.containerPrimary}>
      {/* <ArrowBackHeader
        process={process}
        disabled={disabled}
        onRight={onContinue}
        arrowIcon='x-circle'
        color={modules.WHITE}
        rightText={"Continue"}
        onGoBack={onGoBack}
        title={"Create Your Store"} /> */}
        	<ArrowBackHeader  color={modules.WHITE} title="Create Your Store" onGoBack={onGoBack} />
      <KeyboardAvoidingView style={_styles.containerPrimary} behavior={Platform.OS === 'android' ? undefined : "padding"}>
        <ScrollView style={styles.body}>
          <View style={styles.settings}>
            <Text style={styles.loginText}>Create your store</Text>
            <Text style={styles.connect}>Enter your phone number and click Continue</Text>
          </View>
          <View style={styles.phone}>
            <TouchableOpacity onPress={onCountry} style={styles.country}>
              <Image source={modules.FLAG} style={styles.flag} />
              <MaterialIcons name="arrow-drop-down" style={styles.arrow} />
              <Text style={styles.countryCode}>{country}</Text>
            </TouchableOpacity>
            <TextInput
              editable={!process}
              autoCapitalize="none"
              autoFocus={true}
              keyboardType='number-pad'
              value={phone}
              onChangeText={(phoneNumber) => onChangePhone(phoneNumber)}
              style={styles.phoneText}
              placeholder="010 234 567"
            />
          </View>
        </ScrollView>
        <View style={[styles.continue, { paddingVertical: modules.BODY_HORIZONTAL_24 }]}>
          <Text style={styles.agreement}>
            By continuing by you may receive an SMS for verification. Message and data rates may apply.
          </Text>
          <TouchableOpacity
            disabled={disabled}
            onPress={onContinue}
            style={[styles.continueButton, disabled ? { backgroundColor: modules.DISABLED } : null]}
          >
            {process ?
              <ActivityIndicator color={modules.WHITE} />
              :
              <Icon style={styles.continueButtonIcon} name="arrow-right" />
            }
          </TouchableOpacity>
        </View>
        <SafeAreaView />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  loginText: {
    marginBottom: modules.BODY_HORIZONTAL / 3,
    marginTop: modules.BODY_HORIZONTAL * 2,
    fontSize: modules.FONT_H4,
    ...FontGSansBold,
  },
  connect: {
    color: modules.SUB_TEXT,
    fontSize: modules.FONT_P
  },
  error: {
    fontSize: modules.FONT_S,
    paddingTop: modules.SPACE,
    color: modules.RED
  },
  continueButtonIcon: {
    color: modules.WHITE,
    fontSize: modules.FONT_H2
  },
  agreement: {
    color: modules.SUB_TITLE,
    fontSize: modules.FONT_P,
    flex: 1
  },
  continueButton: {
    backgroundColor: modules.PRIMARY,
    borderRadius: modules.RADIUS_BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
    padding: modules.BODY_HORIZONTAL,
    marginLeft: modules.BODY_HORIZONTAL,
    width: 64,
    height: 64
  },
  continue: {
    flexDirection: 'row',
    marginHorizontal: modules.BODY_HORIZONTAL,
    alignItems: 'center'
  },
  flex1: {
    flex: 1
  },
  country: {
    flexDirection: 'row',
    paddingHorizontal: modules.BODY_HORIZONTAL / 2,
    paddingVertical: modules.BODY_HORIZONTAL / 2 - 2,
    borderRadius: modules.RADIUS / 2,
    borderColor: modules.BORDER,
    borderWidth: 1,
    ...fontSemiBold,
    marginRight: modules.BODY_HORIZONTAL / 2,
    alignItems: 'center'
  },
  settings: {
    marginVertical: modules.BODY_HORIZONTAL,
  },
  countryCode: {
    fontSize: modules.FONT_H5,
    paddingHorizontal: modules.BODY_HORIZONTAL / 3,
    paddingVertical: modules.BODY_HORIZONTAL / 2,
    ...fontSemiBold
  },
  phoneText: {
    color: modules.TEXT,
    fontSize: modules.FONT_H5,
    borderColor: modules.BORDER,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: modules.BODY_HORIZONTAL,
    paddingVertical: modules.BODY_HORIZONTAL - 2,
    borderRadius: modules.RADIUS / 2,
    ...fontLight,
    padding: 0,
    margin: 0,
  },
  passwordInput: {
    color: modules.TEXT,
    fontSize: modules.FONT_H5,
    borderColor: modules.BORDER_COLOR,
    borderWidth: 1,
    flex: 1,
    paddingHorizontal: modules.BODY_HORIZONTAL,
    paddingVertical: modules.BODY_HORIZONTAL,
    borderRadius: modules.RADIUS / 2,
    ...FontGSansSemiBold,
    padding: 0,
    margin: 0,
  },
  flag: {
    width: 24,
    height: 20
  },
  arrow: {
    fontSize: modules.FONT_H4,
    color: modules.SUB_TEXT,
    paddingLeft: modules.BODY_HORIZONTAL / 3
  },
  phone: {
    paddingTop: modules.BODY_HORIZONTAL,
    flexDirection: 'row',
    alignItems: 'center'
  },
  body: {
    paddingHorizontal: modules.BODY_HORIZONTAL,
  },
  rows: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1
  },
  displayName: {
    width: '100%',
    textAlign: 'center',
    fontSize: modules.FONT_H4,
    color: modules.TEXT,
    ...fontBold,
    marginTop: modules.BODY_HORIZONTAL
  },
  mobilePhone: {
    textAlign: 'center',
    ...fontSemiBold,
    color: modules.TEXT
  },
  testingType: {
    textAlign: 'center',
    ...fontSemiBold,
    color: modules.TEXT
  },
  level: {
    paddingBottom: modules.PADDING,
    marginTop: modules.BODY_HORIZONTAL_24,
  }
});
