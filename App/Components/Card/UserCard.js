import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import ProgressiveImage from '../ProgressiveImage';

import shadowStyles from '../../StyleSheets/shadowStyles'
import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';


export default ({user, onPress}) => {

    return (
    
    <TouchableOpacity 
    style={styles.userContainer} onPress={onPress}
    underlayColor={'transparent'}
    >
        <View style={styles.imageContainer}>
            <ProgressiveImage source={{uri: user.profile.photoUrl}} thumbnailSource={Images.blur} style={styles.image}/>
        </View>

        <View style={styles.userNameContainer}>
            <Text style={{...Fonts.style.normal}}>{user.profile.displayName}</Text>
        </View>
        
    </TouchableOpacity>
    
)}

const styles = StyleSheet.create({
    userContainer: {
        margin: Metrics.baseMargin,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        ...shadowStyles.thinWhiteCard,
        elevation: 1,
        width: Metrics.screenWidth - 2*Metrics.baseMargin,
        borderWidth: 1, 
        borderColor: Colors.secondary,
        borderRadius: 15
    },

        imageContainer: {
            flex: 0.25,
            ...Helpers.center,
            paddingVertical: Metrics.baseMargin/2,
            borderRightColor: Colors.secondary,
            borderRightWidth: 1,
        },

            image: {
                width: 40,
                height: 40,
                borderRadius: 20,

            },

        userNameContainer: {
            flex: 0.75,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Metrics.baseMargin*2
        },

})
