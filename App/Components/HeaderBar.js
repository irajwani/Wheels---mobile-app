import React from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import { logoGreen } from "../colors";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Images, Colors, Fonts, Metrics, Helpers } from '../Theme';

let {BackArrow} = Images;

const HeaderBar = ({customFlex,navigation,hideCross}) => (
    <View style={[styles.headerContainer, {flex: customFlex ? customFlex : 0.1}]}>
        
        <FontAwesomeIcon
        name='arrow-left'
        size={28}
        color={"black"}
        onPress={()=>navigation.goBack()}
        />

        <Image style={styles.logo} source={Images.logo}/>
              
        <FontAwesomeIcon
        name='close'
        size={28}
        color={hideCross ? logoGreen : 'black'}
        onPress={()=>navigation.goBack()}
        />
          
    </View>
)

const TabHeader = ({text, button = false}) => (
    <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderText}>{text}</Text>
        {button && button()}
    </View>
)

const ChatHeader = ({onPress, onNamePress, name}) => (
    <View style={styles.chatHeader}>
        <View style={{flex: 0.2}}>
            <BackArrow onPress={onPress}/>
        </View>
        
        <View style={{flex: 0.6, ...Helpers.center}}>
            <Text onPress={onNamePress} style={{...Fonts.style.normal, fontWeight: "500", color: Colors.black}}>{name}</Text>
        </View>
        
        <View style={{flex: 0.2}}/>
    </View>
)

export {HeaderBar, TabHeader, ChatHeader}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.secondary,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 12,
    },

    logo: {
        width: 50,
        height: 50,
    },

    tabHeader: {
        // position: "relative",
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingHorizontal: Metrics.baseMargin,
        borderBottomColor: Colors.primary,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

        tabHeaderText: {
            ...Fonts.style.medium,
            color: Colors.black,
            fontWeight: "bold"

        },

    chatHeader: {
        backgroundColor: 'transparent',
        flexDirection: "row",
        position: "absolute",zIndex: 1,
        width: Metrics.screenWidth,
        flex: 0.1,

        padding: Metrics.baseMargin,
        alignItems: 'center',
        // justifyContent: 'space-between',
    }
})