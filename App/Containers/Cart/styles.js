import {StyleSheet} from 'react-native';
import { Metrics, Helpers, Colors, Fonts } from '../../Theme';

export default StyleSheet.create({

    progressBarContainer: {
        flex: 0.2,
        flexDirection: 'row',
        margin: Metrics.baseMargin,
    },

        circle: {
            width: 30,
            height: 30,
            borderRadius: 15,
            ...Helpers.center
        },

        stick: {
            height: 3*StyleSheet.hairlineWidth,
            width: (Metrics.screenWidth - 2*Metrics.baseMargin)/2 - 30,
        },

    bodyContainer: {
        flex: 0.5
    },

    disclaimerContainer: {
        flex: 0.1,
    },

    footerContainer: {
        flex: 0.1,
        flexDirection: 'row'
    },

        priceContainer: {
            flex: 0.6,
            ...Helpers.center,
            flexDirection: 'row',
        },

            price: {
                ...Fonts.style.normal,
                color: Colors.primary
            },

        button: {
            flex: 0.4,
            borderBottomRightRadius: Metrics.containerRadius,
            backgroundColor: Colors.primary,
            ...Helpers.center,
        },

            buttonText: {
                ...Fonts.style.normal,
                color: Colors.white
            }


})