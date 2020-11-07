import React from 'react';

import {View, Text, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Iconisto from 'react-native-vector-icons/Fontisto';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import Octicon from 'react-native-vector-icons/Octicons';
import Colors from './Colors';

import * as Animatable from 'react-native-animatable';
import Fonts from './Fonts';
import Metrics from './Metrics';
import Helpers from './Helpers';

const path = '../Assets/Images';
const AnimatableIcon = Animatable.createAnimatableComponent(Icon);
const AnimatableIconisto = Animatable.createAnimatableComponent(Iconisto);
const AnimatableSimpleIcon = Animatable.createAnimatableComponent(SimpleIcon);
const AnimatableIonicon = Animatable.createAnimatableComponent(Ionicon);

const smallIcon = 16,
  mediumIcon = 24,
  largeIcon = 36;
// const

export default {
  logo: require(`${path}/logo.png`),
  // splashScreen: require(`${path}/logo.jpeg`),

  wheel: require(`${path}/wheel-size.png`),
  menuBars: require(`${path}/menu-bars.png`),
  // backArrow: require(`${path}/white-arrow-back.png`),
  smallProfile: require(`${path}/smallProfile.jpg`),
  nothingHere: require(`${path}/nothing_here.png`),

  glass: require(`${path}/glass.png`),

  google: require(`${path}/Google.png`),

  bikeSketchOne: require(`${path}/bike-sketch-3.jpg`),
  bikeSketchTwo: require(`${path}/bike-sketch-2.png`),
  bikeSketchThree: require(`${path}/bike-sketch-4.png`),

  map: require(`${path}/map.png`),
  emptyCart: require(`${path}/empty-cart-2.jpg`),
  emptyWishList: require(`${path}/empty-wishlist.png`),

  delivery: require(`${path}/delivery.jpg`),

  //Tabs
  Shop: ({color}) => (
    <Iconisto name={'shopping-store'} size={mediumIcon} color={color} />
  ),

  Profile: ({color}) => (
    <Icon
      name={'account-circle'}
      size={largeIcon}
      color={color}
    />
  ),

  People: ({color}) => (
    <Ionicon name={'ios-people'} color={color} size={largeIcon} />
  ),

  //Other Icons

  SideBar: ({onPress, color}) => (
    <SimpleIcon
      name={'menu'}
      color={color}
      size={24}
      onPress={onPress}
    />
  ),

  Email: () => <Iconisto name={'email'} size={smallIcon} color={Colors.white} />,
  
  Phone: () => <SimpleIcon name={'screen-smartphone'} size={smallIcon} color={Colors.white} />,

  Address: () => <Ionicon name={'location-outline'} size={smallIcon} color={Colors.white} />,

  Success: () => <Ionicon name={'checkmark-circle-outline'} size={2*largeIcon} color={Colors.primary} />,

  Tune: () => <Icon name={'sort'} size={mediumIcon} color={Colors.black} />,

  Trash: ({onPress}) => (
    <Ionicon
      name={'trash-outline'}
      size={mediumIcon}
      color={Colors.black}
      onPress={onPress}
    />
  ),

  Settings: ({onPress}) => (
    <FeatherIcon
      name={'settings'}
      color={Colors.black}
      size={24}
      onPress={onPress}
    />
  ),

  Account: ({plus = false}) => (
    <Icon
      name={`account${plus ? '-plus' : ''}`}
      size={30}
      color={Colors.secondary}
    />
  ),  

  Info: ({onPress}) => (
    <AntIcon
      name={'infocirlceo'}
      color={Colors.white}
      size={mediumIcon}
      onPress={onPress}
    />
  ),


  BackArrow: ({onPress = () => {}, color = Colors.black}) => (
    <AnimatableIonicon
      name="return-up-back"
      size={mediumIcon}
      color={color}
      onPress={onPress}
    />
  ),

  AnimatedBackArrow: ({color, onPress}) => (
    <AnimatableIonicon
      name="return-up-back"
      size={largeIcon}
      style={{color}}
      onPress={onPress}
    />
  ),

  Eye: ({off = false}) => (
    <Icon
      name={!off ? 'eye' : 'eye-off'}
      size={20}
      color={!off ? Colors.primary : Colors.secondary}
    />
  ),

  PasswordsMatch: () => <Icon name="lock" size={30} color={Colors.secondary} />,

  Plus: ({color = Colors.white, onPress = () => {}}) => (
    <Icon name="plus" size={24} color={color} onPress={onPress} />
  ),

  AddImage: ({color = Colors.black, onPress}) => (
    <Icon name="plus" size={24} color={color} onPress={onPress} />
  ),

  Close: ({onPress}) => (
    <Icon name={'close'} size={30} color={Colors.black} onPress={onPress} />
  ),

  ChevronRight: () => (
    <Icon name="chevron-right" size={largeIcon} color={Colors.white} />
  ),

  ChevronDown: () => (
    <Icon name="chevron-down" size={largeIcon} color={Colors.black} />
  ),

  Check: ({big = false, color = Colors.black}) => (
    <Icon name="check" size={big ? 32 : 22} color={color} />
  ),

  Facebook: ({onPress}) => (
    <Icon name="facebook" size={30} color={Colors.primary} onPress={onPress} />
  ),

  Google: ({onPress}) => (
    <Icon name="google" size={30} color={Colors.primary} onPress={onPress} />
  ),

  AnimatedShare: ({onPress, color}) => (
    <AnimatableIcon
      name="share-variant"
      size={32}
      style={{color: color}}
      onPress={onPress}
    />
  ),

  Edit: ({onPress}) => (
    <FeatherIcon
      name={'edit-3'}
      color={Colors.primary}
      size={24}
      onPress={onPress}
    />
  ),

  Heart: ({filled, onPress}) => (
    <Ionicon
      name={filled ? 'heart' : 'heart-outline'}
      color={Colors.red}
      size={largeIcon}
      onPress={onPress}
    />
  ),

  AnimatedHeart: ({filled, color, onPress}) => (
    <AnimatableIonicon
      name={filled ? 'heart' : 'heart-outline'}
      color={color}
      size={largeIcon}
      onPress={onPress}
    />
  ),

  Bike: () => (
    <Icon name="bike-fast" size={1.3 * largeIcon} color={Colors.primary} />
  ),

  SlowBike: () => (
    <Iconisto name="bicycle" size={2.4 * largeIcon} color={Colors.primary} />
  ),

  Cart: ({onPress = () => {}, color = Colors.black}) => (
    <EvilIcon
      name={'cart'}
      color={color}
      size={largeIcon}
      onPress={onPress}
    />
  ),


  CartButton: ({onPress = () => {}, color = Colors.black, inCart}) => (
    <Icon
      name={`cart-${inCart ? 'remove' : 'plus'}`}
      color={inCart ? Colors.red : Colors.primary}
      size={largeIcon}
      onPress={onPress}
    />
  ),

  Plane: () => <FeatherIcon name={'send'} color={Colors.primary} size={24} />,

  Restart: ({onPress}) => (
    <Icon name={'restart'} onPress={onPress} color={Colors.black} size={24} />
  ),

  Chip: () => (
    <Ionicon name={'hardware-chip-outline'} color={Colors.darkwhite} size={mediumIcon} />
  ),

  DeliveryBadge: ({freeDelivery}) => (
    <View
      style={{
        width: 60,
        height: 40,
        backgroundColor: Colors.lightgrey,
        borderRadius: Metrics.smallContainerRadius,
        ...Helpers.center,
      }}>
      {!freeDelivery && (
        <View
          style={{
            position: 'absolute',
            zIndex: 1000,
            alignSelf: 'center',
            
          }}>
          <FeatherIcon name={'slash'} color={Colors.error} size={largeIcon} />
        </View>
      )}
      <Icon name={'truck-fast'} color={Colors.black} size={mediumIcon} />

      <Text style={{...Fonts.style.tiny}}>Free Delivery</Text>
    </View>
  ),

  Divider: () => (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        width: Metrics.screenWidth - 2 * Metrics.baseMargin,
        backgroundColor: Colors.grey,
        marginVertical: Metrics.baseMargin
      }}
    />
  ),
};
