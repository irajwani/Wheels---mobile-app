import {StyleSheet} from 'react-native';
import { Colors } from '../Theme';

export default StyleSheet.create({
    button: {
        shadowColor: Colors.text,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 3,
    },

    whiteCard: {
        shadowColor: Colors.black,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    thinWhiteCard: {
        shadowColor: Colors.secondary,
        
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.6,
        shadowRadius: 5,
    },

    whiteShadow: {
        shadowColor: Colors.white,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    blackShadow: {
        shadowColor: Colors.black,
        
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },

    lowerBlackShadow: {
        shadowColor: Colors.black,
        
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 1,
    },

    lowerThemeShadow: {
        shadowColor: Colors.primary,
        
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1,
    },


})