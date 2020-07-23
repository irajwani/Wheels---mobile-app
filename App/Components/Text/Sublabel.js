import React from 'react';

import {Text} from 'react-native'
import { Fonts, Colors, Metrics } from '../../Theme';

const SubLabel = ({text}) => (
    <Text style={{...Fonts.style.normal, color: Colors.primary, marginBottom: Metrics.baseMargin}}>{text}</Text>
)

export default SubLabel