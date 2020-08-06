import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';
import {Images, Fonts, Helpers, Colors, Metrics} from '../../Theme';
import Utils from '../../Utils';
import Badges from '../Badges';

let {Cart, Heart} = Images;
let {PrivateBadge} = Badges;

export default ({
  product,
  index,
  onPress,
  inWishList,
  handleLike,
  inCart,
  handleCart,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={onPress}
      underlayColor={'transparent'}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'http://loremflickr.com/640/480/dog'}}
          style={styles.image}
          indicator={ProgressBar}
          indicatorProps={{
            borderWidth: 1,
            borderColor: Colors.primary,
            borderRadius: Metrics.baseMargin,
            color: Colors.primary,
            unfilledColor: Colors.white,
            alignSelf: 'center',
          }}
        />
      </View>

      <View style={styles.bodyContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Heart
            filled={inWishList}
            onPress={() => handleLike({id: product.id, inWishList})}
          />
          <Text style={styles.price}>PKR {product.price}</Text>
          <Cart onPress={() => handleCart(product, inCart)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

let cardWidth = Metrics.screenWidth - 2 * Metrics.baseMargin,
  cardHeight = 300;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: Metrics.mediumContainerRadius,
    backgroundColor: Colors.lightgrey,
    height: cardHeight,
  },

  imageContainer: {
    flex: 0.65,

    // ...Helpers.center,
    // ...borderStyles.mediumBottomBorder
  },
  image: {
    width: cardWidth,
    height: 0.65 * cardHeight,
    overflow: 'hidden',
    borderTopLeftRadius: Metrics.mediumContainerRadius,
    borderTopRightRadius: Metrics.mediumContainerRadius,
  },

  bodyContainer: {
    flex: 0.35,
    paddingTop: Metrics.baseMargin / 2,
    paddingHorizontal: Metrics.baseMargin,
  },

  topRow: {
    flex: 0.5,
    flexDirection: 'row',
    ...Helpers.center,
  },

  name: {
    ...Fonts.style.normal,
    color: Colors.grey,
  },

  bottomRow: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    ...Fonts.style.big,
    fontWeight: 'bold',
    // marginTop: Metrics.baseMargin/2
  },

  iconContainer: {
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  descriptionContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    marginTop: Metrics.baseMargin / 2,
  },

  description: {
    ...Fonts.style.small,
    fontWeight: '300',
  },

  button: {
    width: 90,
    ...Helpers.center,
    ...shadowStyles.whiteCard,

    borderRadius: 20,
    padding: 5,
  },

  buttonText: {
    ...Fonts.style.small,
    color: Colors.white,
    fontWeight: '600',
  },
});
