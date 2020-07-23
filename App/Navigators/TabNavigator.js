import React from 'react';

import {createBottomTabNavigator} from 'react-navigation-tabs'; // Version can be specified in package.json

import HomeStack from './StackNavigators/HomeStack';
import CreateStack from './StackNavigators/CreateStack';

import {Colors, Images} from '../Theme';

let {List, Create} = Images;

let iconName;
let iconSize = 25;

HomeStack.navigationOptions = {
  tabBarLabel: 'Claims',
  tabBarIcon: ({focused, tintColor}) => {
    iconSize = focused ? 30 : 25;
    return <List size={iconSize} focused={focused} />;
  },
};

CreateStack.navigationOptions = {
  tabBarLabel: 'Create',
  tabBarIcon: ({focused, tintColor}) => {
    iconSize = focused ? 30 : 25;
    return <Create size={iconSize} focused={focused} />;
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Create: CreateStack,
  },
  {
    // tabBarComponent: TabBarBottom,
    // tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.secondary,
      showIcon: true,
      showLabel: true,
    },
    animationEnabled: true,
    // swipeEnabled: false,
  },
);

export default TabNavigator;
