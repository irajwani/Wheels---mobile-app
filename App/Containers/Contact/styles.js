import { StyleSheet } from "react-native"

import {Metrics, Fonts, Helpers, Colors} from "../../Theme"

export default StyleSheet.create({

    mapContainer: {
        ...Helpers.center,
    },

        map: {
            width: Metrics.screenWidth - 2*Metrics.baseMargin,
            height: 300,
            borderRadius: Metrics.mediumContainerRadius,
            marginTop: Metrics.baseMargin,
        },
    

    detailsContainer: {
        margin: Metrics.baseMargin,
        // flex: 0.4,
    },

        detailContainer: {
            flexDirection: 'row',
            flex: 0.5,
            alignItems: 'center',
            marginBottom: Metrics.baseMargin
        },

                detailText: {...Fonts.style.big, color: Colors.white, marginLeft: Metrics.baseMargin},


    formContainer: {
        margin: Metrics.baseMargin
    },




})