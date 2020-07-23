import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'


import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import shadowStyles from '../../StyleSheets/shadowStyles'
import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';
import Utils from '../../Utils';
import Badges from '../Badges';

let {Pin} = Images;
let {PrivateBadge} = Badges;

export default ({event, index, onPress, inJournal, handlePin}) => {
    
    return (
    
    <TouchableOpacity 
    style={[
        styles.card, 
        index % 2 != 0 ? {marginLeft: Metrics.baseMargin/2} : null
        ]} 
    onPress={onPress}
    underlayColor={'transparent'}
    >
        <View style={styles.imageContainer}>
            {/* <ProgressiveImage source={Images.nothingHere} thumbnailSource={Images.blur} style={styles.image}/> */}

            {event.isPrivate && <PrivateBadge />}
            <Image 
            source={{uri: event.photoURL}}  
            indicator={ProgressBar} 
            indicatorProps={{
                borderWidth: 1,
                borderColor: Colors.primary,
                borderRadius: Metrics.baseMargin,
                color: Colors.primary,
                unfilledColor: Colors.white,
                alignSelf: 'center'
            }} 
            style={styles.image}
            />
        </View>

        <View style={styles.bodyContainer}>
            
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{event.name.length < 16 ? event.name : event.name.substring(0,13) + "..."}</Text>
                    <Text style={styles.time}>{Utils.easyTime(event.time)}</Text>
                </View>

                <View style={styles.iconContainer}>
                    <Pin filled={inJournal} onPress={()=>handlePin(event.id, inJournal)}/>
                </View>

            
            {/* <View style={{flex: 0.5}}>
                <Text style={styles.description}>{event.description}</Text>
            </View> */}
            

            
            
        </View>
        
    </TouchableOpacity>
    
)}

let cardWidth = (Metrics.screenWidth - 1.5*Metrics.baseMargin)/2;

const styles = StyleSheet.create({
    card: {
        width: cardWidth,
        // paddingBottom: 5,
        // height: 200,
        // height: Metrics.screenHeight/3,
        // flex: 0.33,
        ...shadowStyles.thinWhiteCard,
        backgroundColor: 'white',
        marginBottom: Metrics.baseMargin/2,
        // marginHorizontal: Metrics.baseMargin/2
        // alignSelf: 'center'
        
        
    },

    imageContainer: {
        flex: 0.55,
        // ...Helpers.center,
        // ...borderStyles.mediumBottomBorder
    },
        image: {
            width: cardWidth,
            height: 105,
        },

    bodyContainer: {
        flex: 0.45,
        flexDirection: 'row',
        paddingTop: Metrics.baseMargin/2,
        paddingHorizontal: Metrics.baseMargin,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.secondary,
        

    },
        detailsContainer: {
            flex: 0.8,
            marginBottom: Metrics.baseMargin/2
        },

            name: {
                ...Fonts.style.normal,
                fontWeight: "bold"
            },

            time: {
                ...Fonts.style.small,
                fontWeight: "400",
                marginTop: Metrics.baseMargin/2
            },

        iconContainer: {
            flex: 0.2,
            justifyContent: 'flex-start',
            alignItems: 'flex-end'
        },

            

       descriptionContainer: {
            flex: 0.2,
            justifyContent: 'flex-end',
            marginTop: Metrics.baseMargin/2,
        },

            description: {
                ...Fonts.style.small,
                fontWeight: "300",
            },

        button: {
            width: 90,
            ...Helpers.center,
            ...shadowStyles.whiteCard,
            
            borderRadius: 20,
            padding: 5

        },

                buttonText: {
                    ...Fonts.style.small,
                    color: Colors.white,
                    fontWeight: "600"
                }


})
