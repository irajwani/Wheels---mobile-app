import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import shadowStyles from '../../StyleSheets/shadowStyles'
import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';
import LinearGradient from 'react-native-linear-gradient';

let {Chip} = Images;

export default () => {

    return (
    
    <LinearGradient 
    style={styles.card}
    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
    locations={[0.5,0.9,1]}
    colors={[Colors.purple, Colors.silver, Colors.lightgrey]}
    >
        <View style={styles.headerContainer}>
            <Chip />
            <View>
                <Text style={styles.bank}>Meezan Bank</Text>
                <Text style={styles.name}>Khalid-bin-waleed road</Text>
            </View>
        </View>

        <View style={styles.bodyContainer}>
            <Text style={styles.account}>Account Number</Text>
            <Text style={styles.account}>0120-0103446061</Text>
            <Text style={styles.name}>Arshad Ghaffar</Text>
        </View>
        
    </LinearGradient>
    
)}

const styles = StyleSheet.create({
    card: {
        
        ...shadowStyles.accountCard,
        elevation: 1,
        width: Metrics.screenWidth - 2*Metrics.baseMargin,
        borderRadius: Metrics.mediumContainerRadius,
    },

        headerContainer: {
            flexDirection: 'row',
            flex: 0.25,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: Metrics.baseMargin,
        },

            bank: {
                ...Fonts.style.normal,
                fontWeight: "600",
                color: Colors.darkwhite,
                alignSelf: 'flex-end'
            },

        bodyContainer: {
            flex: 0.75,
            padding: Metrics.baseMargin
        },

            account: {...Fonts.style.normal, fontWeight: "500", letterSpacing: 1.5, color: Colors.silver, textShadowColor: Colors.grey, textShadowRadius: 1},

            name: {...Fonts.style.normal, color: Colors.darkwhite, fontWeight: "500"}



})
