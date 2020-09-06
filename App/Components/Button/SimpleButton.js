import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Helpers } from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles'

const SimpleButton = ({text, onPress, disabled = false, extraStyles, textStyles}) => (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={[styles.button, {backgroundColor: disabled ? Colors.lightgrey : Colors.white}, extraStyles]}>
        <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        ...Helpers.center,
        padding: Metrics.baseMargin, 
        borderRadius: Metrics.smallContainerRadius,
        borderWidth: 0.7,
        borderColor: Colors.black,
        // ...shadowStyles.whiteCard,
        
    },

    text: {
        ...Fonts.style.normal,
        fontWeight: "500",
        color: Colors.black
    }
})

export default SimpleButton
