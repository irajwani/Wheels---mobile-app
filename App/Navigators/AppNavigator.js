import { createAppContainer } from 'react-navigation'

import SplashScreen from '../Containers/SplashScreen'

import DrawerNavigator from './DrawerNavigator'
import AuthStack from './StackNavigators/AuthStack'

import { StackStyles } from '../Theme/NavigationStyles'
import { createStackNavigator } from 'react-navigation-stack'

const RootStack = createStackNavigator(
  {
      SplashScreen,
      AppStack: DrawerNavigator,
      AuthStack
  },
  {
    initialRouteName: 'SplashScreen',
    ...StackStyles
  }
)

export default createAppContainer(RootStack)
