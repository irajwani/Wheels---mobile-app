import { createStackNavigator } from 'react-navigation-stack';


import Welcome from '../../Containers/Welcome';
import SelectPictures from '../../Components/SelectPictures';


import { StackStyles } from '../../Theme/NavigationStyles';

const AuthStack = createStackNavigator({
    Welcome,
    SelectPictures,
},
{   
    initialRouteName: 'Welcome',
    ...StackStyles
}
)

export default AuthStack

