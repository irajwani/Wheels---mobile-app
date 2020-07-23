import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts, Helpers } from '../../Theme';


export default StyleSheet.create({
  container: {
    flex: 1,
    // ...Helpers.center,
    backgroundColor: Colors.white,

  },

    // companyName: {
    //   ...Fonts.style.h1,
    //   color: Colors.secondary,
    //   letterSpacing: 2,
    // },

    logoContainer: {
      flex: 0.9,
      ...Helpers.center
    },

      companyLogo: {
        width: 250,
        height: 250,
      },

    versionContainer: {
      flex: 0.1,
      ...Helpers.center,
    },

      version: {
        ...Fonts.style.normal,
        color: Colors.secondary,
      }




  
})
