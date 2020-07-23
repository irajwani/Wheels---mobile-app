import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Images, Fonts, Metrics } from '../../Theme'

let {Check} = Images;

const CheckBox = ({onPress, checked, text}) => (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.checkBox, checked ? {borderColor: Colors.primary} : null]} onPress={onPress}/>
        {checked ?
                <View style={{position: 'absolute', zIndex: 1000, alignSelf: 'center'}}>
                    <Check big color={Colors.primary}/>
                </View>
                :
                null
        }
        <Text style={styles.text}>{text}</Text>
    </View>
)

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        marginBottom: Metrics.baseMargin,
        alignItems: 'center'
    },
    checkBox: {

        width: 24,
        height: 24,
        borderRadius: 5,
        borderColor: Colors.secondary,
        borderWidth: 0.5,
        backgroundColor: Colors.white,
        overflow: 'visible'
    },

        text: {
            ...Fonts.style.normal,
            color: Colors.primary,
            marginLeft: 10,
            textTransform: 'capitalize'
        }

})

export default CheckBox