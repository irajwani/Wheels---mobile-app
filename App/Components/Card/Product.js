import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import shadowStyles from '../../StyleSheets/shadowStyles';
import borderStyles from '../../StyleSheets/borderStyles';
import {Images, Fonts, Helpers, Colors, Metrics} from '../../Theme';
import Utils from '../../Utils';
import Badges from '../Badges';

let {CartButton, Heart} = Images;
let {PrivateBadge} = Badges;

export default ({
  product,
  index,
  isUser,
  onPress,
  inWishList,
  handleLike,
  inCart,
  handleCart,
  toggleModal,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card]}
      onPress={onPress}
      underlayColor={'transparent'}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: product.photoURL}}
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
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.type}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Heart
            filled={inWishList}
            onPress={
              isUser ? () => handleLike({id: product.id, uid: isUser, add: !inWishList}) : toggleModal
            }
          />
          <Text style={styles.price}>PKR {new Intl.NumberFormat('en-IN').format(product.price)}</Text>
          <CartButton
            inCart={inCart}
            onPress={isUser ? () => handleCart(product, inCart) : toggleModal}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

let cardWidth = Metrics.screenWidth - 2 * Metrics.baseMargin,
  cardHeight = 380;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: Metrics.mediumContainerRadius,
    backgroundColor: Colors.white,
    height: cardHeight,
    marginBottom: Metrics.baseMargin,
    ...shadowStyles.whiteCard,
    elevation: 1,
    borderColor: Colors.grey,
    borderWidth: 0.5,
    // overflow: 'hidden',
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
    ...Helpers.center,
  },

  brand: {
    ...Fonts.style.big,
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
    fontWeight: '500',
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
    elevation: 1,
    borderRadius: 20,
    padding: 5,
  },

  buttonText: {
    ...Fonts.style.small,
    color: Colors.white,
    fontWeight: '600',
  },
});
