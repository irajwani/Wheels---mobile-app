import React from 'react';

import {Modal as RNModal, StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
import { Metrics, Colors, Helpers, Fonts, Images } from '../../Theme';

let {Close} = Images;

const DocModal = ({visible, toggleModal, title, doc, buttonRow = false, secondButtonRow}) => (
    <RNModal
        animationType="slide"
        transparent={false}
        visible={visible}
        
    >
    <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
            <View style={styles.closeContainer}>
                <Close onPress={toggleModal}/>
            </View>
            <Text style={styles.modalHeaderText}>{title}</Text>
        </View>
        <ScrollView style={styles.modalScroll} contentContainerStyle={styles.modalScrollContent}>
            {doc()}
        </ScrollView>

        <View style={styles.modalFooter}>
            {buttonRow && buttonRow()}
            {secondButtonRow()}
        </View>


    </SafeAreaView>
    </RNModal>
)

export default DocModal;

const styles = StyleSheet.create({
    modal: {
        marginTop: 2*Metrics.baseMargin,
        backgroundColor: Colors.primary,
        borderTopLeftRadius: Metrics.containerRadius,
        borderTopRightRadius: Metrics.containerRadius,
        height: Metrics.screenHeight,
        
    },

        modalHeader: {
            flex: 0.15,
            flexDirection: 'row',
            ...Helpers.center,
            ...Helpers.thinBottomBorder,
            marginHorizontal: Metrics.baseMargin
        },

            closeContainer: {
                position: "absolute",
                zIndex: 999,
                top: Metrics.baseMargin,
                left: Metrics.baseMargin/2
            },

            modalHeaderText: {
                ...Fonts.style.small,
                fontWeight: "bold",
                
            },

        modalScroll: {
            flex: 0.45
        },

        modalScrollContent: {
            margin: Metrics.baseMargin
        },

            doc: {
                ...Fonts.style.normal,
            },


        modalFooter: {
            flex: 0.4,
        }
})