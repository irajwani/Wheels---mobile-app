import React, { Component } from 'react'
import { TextInput, Text, View, StyleSheet,  } from 'react-native'

import { Images, Colors, Helpers, Fonts} from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';

let {Explore} = Images;

const SearchInput = ({value, placeholder, onChangeText}) => (
    <View style={styles.searchContainer}>
        <View style={{flex: 0.2, ...Helpers.center}}>
            <Explore size={32} focused/>       
            
        </View>
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
    </View>
)

export default SearchInput;


const styles = StyleSheet.create({
    searchContainer: {
        ...shadowStyles.whiteCard,
        ...borderStyles.thinBorder,
        backgroundColor: Colors.white,
        flexDirection: 'row',

    },

    inputStyle: {
        flex: 0.8,
        height: 50,marginBottom: 0, padding: 10, ...Fonts.style.normal,
    }
})
