import {StyleSheet} from 'react-native';
import { Metrics, Helpers, Colors, Fonts } from '../../Theme';

export default StyleSheet.create({

    progressBarContainer: {
        flex: 0.1,
        flexDirection: 'row',
        margin: Metrics.baseMargin,
        ...Helpers.center,
    },

        circle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            ...Helpers.center
        },

        stick: {
            height: 3*StyleSheet.hairlineWidth,
            width: (Metrics.screenWidth - 2*Metrics.baseMargin)/2 - 60,
        },

    bodyContainer: {
        flex: 0.3,
        margin: Metrics.baseMargin,
        

    },

    

    footerContainer: {
        flex: 0.5,
        
        margin: Metrics.baseMargin
    },



        disclaimerContainer: {
            flex: 0.3,
            flexDirection: 'row'
        },

        detailsContainer: {
            flex: 0.7,
            flexDirection: 'row'
        },

        badgeContainer: {
            flex: 0.3,
            ...Helpers.center,
        },

        priceContainer: {
            flex: 0.7,
            marginHorizontal: Metrics.baseMargin,
        },

            total: {
                ...Fonts.style.small,
                color: Colors.lightgrey
            },

            price: {
                ...Fonts.style.big,
                color: Colors.primary
            },

        button: {
            flexDirection: 'row',
            padding: Metrics.baseMargin,
            borderRadius: Metrics.smallContainerRadius,
            backgroundColor: Colors.primary,
            ...Helpers.center,
            alignSelf: 'center',
        },

            buttonText: {
                ...Fonts.style.normal,
                color: Colors.white
            }


})