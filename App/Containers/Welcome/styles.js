import {StyleSheet} from 'react-native';
import { Fonts, Helpers, Colors, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {screenWidth, screenHeight} = Metrics;

export default StyleSheet.create({
    container: {
        flex: 1,
    },

        headerContainer: {
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: Metrics.baseMargin
        },

            toggleButton: {
                paddingHorizontal: Metrics.baseMargin/2,
                borderWidth: 0.8,
                borderColor: Colors.white,
                backgroundColor: "transparent"
            },

                toggleText: {
                    ...Fonts.style.big,
                    fontWeight: "400",
                },

            
            // logo: {
            //     width: 40,
            //     height: 40,
            // },

        

        formContainer: {
            flex: 0.9,
            backgroundColor: Colors.darkwhite,
            borderTopLeftRadius: Metrics.containerRadius,
            borderTopRightRadius: Metrics.containerRadius,
        },

            semiCircleTop: {
                width: 80,
                height: 40,
                borderTopLeftRadius: 40, 
                borderTopRightRadius: 40,
                ...Helpers.center,
                backgroundColor: 'pink'
            },

                formHeaderText: {
                    ...Fonts.style.normal
                },

            form: {
                flex: 0.8,
                marginHorizontal: Metrics.baseMargin,
                paddingTop: 2*Metrics.baseMargin
            },

                bioInputContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between'
                },

            formFooter: {
                flex: 0.2,
                ...Helpers.center,
            },

            

        authActionsContainer: { 
            
            flexDirection: 'row',
        },

            rememberMeContainer: { 
                flex: 0.5, 
                flexDirection: 'row', 
                justifyContent: 'space-evenly', alignItems: 'center',
            },
        
            forgotPasswordContainer: {
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                
                
            },

        buttonContainer: {
            marginTop: 15,
            ...Helpers.center,
        },



        footerContainer: {
            flex: 0.2,
            ...Helpers.center,
            padding: 10,
        },

            footer: {
                ...Fonts.style.normal,
                fontWeight: "bold"
            },

    
    documentOpenerContainer: {
        ...Helpers.center,
        padding: 10,
       
    },
    documentOpener: {
        ...Fonts.style.normal,
        color: Colors.white,
        marginHorizontal: Metrics.baseMargin/2,
    },

        document: {
            ...Fonts.style.small
        },
            


    

})