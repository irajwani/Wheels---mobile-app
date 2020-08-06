import React from 'react';

import { createDrawerNavigator } from "react-navigation-drawer";

import ShopStack from "./StackNavigators/ShopStack";
import CartStack from "./StackNavigators/CartStack";


let DrawerNavigator = createDrawerNavigator({
  Shop: ShopStack,
  Cart: CartStack,
});

export default DrawerNavigator;
