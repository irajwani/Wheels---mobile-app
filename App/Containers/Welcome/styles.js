import {StyleSheet} from 'react-native';
import { Fonts, Helpers, Colors, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {screenWidth, screenHeight} = Metrics;

export default StyleSheet.create({
    container: {
        flex: 1,
    },

        headerContainer: {
            flex: 0.2
        },

            
            logo: {
                width: 55,
                height: 55,
            },

        

        formContainer: {
            flex: 0.7,
            backgroundColor: Colors.white,
            marginHorizontal: Metrics.baseMargin,
            justifyContent: 'space-evenly',
            // height: screenHeight/1.6,
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
            flex: 0.05,
            ...Helpers.center,
            padding: 10,
        },

            footer: {
                ...Fonts.style.normal,
                fontWeight: "bold"
            },

    //Modal
    modal: {
        justifyContent: 'space-evenly', alignItems: 'center',
        paddingTop: Metrics.baseMargin,
        paddingHorizontal: Metrics.baseMargin,
    },
    modalHeader: {
        textAlign: 'center',
        ...Fonts.style.normal,
        fontWeight: "bold",
        paddingVertical: Metrics.baseMargin/2
    },
    acceptText: {
        ...Fonts.style.normal,
        color: Colors.success
    },
    rejectText: {
        ...Fonts.style.normal,
        color: Colors.error
    },
    hideModal: {
      ...Fonts.style.normal,
      fontWeight:'bold'
    },
    licenseContainer: {
        flexGrow: 0.6, 
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: Metrics.baseMargin/2
    },
    documentOpenerContainer: {
        ...Helpers.center,
        padding: 10,
       
    },
    documentOpener: {
        ...Fonts.style.normal,
        color: Colors.primary,
        marginVertical: Metrics.baseMargin/2,
    },

        document: {
            ...Fonts.style.small
        },

    decisionButtons: {
        flexDirection: 'row',
        
    },

        decisionButton: {
            flex: 0.5,
            paddingVertical: 10,
            ...Helpers.center,
            borderWidth: 1,
            borderColor: Colors.secondary
        },
            


    

})