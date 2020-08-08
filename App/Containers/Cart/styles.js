import {StyleSheet} from 'react-native';
import { Metrics, Helpers, Colors, Fonts } from '../../Theme';
import borderStyles from '../../StyleSheets/borderStyles';

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
            width: (Metrics.screenWidth - 2*Metrics.baseMargin)/2 - 45,
        },

    bodyContainer: {
        // flex: 0.3,
        margin: Metrics.baseMargin,
        

    },

        //STEP #2

        formContainer: {
            flex: 0.4,
            flexGrow: 0.8,
        },

        formContentContainer: {
            // alignItems: 'center',
            justifyContent: 'space-evenly',
        },

            formHeaderText: {
                ...Fonts.style.normal,
                fontWeight: "bold",
                // marginVertical: Metrics.baseMargin/2
            },



    

    footerContainer: {
        flex: 0.4,
        margin: Metrics.baseMargin
    },



        disclaimerContainer: {
            flex: 0.3,
            flexDirection: 'row',
            alignItems: 'center',
        },

        detailsContainer: {
            flex: 0.7,
            flexDirection: 'row'
        },

        badgeContainer: {
            flex: 0.3,
            justifyContent: 'center'
        },

        priceContainer: {
            flex: 0.7,
            marginHorizontal: Metrics.baseMargin,
            justifyContent: 'center',
        },

            total: {
                ...Fonts.style.small,
                color: Colors.grey,
                fontWeight: '600'
            },

            price: {
                ...Fonts.style.big,
                color: Colors.primary
            },

        buttonsContainer: {
            flexDirection: 'row',
            borderRadius: Metrics.containerRadius,
            backgroundColor: "transparent"
        },

            button: {
                flexDirection: 'row',
                ...Helpers.center,
                ...borderStyles.thinBorder,
            },

                buttonText: {
                    ...Fonts.style.normal,
                    color: Colors.white
                },


})