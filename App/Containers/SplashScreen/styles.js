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
        width: 150,
        height: 150,
        // alignSelf: 'center'
      },

      bikeContainer: {
        position: "absolute",
        bottom: Metrics.screenHeight/2,
        zIndex: 1,
      },

      textContainer: {
        flexDirection: 'row',
        ...Helpers.center,
      },

        companyName: {
          ...Fonts.style.h2,
          color: Colors.primary,
          fontWeight: "500"
        },

    versionContainer: {
      flex: 0.1,
      ...Helpers.center,
    },

      version: {
        ...Fonts.style.normal,
        fontWeight: "bold",
        color: Colors.grey,
      }




  
})
