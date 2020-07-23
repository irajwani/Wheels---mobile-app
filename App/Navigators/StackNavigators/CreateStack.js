import {createStackNavigator} from 'react-navigation-stack';

import Create from '../../Containers/Create';
import SelectPictures from '../../Components/SelectPictures';
import Camera from '../../Components/SelectPictures/Camera';
import {StackStyles} from '../../Theme/NavigationStyles';

const HomeStack = createStackNavigator(
  {
    Create,
    SelectPictures,
    Camera,
  },
  {
    initialRouteName: 'Create',
    ...StackStyles,
  },
);

export default HomeStack;
