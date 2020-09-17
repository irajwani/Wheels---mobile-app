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
import {Helpers, Fonts, Metrics, Images, Colors} from '../../Theme';

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
      let {photoURL, brand, price} = item.item;
      return (
      <View key={String(index)} style={styles.productContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: photoURL}}
            style={styles.image}
            indicator={ProgressBar}
            indicatorProps={{
              width: styles.image.width,
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
          <Text style={styles.name}>{brand}</Text>
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
    flexGrow: 0.4,
    // flex: 0.4,
    // backgroundColor: 'red',
    // overflow: 'hidden'
  },
  cartContentContainer: {
    // flexGrow: 1
    
  },

    productContainer: {
      flexDirection: 'row',
      marginBottom: Metrics.baseMargin,
    },

      imageContainer: {
        flex: 0.45,
    
        // ...Helpers.center,
        // ...borderStyles.mediumBottomBorder
      },
        image: {
          width: 120,
          height: 100,
          overflow: 'hidden',
          borderRadius: Metrics.mediumContainerRadius,
        },

      textContainer: {
        flex: 0.45,
        paddingHorizontal: Metrics.baseMargin,
        
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
