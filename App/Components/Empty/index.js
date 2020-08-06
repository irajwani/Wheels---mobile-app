import React from 'react';

import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Container from '../Container';
import {Fonts, Colors, Helpers, Metrics} from '../../Theme';

export default ({image, title, text, onPress}) => (
  <Container>
    <Image source={image} style={styles.image} />
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{text}</Text>

    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Start Shopping</Text>
    </TouchableOpacity>
  </Container>
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },

  title: {
    ...Fonts.style.big,
    fontWeight: 'bold',
  },

  text: {
    ...Fonts.style.normal,
  },

  button: {
    backgroundColor: Colors.white,
    ...Helpers.center,
    padding: Metrics.baseMargin,
  },
});
