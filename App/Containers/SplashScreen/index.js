import React, {useState, useEffect, useRef} from 'react';
import {Text, SafeAreaView, View, Image, Easing, Animated} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
// import NavigationService from '../../Services/NavigationService'

import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

// import StartupActions from 'App/Stores/Startup/Actions'
import AuthActions from '../../Stores/Auth/Actions';
import {connect} from 'react-redux';

import styles from './styles';
import {Metrics, Images, Strings} from '../../Theme';

let {SlowBike} = Images;

let versionNumber = '1.0.0';
const splashScreenDuration = 4000;
// FIRST CONTAINER REACT COMPONENT THAT MOUNTS
function SplashScreen(props) {
  let [translateXValue, setTranslateXValue] = useState(new Animated.Value(0));
  const textOpacity = useRef(new Animated.Value(0)).current;

  function beginImageTranslation() {
    Animated.sequence([
      Animated.timing(translateXValue, {
        toValue: 1.5,
        duration: 2000,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
    
  }

  const translateX = translateXValue.interpolate({
    inputRange: [0, 0.25, 0.5, 1, 1.5],
    outputRange: [-40, 50, 65, 70, Metrics.screenWidth / 3 - 40],
  });

  useEffect(() => {
    beginImageTranslation();
    checkPermission();

    setTimeout(() => {
      const subscriber = auth().onAuthStateChanged(showAppOrAuth);
      return subscriber;
    }, splashScreenDuration);
  }, []);


  async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async function checkPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  }

  async function requestPermission() {
    try {
      await messaging().requestPermission();
      getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }



  async function showAppOrAuth(user) {
    //If the user is online, store the UID, but either way just nav to AppStack
    if (user) {
      props.storeUid(user.uid);
      // let keys = await AsyncStorage.getAllKeys();
      // if(!keys.includes('profile')) {
      //   AsyncStorage.setItem('profile', {
      //     name: user.displayName,
      //     address: '',
      //     city: '',
      //     phone: '',
      //   });
      // }
      
      
      // console.log("USER IS: " + user);
      var cT = new Date(user.metadata.creationTime);
      var pT = new Date();
      var dif = pT.getTime() - cT.getTime();
      var seconds_dif = dif / 1000;
      seconds_dif = Math.abs(seconds_dif);
      if (seconds_dif < 10) {
        props.navigation.navigate('AppStack');
        props.getProfile(user.uid);
      } else {
        props.getProfile(user.uid);
        props.navigation.navigate('AppStack');
      }
    } else {
      props.logOut();
      props.navigation.navigate('AuthStack');
      // "USER DISCONNECTED"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.bikeContainer, { transform: [{translateX}] }]}>
        <SlowBike />
      </Animated.View>
      <View style={styles.logoContainer}>
        <Image source={Images.logo} style={styles.companyLogo} />
        <Animated.View style={[styles.textContainer, {opacity: textOpacity}]}>
          <Text style={styles.companyName}>{Strings.companyName}</Text>
        </Animated.View>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.version}>Version {versionNumber}</Text>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  storeUid: (uid) => dispatch(AuthActions.storeUid(uid)),
  logOut: () => dispatch(AuthActions.logOut()),
  getProfile: (uid) => dispatch(AuthActions.getProfileRequest(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

// const mapStateToProps = (state) => ({})

// const mapDispatchToProps = (dispatch) => ({
//   startup: () => dispatch(StartupActions.startup()),
// })

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SplashScreen)

//OLDER (possibly faulty/possibly better than current) METHOD:

// async componentDidMount() {
//   this.checkPermission();
//   this.createNotificationChannel();
//   this.createNotificationListeners();
// }

// createNotificationChannel = async () => {
//   const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
//     .setDescription('My apps test channel');

//     // Create the channel
//   await firebase.notifications().android.createChannel(channel);
// }

// createNotificationListeners = async () => {

//   this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
//     // Process your notification as required
//     //iOS Only
//     // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
//     // this.setState({notification: "rNDL"})
//     console.log('Notification: ', notification)
//   });

//   this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
//     // this.setState({notification: "rNL"})
//     // console.log("Standard Notification + Optional Data Notification");
//     console.log('Notification: ', notification)
//   });

//   /*
//   * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
//   * */
//   this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
//       const { title, body } = notificationOpen.notification;
//       // this.setState({notification: "rNOL"})
//       console.log(title, body);
//       // this.showAlert(title, body);
//   });

//   const notificationOpen = await firebase.notifications().getInitialNotification();
//   if (notificationOpen) {
//       const { title, body } = notificationOpen.notification;
//       // console.log("App was closed and user interacted with it through notif.");
//       console.log(title, body);
//       // this.showAlert(title, body);
//   }

//   this.messageListener = firebase.messaging().onMessage((message) => {
//     //process data message
//     console.log(JSON.stringify(message));
//   });

// }

// async checkPermission() {
//   const enabled = await firebase.messaging().hasPermission();
//   if (enabled) {
//       this.getToken();
//   } else {
//       this.requestPermission();
//   }
// }

//   //3
// async getToken() {
//   let fcmToken = await AsyncStorage.getItem('fcmToken');
//   console.log(fcmToken);
//   if (!fcmToken) {
//       fcmToken = await firebase.messaging().getToken();
//       if (fcmToken) {
//           // user has a device token
//           await AsyncStorage.setItem('fcmToken', fcmToken);
//       }
//   }
// }

//   //2
// async requestPermission() {
//   try {
//       await firebase.messaging().requestPermission();
//       // User has authorised
//       this.getToken();
//   } catch (error) {
//       // User has rejected permissions
//       console.log('permission rejected');
//   }
// }

// componentWillUnmount() {
//   this.removeNotificationDisplayedListener();
//   this.removeNotificationOpenedListener();
//   this.removeNotificationListener();
// }
