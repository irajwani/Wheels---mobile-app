import React, { useState } from 'react';

import {View, ScrollView, FlatList, TouchableOpacity, Text} from 'react-native';

import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";

import auth from '@react-native-firebase/auth';

import ShopStack from "./StackNavigators/ShopStack";
import CartStack from "./StackNavigators/CartStack";
import ProfileStack from "./StackNavigators/ProfileStack";
import Container from '../Components/Container';
import { Metrics, Colors, Fonts, Images } from '../Theme';
import NavigationService from '../Services/NavigationService';

let { Shop, Profile, Cart } = Images;


let DrawerNavigator = createDrawerNavigator(
  {
    Shop: ShopStack,
    Cart: CartStack,
    Profile: ProfileStack,
  },
  {
    contentComponent: Drawer,
  },
);

let menu = [
  {icon: (color) => <Shop color={color} />, name: 'Shop'},
  {icon: (color) => <Cart color={color} />, name: 'Cart'},
  {icon: (color) => <Profile color={color} />, name: 'Profile'},
]



function Drawer(props) {

  let [currentScreen, changeScreen] = useState('Shop');

  return (
    <Container style={{backgroundColor: Colors.offwhite}}>
      <FlatList 
        data={menu}
        style={{margin: Metrics.baseMargin}}
        contentContainerStyle={{}}
        renderItem={({item}) => {
          let isCurrent = currentScreen == item.name;
          return (
          <TouchableOpacity 
          onPress={() => {
            changeScreen(item.name);
            props.navigation.navigate(item.name)
          }} 
          style={[{flexDirection: 'row', alignItems: 'center', marginVertical: Metrics.baseMargin, padding: Metrics.baseMargin, borderRadius: Metrics.smallContainerRadius, backgroundColor: isCurrent ? Colors.lightgrey : "transparent"}]}>
            {item.icon(isCurrent ? Colors.black : Colors.grey)}
            <Text style={{...Fonts.style.big, marginLeft: Metrics.baseMargin, color: isCurrent ? Colors.black : Colors.grey}}>{item.name}</Text>
          </TouchableOpacity>
        )}}
      />
    </Container>
  )
}


{/* <DrawerItems {...props}/> */}


export default DrawerNavigator;
