import {createStackNavigator} from 'react-navigation-stack';

import Home from '../../Containers/Home';
import SelectPictures from '../../Components/SelectPictures';
import Camera from '../../Components/SelectPictures/Camera';
import {StackStyles} from '../../Theme/NavigationStyles';

const HomeStack = createStackNavigator(
  {
    Home,
    SelectPictures,
    Camera,
  },
  {
    initialRouteName: 'Home',
    ...StackStyles,
  },
);

export default HomeStack;
