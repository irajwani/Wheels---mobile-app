import {StyleSheet} from 'react-native';
import { Colors, Fonts, Helpers, Metrics } from '../../Theme';

export default StyleSheet.create({

    headerContainer: {
        flex: 0.1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: Metrics.baseMargin,
        position: "absolute",zIndex: 1,width: "100%",
    },

    scroll: {
        flex: 0.9
    },

    scrollContent: {

    },

        imageContainer: {
            
        },

            image: {
                width: Metrics.screenWidth,
                height: 400,
            },

        bodyContainer: {
            margin: Metrics.baseMargin,
        },

            name: {
                ...Fonts.style.big,
                fontWeight: "bold"
            },

            detail: {
                ...Fonts.style.normal,
                color: Colors.grey
            },

            featuresScroll: {

            },

            featuresContentScroll: {

            },

                featureCard: {
                    backgroundColor: Colors.lightgrey,
                    padding: Metrics.baseMargin,
                    alignItems: 'center'
                },

                    featureImage: {
                        width: 20,
                        height: 20,
                    },

                    featureText: {
                        ...Fonts.style.small,
                        color: Colors.grey
                    },

    
    footerContainer: {
        flex: 0.1,
        flexDirection: 'row'
    },

        priceContainer: {
            flex: 0.5,
            ...Helpers.center
        },

            price: {
                ...Fonts.style.normal,
                color: Colors.primary
            },

        button: {
            flex: 0.5,
            borderTopLeftRadius: Metrics.containerRadius,
            backgroundColor: Colors.primary,
            ...Helpers.center,
        },

            buttonText: {
                ...Fonts.style.normal,
                color: Colors.white
            }

    
})