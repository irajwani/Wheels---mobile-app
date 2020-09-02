import React from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { Colors, Helpers } from '../../Theme'

const Container = ({children, style = null, center = null} ) => (
    <SafeAreaView style={[styles.container, style ? style : null, center ? {...Helpers.center} : null]}>
        {children}
    </SafeAreaView>
)

export const ScrollContainer = ({children}) => (
    <ScrollView style={styles.container}>
        {children}
    </ScrollView>
)

export const DismissKeyboardView = ({style, children}) => (
    <TouchableWithoutFeedback
    style={style ? style : null} 
    onPress={() => {
        Keyboard.dismiss();
        console.log('dismiss keyboard');
        }}>
        {children}
    </TouchableWithoutFeedback>
  )

export default Container;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    }
})
