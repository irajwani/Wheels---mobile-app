import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Images, Fonts, Metrics } from '../../Theme'

let {Check} = Images;

const CheckBox = ({onPress, checked, text}) => (
    <>
        <TouchableOpacity style={[styles.checkBox, checked ? {borderColor: Colors.primary} : null]} onPress={onPress}>
        {checked ?
                <View style={{position: 'absolute', alignSelf: 'center', }}>
                    <Check color={Colors.primary}/>
                </View>
                :
                null
        }
        </TouchableOpacity>
        
        <Text style={styles.text}>{text}</Text>
    </>
)

const styles = StyleSheet.create({

    checkBox: {

        width: 25,
        height: 25,
        borderRadius: Metrics.smallContainerRadius,
        borderColor: Colors.secondary,
        borderWidth: 1,
        backgroundColor: Colors.white,
        overflow: 'visible'
    },

        text: {
            ...Fonts.style.small,
            marginLeft: 10,
            alignSelf: 'center'
        }

})

export default CheckBox