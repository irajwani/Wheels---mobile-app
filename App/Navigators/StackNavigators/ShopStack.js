import {createStackNavigator} from 'react-navigation-stack';

import Shop from '../../Containers/Shop';
import Product from '../../Containers/Product';

import {StackStyles} from '../../Theme/NavigationStyles';

const ShopStack = createStackNavigator(
  {
    Shop,
    Product,
  },
  {
    initialRouteName: 'Shop',
    ...StackStyles,
  },
);

export default ShopStack;
