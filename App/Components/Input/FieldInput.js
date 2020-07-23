import React, { Component } from 'react'
import { TextInput, Text, View, StyleSheet,  } from 'react-native'

import { Images, Colors, Helpers, Fonts, Metrics} from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';

let {Explore} = Images;

const FieldInput = ({value, placeholder, onChangeText, color = Colors.primary, maxLength = false, multiline = false, keyboardType = 'default'}) => (
    
        
        <TextInput 
            style={[styles.inputStyle, {color, height: !multiline ? 50 : 100}]}
            placeholder={placeholder}
            placeholderTextColor={Colors.lightgrey}
            onChangeText={onChangeText}
            value={value}
            multiline={multiline}
            autoCorrect={false}
            // autoCapitalize={'none'}
            // clearButtonMode={'while-editing'}
            underlineColorAndroid={"transparent"}
            maxLength={maxLength}
            keyboardType={keyboardType}
            numberOfLines={multiline ? 3 : 1}
            scrollEnabled={multiline}
        />
    
)

export default FieldInput;


const styles = StyleSheet.create({

    inputStyle: {
        width: Metrics.screenWidth - Metrics.baseMargin*2,
        // ßmarginBottom: 0, 
        
        ...Fonts.style.normal,
    }
})
