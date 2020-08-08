import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

import {Images, Colors, Helpers, Fonts, Metrics} from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';

let {Explore} = Images;

const FieldInput = ({
  label,
  value,
  placeholder,
  onChangeText,
  color = Colors.black,
  maxLength = false,
  multiline = false,
  keyboardType = 'default',
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput
      style={[styles.input, { height: !multiline ? 50 : 100}]}
      placeholder={placeholder}
      placeholderTextColor={Colors.white}
      onChangeText={onChangeText}
      value={value}
      multiline={multiline}
      autoCorrect={false}
      autoCapitalize={'none'}
      clearButtonMode={'while-editing'}
      underlineColorAndroid={'transparent'}
      keyboardType={keyboardType ? keyboardType : 'default'}
    />
  </View>
);

export default FieldInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: Metrics.baseMargin,
  },

  labelContainer: {
    position: 'absolute',
    top: -12,
    right: 10,
    borderWidth: 0.4,
    borderColor: Colors.lightgrey,
    borderRadius: Metrics.smallContainerRadius,
    backgroundColor: Colors.white,
    zIndex: 2,
    padding: Metrics.baseMargin / 2,
  },
  label: {
    ...Fonts.style.small,
  },

  input: {
    backgroundColor: Colors.lightgrey,
    borderRadius: Metrics.smallContainerRadius,
    // width: Metrics.screenWidth - Metrics.baseMargin * 2,
    // ßmarginBottom: 0,
    padding: Metrics.baseMargin / 2,
    ...Fonts.style.normal,
    color: Colors.black,
  },
});
