import React from 'react';

import {Text} from 'react-native'
import { Fonts, Colors } from '../../Theme';

const ErrorMessage = ({text}) => (
    <Text style={{...Fonts.style.big, color: Colors.white, fontWeight: "bold"}}>{text}</Text>
)

export default ErrorMessage