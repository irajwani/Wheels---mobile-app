import {createStackNavigator} from 'react-navigation-stack';

import Cart from '../../Containers/Cart';

import {StackStyles} from '../../Theme/NavigationStyles';

const ShopStack = createStackNavigator(
  {
    Cart,
  },
  {
    initialRouteName: 'Cart',
    ...StackStyles,
  },
);

export default CartStack;
