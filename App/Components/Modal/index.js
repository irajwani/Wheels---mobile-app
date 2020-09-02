import React, {Component} from 'react';
import {
  View,
  Image as RNImage,
  Text,
  Modal as RNModal,
  StyleSheet,
} from 'react-native';

import Modal, {
  ModalContent,
  SlideAnimation,
  ModalTitle,
  ModalFooter,
  ModalButton,
} from 'react-native-modals';
import {Colors, Metrics, Helpers, Images, Fonts, Strings} from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

import DocModal from './DocModal';
import AuthButton from '../Button/AuthButton';
import TutorialList from '../List/TutorialList';

let {Close, BackArrow} = Images;

let Tutorial = [
  {
    image: Images.bikeSketchOne,
    text:
      'Search from a number of different socials going on around your city. Whatever your preference, Awitan has got you covered.',
  },
  {
    image: Images.bikeSketchTwo,
    text:
      'Host events and sessions to meet like minded Awitaners to broaden your circle. ',
  },
  {
    image: Images.bikeSketchThree,
    text: 'Some pretty bad description text.',
  },
];

const AuthModal = ({visible, isStatic = false, toggleModal, navToAuth, navToShop = true}) => (
  <RNModal animationType="slide" transparent={false} visible={visible}>
    <View style={styles.closeContainer}>
      {isStatic ? <BackArrow onPress={navToShop}/> : <Close onPress={toggleModal} />}
    </View>

    <View style={styles.modalHeader}>
      <RNImage source={Images.logo} style={styles.logo} />
      <Text style={styles.modalHeaderText}>{Strings.companyName}</Text>
    </View>

    <TutorialList data={Tutorial} />

    <View style={styles.modalFooter}>
      <AuthButton text={'Sign Up'} onPress={navToAuth} />
      <Text style={{...Fonts.style.normal}} onPress={navToAuth}>
        Already have an account? Sign In
      </Text>
    </View>
  </RNModal>
);

const CustomModal = ({visible, children}) => (
  <RNModal animationType="slide" transparent={false} visible={visible}>
    {children}
  </RNModal>
);

export {AuthModal, DocModal, CustomModal};

const styles = StyleSheet.create({
  closeContainer: {
    position: 'absolute',
    zIndex: 100,
    top: 2 * Metrics.baseMargin,
    left: Metrics.baseMargin,
  },

  modalHeader: {
    flex: 0.15,
    ...Helpers.center,
  },

  logo: {
    width: 40,
    height: 40,
  },

  modalHeaderText: {...Fonts.style.normal},

  modalContent: {
    flex: 0.6,
  },

  modalImage: {
    width: Metrics.screenWidth - 2 * Metrics.baseMargin,
    height: Metrics.screenHeight / 2,
  },

  modalText: {
    ...Fonts.style.normal,
  },

  modalFooter: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
