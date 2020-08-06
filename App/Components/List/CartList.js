import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Product from '../Card/Product';
import {Helpers, Fonts, Metrics, Images} from '../../Theme';

let {Trash} = Images;

const CartList = ({
  data,
  removeProduct,
  style = null,
}) => (
  <Animated.FlatList
    style={[styles.cartContainer, style]}
    contentContainerStyle={styles.cartContentContainer}
    data={data}
    showsVerticalScrollIndicator={true}
    renderItem={(item, index) => {
      let {photoURL, name, price} = item.item;
      return (
      <View style={styles.productContainer}>
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

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>PKR {price}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Trash onPress={() => removeProduct(item.item, true)}/>
        </View>
      </View>
    )}}
    keyExtractor={(item, index) => index}
    numColumns={1}
    ListEmptyComponent={() => (
      <View style={{...Helpers.center}}>
        <Text style={{...Fonts.style.normal}}>Such empty, much wow!</Text>
      </View>
    )}
  />
);

export default CartList;

const styles = StyleSheet.create({
  cartContainer: {
    // flex: 0.8,
    // marginTop: Metrics.baseMargin,
    // marginHorizontal: Metrics.baseMargin,
  },
  cartContentContainer: {
    
    // flex: 1,
    // flexGrow: 1,
  },

    productContainer: {
      flexDirection: 'row'
    },

      imageContainer: {
        flex: 0.35,
    
        // ...Helpers.center,
        // ...borderStyles.mediumBottomBorder
      },
        image: {
          width: 150,
          height: 100,
          overflow: 'hidden',
          borderRadius: Metrics.mediumContainerRadius,
        },

      textContainer: {
        flex: 0.55,
        paddingHorizontal: Metrics.baseMargin,
        alignItems: 'center'
      },

        name: {
          ...Fonts.style.normal
        },

        price: {
          ...Fonts.style.normal,
          fontWeight: "bold"
        },

      
      iconContainer: {
        flex: 0.1,
        ...Helpers.center,
      }


  
});
