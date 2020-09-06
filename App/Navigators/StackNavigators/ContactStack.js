import {createStackNavigator} from 'react-navigation-stack';

import Contact from '../../Containers/Contact';

import {StackStyles} from '../../Theme/NavigationStyles';

const ContactStack = createStackNavigator(
  {
    Contact: Contact,
  },
  {
    initialRouteName: 'Contact',
    ...StackStyles,
  },
);

export default ContactStack;
