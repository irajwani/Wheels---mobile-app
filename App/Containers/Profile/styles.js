import { StyleSheet } from "react-native";
import { Colors, Metrics, Fonts } from "../../Theme";


export default StyleSheet.create({
    profileContainer: {
        flex: 0.1,
        margin: Metrics.baseMargin,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

        profilePicture: {
            width: 56,
            height: 56,
            borderRadius: 28,
        },

        profileName: {...Fonts.style.normal, marginLeft: Metrics.baseMargin},

        logOutButton: {
            // width: 48,
            position: "absolute",
            padding: Metrics.baseMargin,
            right: 0,
            backgroundColor: Colors.red,
            alignSelf: 'flex-end',
            borderRadius: Metrics.smallContainerRadius,
        },

        logOut: {
            ...Fonts.style.small,
            color: Colors.white
        },

    title: {
        ...Fonts.style.big, 
        fontWeight: 'bold',
        marginBottom: Metrics.baseMargin,
    },

    wishListContainer: {
        flex: 0.4,
        margin: Metrics.baseMargin,
    },



    ordersContainer: {
        flex: 0.4,
        margin: Metrics.baseMargin,
    }


})