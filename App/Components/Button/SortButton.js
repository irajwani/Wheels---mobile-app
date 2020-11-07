import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {Helpers, Images, Colors, Fonts, Metrics} from '../../Theme';
import shadowStyles from '../../StyleSheets/shadowStyles';

let {ChevronDown} = Images;

function SortButton({toggleOptionDrawer}) {
  return (
    <TouchableOpacity style={styles.button} onPress={toggleOptionDrawer}>
      <Text style={{...Fonts.style.normal}}>Sort By</Text>
      <ChevronDown />
    </TouchableOpacity>
  );
}

export default SortButton;

const styles = StyleSheet.create({
  button: {
    flex: 0.3,
    flexDirection: 'row',
    borderBottomRightRadius: Metrics.smallContainerRadius,
    borderTopRightRadius: Metrics.smallContainerRadius,
    backgroundColor: Colors.silver,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // borderLeftColor: Colors.black,
    // borderLeftWidth: 0.4,
  },
});
