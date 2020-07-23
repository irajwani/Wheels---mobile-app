import React, { Component } from 'react'
import { Text, View, FlatList, Animated, TouchableOpacity, StyleSheet } from 'react-native'

import UserCard from "../Card/UserCard"
import { Helpers, Fonts, Metrics } from '../../Theme';

const UsersList = ({data, onPress, style = null}) => (
    <Animated.FlatList 
        style={[styles.cardsContainer, style]}
        contentContainerStyle={styles.cardsContentContainer}
        data={data}
        showsVerticalScrollIndicator={true}
        renderItem={(item, index) => <UserCard user={item.item} onPress={() => onPress(item.item)} />}
        keyExtractor={(item, index) => index}
        numColumns={1}
    />
)

    
export default UsersList


const styles = StyleSheet.create({
    cardsContainer: {
        flex: 0.8,
        backgroundColor: '#fff',
    },
    cardsContentContainer: {
        // flex: 1,
        flexGrow: 1,
        paddingTop: 4,
        marginHorizontal: Metrics.baseMargin,
        alignItems: 'center'
        
    },

})
