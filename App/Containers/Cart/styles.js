import {StyleSheet} from 'react-native';
import { Metrics, Helpers, Colors, Fonts } from '../../Theme';
import borderStyles from '../../StyleSheets/borderStyles';

export default StyleSheet.create({

    progressBarContainer: {
        flex: 0.1,
        flexDirection: 'row',
        margin: Metrics.baseMargin,
        
    },

        progressBarPiece: {
            flexDirection: 'row',
            ...Helpers.center,
        },

            circle: {
                width: 25,
                height: 25,
                borderRadius: 12.5,
                ...Helpers.center
            },

                stepNumber: {
                    ...Fonts.style.small, color: Colors.white
                },

            stick: {
                height: 4*StyleSheet.hairlineWidth,
                width: (Metrics.screenWidth - 2*Metrics.baseMargin)/2 - 80,
            },

        progressBarBottom: {
            flexDirection: 'row',
            flex: 0.2,
            alignItems: 'center',
        },

            progressText: {...Fonts.style.normal, fontSize: 16, marginHorizontal: 3,},

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

                shippingRow: {
                    flexDirection: 'row',
                    paddingVertical: Metrics.baseMargin,
                    alignItems: 'center',
                },

        //STEP #3

        messageContainer: {
            flex: 0.6,
            ...Helpers.center,
        },

            messageImage: {
                marginVertical: Metrics.baseMargin,
                width: 200,
                height: 200,
            },

            message: {
                ...Fonts.style.normal, textAlign: "left",
                marginVertical: Metrics.baseMargin
            },



    

    footerContainer: {
        
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
            flex: 0.2,
            justifyContent: 'center'
        },

        priceContainer: {
            flex: 0.8,
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
                    color: Colors.white,
                    fontWeight: "600",
                },


})