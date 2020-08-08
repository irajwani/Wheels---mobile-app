import React, { Component } from 'react'
import { TextInput, Text, View, StyleSheet,  } from 'react-native'

import { Images, Colors, Helpers, Fonts, Metrics} from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';

let {Explore} = Images;

const SearchInput = ({value, placeholder, onChangeText}) => (
    
        
        <TextInput 
            style={[styles.inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={Colors.secondary}
            onChangeText={onChangeText}
            value={value}
            multiline={false}
            autoCorrect={false}
            autoCapitalize={'none'}
            clearButtonMode={'while-editing'}
            underlineColorAndroid={"transparent"}
            keyboardType={'default'}
            />
    
)

export default SearchInput;


const styles = StyleSheet.create({

    inputStyle: {
        backgroundColor: Colors.lightgrey,
        borderTopLeftRadius: Metrics.smallContainerRadius,
        borderBottomLeftRadius: Metrics.smallContainerRadius,
        flex: 0.8,
        height: 50,marginBottom: 0, padding: 10, ...Fonts.style.normal,
    }
})
