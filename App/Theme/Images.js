import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import Iconisto from 'react-native-vector-icons/Fontisto'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import Colors from './Colors';

import * as Animatable from 'react-native-animatable';
import Fonts from './Fonts';
import Metrics from './Metrics';

const path = '../Assets/Images'
const AnimatableIcon = Animatable.createAnimatableComponent(Icon);
const AnimatableIconisto = Animatable.createAnimatableComponent(Iconisto);
const AnimatableSimpleIcon = Animatable.createAnimatableComponent(SimpleIcon);

const smallIcon = 16, mediumIcon = 24, largeIcon = 32;
// const 

export default {
  logo: require(`${path}/logo.png`),
  splashScreen: require(`${path}/Splashscreen.png`),
  
  menuBars: require(`${path}/menu-bars.png`),
  // backArrow: require(`${path}/white-arrow-back.png`),
  smallProfile: require(`${path}/smallProfile.jpg`),
  nothingHere: require(`${path}/nothing_here.png`),

  glass: require(`${path}/glass.png`),
  

  google: require(`${path}/Google.png`),

  bikeSketchOne: require(`${path}/bike-sketch-3.jpg`),
  bikeSketchTwo: require(`${path}/bike-sketch-2.png`),
  bikeSketchThree: require(`${path}/bike-sketch-4.png`),

  emptyCart: require(`${path}/empty-cart.png`),
  emptyWishList: require(`${path}/empty-wishlist.png`),
  

  //Tabs
  List: ({size, focused}) => (
    <Ionicon 
      name={"list-circle"}
      size={size}
      color={Colors.primary}
      
    />
  ),

  Book: ({size, focused, color = Colors.primary}) => (
    <SimpleIcon 
      name={focused ? 'book-open' : 'notebook'}
      size={size}
      color={color}
      
    />
  ),

  Create: ({size, focused}) => (
    <Icon 
      name={focused ? 'plus-circle' : 'plus-circle-outline'}
      size={size}
      color={Colors.primary}
      
    />
  ),

  Messages: ({size = smallIcon, focused, onPress=()=>{}}) => (
    <AntIcon 
      name={focused ? 'message1' : 'message1'}
      size={size}
      color={Colors.primary}
      onPress={onPress}
    />
  ),

  Profile: ({size, focused}) => (
    <Icon 
      name={focused ? 'account-circle' : 'account'}
      size={size}
      color={Colors.primary}
      
    />
  ),

  //Other Icons

  SideBar: ({onPress}) => (
    <SimpleIcon 
      name={'menu'}
      color={Colors.black}
      size={24}
      onPress={onPress}
    />
  ),

  Tune: () => (
    <Icon 
      name={'tune-vertical'}
      size={30}
      color={Colors.black}
      
    />
    
  ),

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

  Reward: () => (
    <Icon 
      name={'gift'}
      size={18}
      color={Colors.black}
      
    />
  ),

  BackArrow: ({onPress}) => (
    <SimpleIcon 
      name='arrow-left'
      size={largeIcon}
      color={Colors.black}
      onPress={onPress}
    />
    
  ),

  AnimatedBackArrow: ({color, onPress}) => (
    <AnimatableSimpleIcon
      name='arrow-left'
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

  PasswordsMatch: () => (
    <Icon 
      name='lock'
      size={30}
      color={Colors.secondary}
      
    />
  ),

  Plus: ({color = Colors.white, onPress=() => {}}) => (
    <Icon 
      name='plus'
      size={24}
      color={color}
      onPress={onPress}
    />
  ),

  AddImage: ({color = Colors.black, onPress}) => (
    <Icon 
      name='plus'
      size={24}
      color={color}
      onPress={onPress}
    />
  ),



  Close: ({onPress}) => <Icon name={'close'} size={30} color={Colors.black} onPress={onPress}/>,

  ChevronRight: () => (
    <Icon 
      name="chevron-right"
      size={Fonts.size.big}
      color={Colors.black}
    />
  ),

  Check: ({big = false, color = Colors.black}) => (
    <Icon
    name="check"
    size={big ? 32 : 22}
    color={color} 
    />
  ),

  Facebook: ({onPress}) => (
    <Icon 
      name='facebook'
      size={30}
      color={Colors.primary}
      onPress={onPress}
    />
  ),

  Google: ({onPress}) => (
    <Icon 
      name='google'
      size={30}
      color={Colors.primary}
      onPress={onPress}
    />
  ),

  AnimatedShare: ({onPress, color}) => (
    <AnimatableIcon 
      name='share-variant'
      size={32}
      style={{color: color}}
      onPress={onPress}
    />
  ),

  Star: ({size, focused, color = Colors.primary}) => (
    <Icon 
      name={focused ? 'star' : 'star-outline'}
      size={size}
      color={color}
      
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
      color={Colors.black}
      size={largeIcon}
      onPress={onPress}
    />
  ),

  Cart: ({onPress}) => (
    <EvilIcon 
      name={'cart'}
      color={Colors.black}
      size={largeIcon}
      onPress={onPress}
    />
  ),

  People: () => (
    <Ionicon 
      name={'ios-people'}
      color={Colors.secondary}
      size={30}
    />
  ),

  Plane: () => (
    <FeatherIcon
      name={'send'}
      color={Colors.primary}
      size={24}
    />
  ),

  Restart: ({onPress}) => (
    <Icon 
      name={'restart'}
      onPress={onPress}
      color={Colors.black}
      size={24}
    />
  ),



}