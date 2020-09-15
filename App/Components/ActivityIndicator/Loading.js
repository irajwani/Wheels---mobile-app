import React, {useState, useEffect} from 'react';
import {Image, Animated, Easing} from 'react-native';
import ProgressCircleSnail from 'react-native-progress/CircleSnail';
import {MaterialIndicator} from 'react-native-indicators';
import {Colors, Images, Helpers, Metrics} from '../../Theme';

let {Bike} = Images;

import Svg, {G, Path, Circle, Rect} from 'react-native-svg';

const strokeWidth = 5;
const color = Colors.black;

function Loading() {
  let [translateXValue, setTranslateXValue] = useState(new Animated.Value(0));

  useEffect(beginImageTranslation, []);

  function beginImageTranslation() {
    translateXValue.setValue(0);
    Animated.timing(translateXValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => beginImageTranslation());
  }

  const translateX = translateXValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, 100, 200, 260, Metrics.screenWidth],
  });

  return (
    <Animated.View style={{flexDirection: 'column', width: Metrics.screenWidth, borderBottomWidth: 2, borderColor: Colors.primary}}>
      <Animated.View style={{ transform: [{translateX}] }}>
        <Bike />
      </Animated.View>
      
    </Animated.View>
  );
}

export default Loading;

// {...Helpers.center, transform: [{rotate}]}
// {/* <Image style={{width: 100, height: 100}} source={Images.wheel} /> */}
// {
//   /* <MaterialIndicator color={Colors.primary}/> */
// }
