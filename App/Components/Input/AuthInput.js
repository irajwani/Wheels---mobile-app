import React, {useState} from 'react'
import { TextInput, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Metrics, Fonts, Colors, Images, Helpers } from '../../Theme'

let {Eye} = Images;

const AuthInput = ({label, placeholder, onChangeText, value, error = false, secureTextEntry, keyboardType, style = false}) => {

    const [isVisible, toggleEye] = useState(false);



    return (
    
        <>
            
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
                                
                                top: 25, 
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
            </View>

            
            {/* {error !== "" && <Text style={{...Fonts.style.small, color: Colors.error, marginLeft: Metrics.baseMargin}}>{error}</Text>} */}
                
        </>
)
}
export default AuthInput

const styles = StyleSheet.create({
    inputStyle: {
        height: 70,marginBottom: 0, 
        ...Fonts.style.big, 
        fontWeight: "400",
    },

    label: {
        ...Fonts.style.normal,
        fontWeight: "600",
        color: Colors.black,
    }
})

// width: Metrics.screenWidth - 20