import React, { Component } from 'react'
import { Text, View, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native'

import EventCard from "../Card/EventCard"
import { Helpers, Fonts, Metrics } from '../../Theme';

const DataList = ({data, onPress, journal, handlePin, style = null}) => (
    <Animated.FlatList 
        style={[styles.cardsContainer, style]}
        contentContainerStyle={styles.cardsContentContainer}
        data={data}
        showsVerticalScrollIndicator={true}
        renderItem={(item, index) => <EventCard event={item.item} index={index} onPress={() => onPress(item.item)} inJournal={journal.includes(item.item.id) ? true : false} handlePin={handlePin} />}
        keyExtractor={(item, index) => index}
        numColumns={2}
        ListEmptyComponent={() => (
            <View style={{...Helpers.center}}>
                <Text style={{...Fonts.style.normal}}>Such empty, much wow!</Text>
            </View>
        )}
    />
)

    
export default DataList


const styles = StyleSheet.create({
    cardsContainer: {
        flex: 0.8,
        backgroundColor: '#fff',
        
        
        marginTop: Metrics.baseMargin,
        marginHorizontal: Metrics.baseMargin/2,
    },
    cardsContentContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        // flexGrow: 1,
        
        justifyContent: 'center'
        
    },

    

    vendorName: {
        ...Fonts.style.h2,
        
    }
})
