import React from 'react';

import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Container from '../Container';
import {Fonts, Colors, Helpers, Metrics} from '../../Theme';

export default ({image, title, text, onPress}) => (
  <Container style={styles.container}>
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>Start Shopping</Text>
    </TouchableOpacity>
  </Container>
);

const styles = StyleSheet.create({
  container: {
    margin: Metrics.baseMargin,
  },

  imageContainer: {
    flex: 0.5,
    ...Helpers.center,
  },

  image: {
    width: 200,
    height: 200,
  },

  textContainer: {
    flex: 0.3,
    ...Helpers.center,
  },

  title: {
    ...Fonts.style.big,
    fontWeight: 'bold',
  },

  text: {
    ...Fonts.style.normal,
    textAlign: 'center',
  },

  button: {
    backgroundColor: Colors.white,
    ...Helpers.center,
    marginTop: 2 * Metrics.baseMargin,
    padding: Metrics.baseMargin,
    borderWidth: 1,
    alignSelf: 'center',
  },
});
