import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { Colors, Metrics, Helpers, Fonts } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

const CustomModal = ({ title, visible, toggleModal, actionText, onPress, children}) => (
    <Modal
        rounded={true}
        modalStyle={styles.modal}
        modalTitle={<Text style={styles.modalTitle}>{title}</Text>}
        visible={visible}
        onTouchOutside={toggleModal}
        modalAnimation={new SlideAnimation({
        slideFrom: 'top',
        })}
        swipeDirection={['up', 'down', 'left', 'right']}
        swipeThreshold={100} 
        onSwipeOut={toggleModal}
        footer={
        <ModalFooter bordered={true} style={styles.modalFooter}>
        <ModalButton
            text="Cancel"
            style={{backgroundColor: Colors.white}}
            textStyle={[styles.modalFooterText, {color: Colors.secondary}]}
            onPress={toggleModal}
        />
        <ModalButton
            text={actionText}
            style={{backgroundColor: Colors.white}}
            textStyle={styles.modalFooterText}
            onPress={onPress}
        />
        </ModalFooter>
        }
    >
        <ModalContent>
            {children}
        </ModalContent>
    </Modal>
)

export default CustomModal;

const styles = StyleSheet.create({
    modal: {
        width: Metrics.screenWidth - Metrics.baseMargin*2,
        backgroundColor: Colors.white,
        ...Helpers.thinColorBorder,
        ...shadowStyles.whiteCard,
        margin: Metrics.baseMargin
    },

        modalTitle: {
            ...Fonts.style.big,
            paddingVertical: Metrics.baseMargin,
            textAlign: 'center',
            color: Colors.primary
        },

        modalFooter: {
            backgroundColor: Colors.secondary,
        },

            modalFooterText: {...Fonts.style.medium, color: Colors.primary},
})
