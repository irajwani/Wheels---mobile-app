import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, Images, Helpers } from '../../Theme'

let {Eye} = Images;

const AuthInput = ({label, placeholder, onChangeText, value, error = false, secureTextEntry, keyboardType, style = false}) => {

    const [isVisible, toggleEye] = useState(false);



    return (
    
        <View style={styles.container}>
            
            <Text style={styles.label}>{label}</Text>
            <View>

                {secureTextEntry && 
                    <TouchableOpacity 
                        onPress={() => toggleEye(!isVisible)} 
                        style={
                            {
                                position: 'absolute',
                                zIndex: 100, 
                                // alignSelf: 'center',
                                
                                top: 12.5, 
                                right: 20
                            }
                        }>
                            {isVisible ? <Eye/> : <Eye off/>}
                    </TouchableOpacity>
                }
                <TextInput
                secureTextEntry={secureTextEntry ? isVisible ? false : true : false}
                style={[styles.inputStyle, style ? style : null, value && error ? {textDecorationLine: 'underline', textDecorationColor: Colors.error} : null]}
                placeholder={placeholder}
                placeholderTextColor={Colors.silver}
                onChangeText={onChangeText}
                value={value}
                multiline={false}
                autoCorrect={false}
                autoCapitalize={'none'}
                clearButtonMode={secureTextEntry ? 'never' : 'while-editing'}
                underlineColorAndroid={"transparent"}
                keyboardType={keyboardType ? keyboardType : 'default'}
                
                />
            </View>

            
            {error !== "" && <Text style={{...Fonts.style.small, color: Colors.error, marginTop: Metrics.baseMargin/2}}>{error}</Text>}
                
        </View>
)
}
export default AuthInput

const styles = StyleSheet.create({

    container: {
        width: Metrics.screenWidth - 2*Metrics.baseMargin,
        marginBottom: Metrics.baseMargin,
    },
    inputStyle: {
        // height: 70, 
        borderRadius: Metrics.smallContainerRadius,
        borderBottomWidth: 1.5,
        borderColor: Colors.lightgrey,
        ...Fonts.style.big, 
        paddingVertical: Metrics.baseMargin,
        fontWeight: "400",
    },

    label: {
        ...Fonts.style.normal,
        fontWeight: "600",
        color: Colors.black,
    }
})

// width: Metrics.screenWidth - 20