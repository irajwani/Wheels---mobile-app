
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

const WishList = ({
  data,
}) => (
  <Animated.FlatList
    horizontal
    style={[styles.container]}
    contentContainerStyle={styles.contentContainer}
    data={data}
    showsHorizontalScrollIndicator
    renderItem={({item}) => {
      let {photoURL, brand, price} = item;
      return (
      <View style={styles.productContainer}>
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

      </View>
    )}}
    keyExtractor={(item, index) => index}
    numColumns={1}
    ListEmptyComponent={() => (
      <View>
        <Text style={{...Fonts.style.normal}}>You haven't liked any items yet!</Text>
      </View>
    )}
  />
);

export default WishList;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 0.4,
    // flex: 0.4,
    // backgroundColor: 'red',
    // overflow: 'hidden'
  },
  contentContainer: {
    // flexGrow: 1
    
  },

    productContainer: {
      marginRight: Metrics.baseMargin,
    },

      imageContainer: {
        flex: 0.7,
        ...Helpers.center,
        // ...borderStyles.mediumBottomBorder
      },

        image: {
          // ...StyleSheet.absoluteFillObject,
          width: 160,
          height: 104,
          overflow: 'hidden',
          borderRadius: Metrics.smallContainerRadius,
        },

      textContainer: {
        flex: 0.3,
        marginTop: Metrics.baseMargin,
        
      },

        name: {
          ...Fonts.style.normal,
        },

        price: {
          ...Fonts.style.normal,
          fontWeight: "500",
          color: Colors.secondary,
        },


  
});
