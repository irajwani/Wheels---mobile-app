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

const Triangle = ({extraStyles}) => (
  <View style={[styles.triangle, extraStyles]} />
);

const Parallelogram = ({text, right = null, left = null, color, textColor}) => (
  <View style={[styles.parallelogram, {right, left}]}>
    <Triangle extraStyles={{...styles.parallelogramRight, borderBottomColor: color}} />
    <View style={[styles.parallelogramInner, {backgroundColor: color}]}>
      <Text style={[styles.brand, {color: textColor}]}>{text}</Text>
    </View>
    <Triangle extraStyles={{...styles.parallelogramLeft, ...styles.triangleDown, borderBottomColor: color}} />
  </View>
);

const Circle = ({children, right = null, left = null}) => (
  <View style={[styles.circle, {right, left}, left == 0 ? {borderBottomRightRadius: circleSize/2} : {borderBottomLeftRadius: circleSize/2}]}>
    {children}
  </View>
)

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
          resizeMethod="auto"
          resizeMode="cover"
        />

      <Circle left={0}>
        <Heart
        filled={inWishList}
        onPress={
          isUser ? () => handleLike({id: product.id, uid: isUser, add: !inWishList}) : toggleModal
        }
        /> 
      </Circle>
      <Circle right={0}>
        {product.sold ? 
        <Text style={styles.sold}>Sold</Text>
        :
        <CartButton
          inCart={inCart}
          onPress={isUser ? () => handleCart(product, inCart) : toggleModal}
        />
        }
      </Circle>
      {/* <Parallelogram text={product.brand} left={30} color={Colors.primary} textColor={Colors.white} /> */}
      <Parallelogram text={"PKR " + product.price} right={30} color={Colors.primary} textColor={Colors.white} />

    </TouchableOpacity>
  );
};

let cardWidth = Metrics.screenWidth - 2 * Metrics.baseMargin,
  cardHeight = 270,
  parWidth = 140,
  parHeight = 35,
  circleSize = 50;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    borderRadius: Metrics.mediumContainerRadius,
    backgroundColor: Colors.darkwhite,
    height: cardHeight,
    marginBottom: 2*Metrics.baseMargin,
    ...shadowStyles.whiteCard,
    elevation: 1,
    borderColor: Colors.lightgrey,
    borderWidth: 1,
    // overflow: 'visible',
  },

  imageContainer: {
    // ...Helpers.center,
    // ...borderStyles.mediumBottomBorder
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    overflow: 'hidden',
    borderRadius: Metrics.mediumContainerRadius,
    // borderTopLeftRadius: Metrics.mediumContainerRadius,
    // borderTopRightRadius: Metrics.mediumContainerRadius,
  },

  bodyContainer: {
    flexDirection: 'row',
    flex: 0.35,
    paddingTop: Metrics.baseMargin / 2,
    paddingHorizontal: Metrics.baseMargin,
  },

  leftHalf: {
    flex: 0.5,
  },

  

  brand: {
    ...Fonts.style.normal,
    fontWeight: "500",
  },

  name: {
    ...Fonts.style.normal,
    color: Colors.grey,
  },

  rightHalf: {
    flex: 0.5,
    alignItems: 'flex-end',
  },

  price: {
    ...Fonts.style.normal,
    fontWeight: '500',
    color: Colors.green,
    // marginTop: Metrics.baseMargin/2
  },

    sold: {
      ...Fonts.style.normal, color: Colors.error, fontWeight: "bold",
    transform: [{ rotate: "-37deg" }],
    // backgroundColor: Colors.error,
    padding: Metrics.baseMargin/2,
    borderRadius: Metrics.smallContainerRadius,
    borderStyle: 'dashed',
    borderColor: Colors.white,
    
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

  parallelogram: {
    position: 'absolute',
    bottom: -(parHeight/3),
    width: parWidth,
    height: parHeight,
    backgroundColor: Colors.white,
    overflow: 'visible',
  },
  parallelogramInner: {
    position: 'absolute',
    right: 0,
    top: 0,
    // backgroundColor: Colors.bloodorange,
    width: parWidth,
    height: parHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  parallelogramRight: {
    top: 0,
    right: -(parHeight/2),
    position: 'absolute'
  },
  parallelogramLeft: {
    top: 0,
    left: -(parHeight/2),
    position: 'absolute'
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: parHeight/2,
    borderRightWidth: parHeight/2,
    borderBottomWidth: parHeight,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    // borderBottomColor: Colors.bloodorange,
  },

  triangleDown: {
    transform: [
      {rotate: '180deg'}
    ]
  },

  circle: {
    width: circleSize,
    height: circleSize,
    ...Helpers.center,
    elevation: 1,
    ...shadowStyles.menu,
    backgroundColor: Colors.white,
    top: 0,
    
    position: 'absolute'
  }

});
