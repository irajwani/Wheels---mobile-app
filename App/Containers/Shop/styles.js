import {StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors, Helpers} from '../../Theme';

import shadowStyles from '../../StyleSheets/shadowStyles';

let cardWidth = 175,
  cardHeight = 175;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

    searchContainer: {
      zIndex: 1,
      margin: Metrics.baseMargin,
      borderRadius: Metrics.smallContainerRadius,
      // ...shadowStyles.whiteCard,
        // ...borderStyles.thinBorder,
        backgroundColor: Colors.grey,
        flexDirection: 'row',
        overflow: 'visible',
    },

    menu: {
      position: 'absolute',
      top: 55,
      right: 0,
      zIndex: 1,
      overflow: 'visible',
      backgroundColor: Colors.lightgrey,
      borderRadius: Metrics.smallContainerRadius,
      ...shadowStyles.menu,
      // overflow: 'visible',

    },

      menuItem: {
          flexDirection: 'row',
          alignItems: 'center',
          margin: Metrics.baseMargin/2,
      },

  
  //AUTH MODAL
    closeContainer: {
      position: 'absolute',
      zIndex: 100,
      top: 2*Metrics.baseMargin,
      left: Metrics.baseMargin
    },

    modalHeader: {
      flex: 0.15,
      ...Helpers.center,
    },

      logo: {
        width: 40,
        height: 40,
      },

      modalHeaderText: {...Fonts.style.normal, },

    modalContent: {
      flex: 0.6,
    },

      modalImage: {
        width: Metrics.screenWidth - 2*Metrics.baseMargin,
        height: Metrics.screenHeight/2,
        
      },

      modalText: {
        ...Fonts.style.normal,
      },


    modalFooter: {
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

  

  

  image: {
    width: cardWidth,
    height: 0.65 * cardHeight,
  },

  textContainer: {},

  name: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
  },

  time: {
    ...Fonts.style.small,
    color: Colors.secondary,
    marginTop: Metrics.baseMargin / 2,
    fontWeight: '200',
  },
});
