import {StyleSheet} from 'react-native';
import { Colors } from '../Theme';

export default StyleSheet.create({
    thinBorder: {
        borderWidth: 0.4,
        borderColor: Colors.secondary,
    },

    thinYBorder: {
        borderTopWidth: 0.4,
        borderBottomWidth: 0.4,
        borderColor: Colors.lightgrey,
        
    },

    thinWhiteBorder: {
        borderWidth: 0.8,
        borderColor: Colors.white,
    },

    standardBottomBorder: {
        borderBottomWidth: 0.7,
        borderBottomColor: '#fff',
    }
})

