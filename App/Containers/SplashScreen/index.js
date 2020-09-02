import React, {useState, useEffect} from 'react';
import {Text, SafeAreaView, View, Image} from 'react-native';
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
import {Metrics, Images} from '../../Theme';

let versionNumber = '1.0.7';
const splashScreenDuration = 200;
// FIRST CONTAINER REACT COMPONENT THAT MOUNTS
function SplashScreen(props) {
  useEffect(() => {
    
    
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
        // props.getProfile(user.uid);
      } else {
        // props.getProfile(user.uid);
        props.navigation.navigate('AppStack');
      }
    } else {
      props.navigation.navigate('AuthStack');
      // "USER DISCONNECTED"
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Images.splashScreen} style={styles.companyLogo} />
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
  // getProfile: (uid) => dispatch(AuthActions.getProfileRequest(uid)),
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
