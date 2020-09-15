import {StyleSheet} from 'react-native';
import { Colors, Fonts, Helpers, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';

export default StyleSheet.create({

    headerContainer: {
        flex: 0.1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        padding: Metrics.baseMargin,
        position: "absolute",zIndex: 1,width: "100%",
    },

    scroll: {
        flex: 0.9
    },

    scrollContent: {

    },

        imageContainer: {
            justifyContent: 'flex-start',
            // backgroundColor: 'red'
        },

            image: {
                width: Metrics.screenWidth,
                height: 250,
            },

        bodyContainer: {
            margin: Metrics.baseMargin,
        },

            textContainer: {
                flex: 0.7,
            },

                name: {
                    ...Fonts.style.big,
                    fontWeight: "bold"
                },

                detail: {
                    ...Fonts.style.normal,
                    color: Colors.grey
                },

            likeButtonContainer: {
                flex: 0.3,
                

            },

            featuresScroll: {
                marginVertical: Metrics.baseMargin,
                
            },

            featuresContentScroll: {
                paddingVertical: Metrics.baseMargin,
            },

                featureCard: {
                    backgroundColor: Colors.white,
                    padding: 0.5*Metrics.baseMargin,
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    marginRight: Metrics.baseMargin,
                    width: 160,
                    height: 124,
                    borderRadius: Metrics.mediumContainerRadius,

                    ...borderStyles.thinBorder,

                },

                    featureImage: {
                        width: 72,
                        height: 64,
                        overflow: 'visible',
                    },

                    featureText: {
                        ...Fonts.style.small,
                        fontWeight: "bold",
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
                color: Colors.white,
                fontWeight: "bold"
            }

    
})