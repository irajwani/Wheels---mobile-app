import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Helpers, Images } from '../../Theme'
import shadowStyles from '../../StyleSheets/shadowStyles'

let {AnimatedHeart} = Images;
const LikeButton = ({text, onPress, inWishList}) => (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <AnimatedHeart
          filled={inWishList}
          onPress={onPress}
          color={inWishList ? Colors.red : Colors.black}
        />
        <Text style={[styles.text, {color: inWishList ? Colors.black : Colors.black}]}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        marginVertical: Metrics.baseMargin,
        marginLeft: Metrics.baseMargin,
        paddingHorizontal: 2*Metrics.baseMargin,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderTopLeftRadius: Metrics.mediumContainerRadius,
        borderBottomLeftRadius: Metrics.mediumContainerRadius,
        backgroundColor: Colors.lightgrey,
        ...shadowStyles.button,
        elevation: 1,
        position: 'absolute',
        left: 2*Metrics.baseMargin,
        zIndex: 1,
        
    },

    text: {
        ...Fonts.style.normal,
    }
})

export default LikeButton
