import React from 'react';

import {Text} from 'react-native'
import { Fonts } from '../../Theme';

const Label = ({text}) => (
    <Text style={{...Fonts.style.big, fontWeight: "bold"}}>{text}</Text>
)

export default Label