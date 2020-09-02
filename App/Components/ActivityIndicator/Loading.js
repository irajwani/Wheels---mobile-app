import React, {useState, useEffect} from 'react';
import {Image, Animated, Easing} from 'react-native';
import ProgressCircleSnail from 'react-native-progress/CircleSnail';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors, Images, Helpers} from '../../Theme';

import Svg, {G, Path, Circle, Rect} from 'react-native-svg';

const strokeWidth = 5;
const color = Colors.black;

function Loading() {
  let [rotateValue, setRotateValue] = useState(new Animated.Value(0));

  useEffect(beginImageRotation, []);

  function beginImageRotation() {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
    }).start(() => beginImageRotation());
  }

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{...Helpers.center, transform: [{rotate}]}}>
      <Image style={{width: 100, height: 100}} source={Images.wheel} />
    </Animated.View>
  );
}

export default Loading;

// {
//   /* <MaterialIndicator color={Colors.primary}/> */
// }
