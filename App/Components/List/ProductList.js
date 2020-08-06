import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Product from '../Card/Product';
import {Helpers, Fonts, Metrics} from '../../Theme';

const ProductList = ({
  data,
  wishlist,
  cart,
  onPress,
  handleLike,
  handleCart,
  style = null,
}) => (
  <Animated.FlatList
    style={[styles.cardsContainer, style]}
    contentContainerStyle={styles.cardsContentContainer}
    data={data}
    showsVerticalScrollIndicator={true}
    renderItem={(item, index) => (
      <Product
        product={item.item}
        index={index}
        onPress={() => onPress(item.item)}
        inCart={cart ? (cart.includes(item.item) ? true : false) : false}
        inWishList={
          wishlist ? (wishlist.includes(item.item.id) ? true : false) : false
        }
        handleLike={handleLike}
        handleCart={handleCart}
      />
    )}
    keyExtractor={(item, index) => index}
    numColumns={1}
    ListEmptyComponent={() => (
      <View style={{...Helpers.center}}>
        <Text style={{...Fonts.style.normal}}>Such empty, much wow!</Text>
      </View>
    )}
  />
);

export default ProductList;

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 0.8,
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.baseMargin,
  },
  cardsContentContainer: {
    alignItems: 'center',
    // flex: 1,
    // flexGrow: 1,
  },
});