import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Helpers, Images, Colors, Fonts, Metrics } from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {Tune, } = Images

function SortButton({options, selectedItem, onMenuItemPress, isDrawerVisible, toggleOptionDrawer}) {

    return (
        
        <TouchableOpacity style={styles.button} onPress={toggleOptionDrawer}>
            <Tune />
            {isDrawerVisible && 
                <View style={styles.menu}>
                    {options.map(option => {
                        
                        return (
                            <TouchableOpacity onPress={() => onMenuItemPress(option)} style={styles.menuItem}>
                                <Text style={{...Fonts.style.small, color: selectedItem == option ? Colors.primary : Colors.black}}>{option}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            }
        </TouchableOpacity>

        

    )
}

export default SortButton

const styles = StyleSheet.create({
    button: {
        flex: 0.2,
        borderBottomRightRadius: Metrics.mediumContainerRadius,
        borderTopRightRadius: Metrics.mediumContainerRadius,
        backgroundColor: Colors.silver,
        ...Helpers.center
    },

    menu: {
        backgroundColor: Colors.white,
        borderRadius: Metrics.smallContainerRadius,
        ...shadowStyles.menu
    },

        menuItem: {
            flexDirection: 'row',
            ...Helpers.center
        }
})