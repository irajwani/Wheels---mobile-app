import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Helpers } from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles'

const AuthButton = ({text, onPress, disabled, extraStyles, textStyles}) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, extraStyles]}>
        <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        ...Helpers.center,
        backgroundColor: Colors.primary, 
        width: Metrics.screenWidth/1.5,
        padding: 10, 
        borderRadius: Metrics.screenWidth/3,
        ...shadowStyles.whiteCard,
        alignSelf: 'center',
        
    },

    text: {
        ...Fonts.style.normal,
        fontWeight: "500",
        color: "#fff"
    }
})

export default AuthButton
