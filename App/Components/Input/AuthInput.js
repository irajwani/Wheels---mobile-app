import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, Images, Helpers } from '../../Theme'

let {Eye} = Images;

const AuthInput = ({placeholder, onChangeText, value, error = false, secureTextEntry, keyboardType, style = false}) => {

    const [isVisible, toggleEye] = useState(false);



    return (
    
        <>
            {secureTextEntry && 
                <TouchableOpacity 
                    onPress={() => toggleEye(!isVisible)} 
                    style={
                        {
                            position: 'absolute',zIndex: 100, 
                            // alignSelf: 'center',
                            // ...Helpers.center,
                            top: Metrics.screenHeight/4.25, 
                            right: 20
                        }
                    }>
                        {isVisible ? <Eye/> : <Eye off/>}
                </TouchableOpacity>
            }
            <TextInput
            secureTextEntry={secureTextEntry ? isVisible ? false : true : false}
            style={[styles.inputStyle, style ? style : null, value && error ? {borderColor: Colors.error} : null]}
            placeholder={placeholder}
            placeholderTextColor={Colors.secondary}
            onChangeText={onChangeText}
            value={value}
            multiline={false}
            autoCorrect={false}
            autoCapitalize={'none'}
            clearButtonMode={secureTextEntry ? 'never' : 'while-editing'}
            underlineColorAndroid={"transparent"}
            keyboardType={keyboardType ? keyboardType : 'default'}
            
            />

            
            {/* {error !== "" && <Text style={{...Fonts.style.small, color: Colors.error, marginLeft: Metrics.baseMargin}}>{error}</Text>} */}
                
        </>
)
}
export default AuthInput

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,marginBottom: 0, padding: 10, ...Fonts.style.normal, 
        ...Helpers.thinBorder, 
        fontWeight: "400", borderRadius: 25
    }
})

// width: Metrics.screenWidth - 20