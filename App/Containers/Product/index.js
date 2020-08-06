import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Container from '../../Components/Container';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';

const inputRange = [0, 160, 280];

import styles from './styles';
import {Colors, Images, Metrics} from '../../Theme';

let {AnimatedBackArrow, Heart} = Images;

function Product(props) {
  let [scrollY, setScrollY] = useState(new Animated.Value(0));

  function renderFeatures(features) {
    return (
      <FlatList
        data={features}
        renderItem={(feature) => {
          if (feature.value) {
            let image;
            switch (feature.type) {
              case 'Wheel Size':
                image = require('../../Assets/Images/wheel-size.jpg');
                break;
              default:
                image = require('../../Assets/Images/frame-width.png');
                break;
            }
            return (
              <View style={styles.featureCard}>
                <Image source={image} style={styles.featureImage} />
                <Text style={styles.featureText}>{feature.value}"</Text>
              </View>
            );
          }
        }}
        keyExtractor={(item, index) => index}
        style={styles.featuresScroll}
        contentContainerStyle={styles.featuresContentScroll}
        horizontal
      />
    );
  }

  const _getHeaderColor = () => {
    return scrollY.interpolate({
      inputRange,
      outputRange: ['transparent', 'transparent', Colors.white],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const _getArrowColor = () => {
    return scrollY.interpolate({
      inputRange,
      outputRange: [Colors.white, Colors.grey, Colors.black],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const _getHeaderOpacity = () => {
    return scrollY.interpolate({
      inputRange,
      outputRange: [0, 0.1, 1],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  const headerColor = _getHeaderColor();
  const arrowColor = _getArrowColor();

  let product = props.navigation.getParam('product');
  let {photoURL, name, description, features, price} = product;
  let inWishList = props.wishlist
    ? props.wishlist.includes(product.id)
      ? true
      : false
    : false;

  let inCart = props.cart
    ? props.cart.includes(product)
      ? true
      : false
    : false;

  return (
    <Container>
      <Animated.View
        style={[styles.headerContainer, {backgroundColor: headerColor}]}>
        <AnimatedBackArrow
          onPress={() => props.navigation.goBack()}
          color={arrowColor}
        />

        <Heart
          filled={inWishList}
          onPress={() => props.handleLike({id: product.id, inWishList})}
        />
      </Animated.View>

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {y: scrollY}},
          },
        ])}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'http://loremflickr.com/640/480/bike'}}
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
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.detail}>{description}</Text>

          {renderFeatures(features)}
        </View>
      </Animated.ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>PKR {price}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.handleCart(product, inCart)}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.market.isLoading,
  wishlist: state.auth.profile.wishlist,
  cart: state.market.cart,
});

const mapDispatchToProps = (dispatch) => ({
  handleLike: (payload) => dispatch(MarketActions.handleLikeRequest(payload)),
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
