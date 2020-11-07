import React, { Component } from "react";
import { Provider } from "react-redux";
import "./Config/ReactotronConfig";
import { PersistGate } from "redux-persist/lib/integration/react";
import createStore from "./Stores";
import RootScreen from "./Containers/Root";

const { store, persistor } = createStore();

export default class App extends Component {
  render() {
    
    return (
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootScreen/>
            </PersistGate>
          </Provider>
        );
  }
}

// export default class App extends Component {
//   render() {
//     return (
//       <View style={{backgroundColor: 'red', flex: 1}}>

//       </View>
//     )
//   }
// }

// npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/messaging @react-native-firebase/storage react-native-date-picker react-native-svg react-native-vector-icons intl react-native-snap-carousel apisauce react-native-reanimated react-native-gesture-handler react-navigation react-navigation-stack react-navigation-drawer react-redux redux redux-persist redux-saga reduxsauce react-native-image-crop-picker react-native-image-picker react-native-image-progress react-native-indicators react-native-iphone-x-helper react-native-keyboard-aware-scroll-view react-native-lightbox react-native-linear-gradient react-native-progress 
// npm install reactotron-react-native reactotron-redux reactotron-redux-saga seamless-immutable --save-dev

// /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/Contents/MacOS/Simulator -CurrentDeviceUDID D9974757-E6A8-419C-A47B-08A83A16FFE4

// New project requirements:
// iOS bundle identifier
// strings.xml
// Config
// Google file for iOS and Android

