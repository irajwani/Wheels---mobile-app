import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Helpers, Images, Colors, Fonts, Metrics} from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {Tune} = Images;

function SortButton({toggleOptionDrawer}) {
  return (
    <TouchableOpacity style={styles.button} onPress={toggleOptionDrawer}>
      <Tune />
    </TouchableOpacity>
  );
}

export default SortButton;

const styles = StyleSheet.create({
  button: {
    flex: 0.2,
    borderBottomRightRadius: Metrics.smallContainerRadius,
    borderTopRightRadius: Metrics.smallContainerRadius,
    backgroundColor: Colors.silver,
    ...Helpers.center,
  },
});
