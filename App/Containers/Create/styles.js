import { StyleSheet } from "react-native";
import { Fonts, Colors, Metrics, Helpers } from "../../Theme";
import shadowStyles from "../../StyleSheets/shadowStyles";

export default StyleSheet.create({

    fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingHorizontal: 4,
        paddingVertical: 6,
        borderBottomWidth: 0.8,borderColor: Colors.lightgrey
    },

        fieldLabelContainer: {
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginTop: 5,
        },

            fieldLabel: {...Fonts.style.normal, fontWeight: 'bold', textAlign: 'center'},

        fieldValueContainer: {
            justifyContent: 'center',
            alignItems: 'flex-end'
        },

            fieldValue: {...Fonts.style.normal},

        iconContainer: {
            justifyContent: 'flex-end',
            alignItems: 'flex-end'
        },


        //Styles for individual input types

        typeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: Metrics.baseMargin
        },

            radioButton: {
                width: 30,
                height: 30,
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'black',
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center'
            },

        inviteContainer: {
            
        },

            userContainer: {
                marginVertical: Metrics.baseMargin,
                flexDirection: 'row',
                backgroundColor: Colors.white,
                ...shadowStyles.lowerBlackShadow,
                width: 250,
                borderWidth: 1, 
                borderColor: Colors.secondary,
                borderRadius: 15
            },

                userImageContainer: {
                    flex: 0.25,
                    ...Helpers.center,
                    paddingVertical: Metrics.baseMargin/2,
                    borderRightColor: Colors.secondary,
                    borderRightWidth: 1,
                },

                    userImage: {
                        width: 40,
                        height: 40,
                        borderRadius: 20,

                    },

                userNameContainer: {
                    flex: 0.75,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: Metrics.baseMargin*2
                },


    footerContainer: {
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        ...Helpers.center,
    },

        

        

})