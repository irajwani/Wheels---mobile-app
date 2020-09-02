import {createStackNavigator} from 'react-navigation-stack';

import Profile from '../../Containers/Profile';

import {StackStyles} from '../../Theme/NavigationStyles';

const ProfileStack = createStackNavigator(
  {
    Profile,
  },
  {
    initialRouteName: 'Profile',
    ...StackStyles,
  },
);

export default ProfileStack;
