import { createStackNavigator } from 'react-navigation-stack';


import Welcome from '../../Containers/Welcome';
import SelectPictures from '../../Components/SelectPictures';
import Camera from '../../Components/SelectPictures/Camera';

import { StackStyles } from '../../Theme/NavigationStyles';

const AuthStack = createStackNavigator({
    Welcome,
    SelectPictures,
    Camera
},
{   
    initialRouteName: 'Welcome',
    ...StackStyles
}
)

export default AuthStack

