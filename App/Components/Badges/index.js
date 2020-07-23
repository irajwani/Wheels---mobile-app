import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Fonts, Colors, Metrics, Helpers } from '../../Theme';

const PrivateBadge = () => (

    <View style={styles.topRightHover}>
        <Text style={{...Fonts.style.small, color: Colors.white, fontWeight: "bold" }}>Private</Text>
    </View>
)

let styles = StyleSheet.create({
    topRightHover: {
        position: "absolute",
        zIndex: 999,
        top: Metrics.baseMargin,
        right: Metrics.baseMargin,
        ...Helpers.center,
        backgroundColor: Colors.primary,
        padding: Metrics.baseMargin
    },


})

export default {
    PrivateBadge,
}
