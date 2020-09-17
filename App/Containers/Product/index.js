import React, {useState} from 'react';
import {
  Image as RNImage,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';

import Lightbox from 'react-native-lightbox';

import * as Animatable from 'react-native-animatable';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Container from '../../Components/Container';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';

const inputRange = [0, 80, 190];

import styles from './styles';
import {Colors, Images, Metrics} from '../../Theme';
import {AuthModal} from '../../Components/Modal';
import Loading from '../../Components/ActivityIndicator/Loading';
import LikeButton from '../../Components/Button/LikeButton';

let {AnimatedBackArrow, AnimatedHeart} = Images;

function Product(props) {
  let product = props.navigation.getParam('product');

  //Static Properties
  let {
    id,
    photoURL,
    type,
    brand,
    body,
    dimensions,
    color,
    price,
    sold,
    // likes,
  } = product;
  console.log('HERE');
  console.log(product);
  //Dynamic properties
  let [likes, updateLikes] = useState(product.likes);

  let [scrollY, setScrollY] = useState(new Animated.Value(0));
  let [isAuthModalVisible, toggleAuthModal] = useState(false);

  let inWishList = likes.includes(props.uid);

  let inCart = props.cart
  ? Object.keys(props.cart).includes(product.id)
    ? true
    : false
  : false;

  function navToAuth() {
    toggleAuthModal(false);
    props.navigation.navigate('AuthStack');
  }

  function renderFeatures(features) {
    // console.log(features);
    return (
      <FlatList
        data={features}
        renderItem={(item) => {
          let feature = item.item;
          let color = Colors.white;
          console.log(feature);
          if (feature.value) {
            let image;
            switch (feature.name) {
              case 'Frame':
                image = require('../../Assets/Images/frame.png');
                color = Colors.darkwhite;
                break;
              case 'Gear System':
                image = require('../../Assets/Images/gear.png');
                break;
              case 'Brakes':
                image = require('../../Assets/Images/brakes.png');
                color = Colors.darkwhite;
                break;
              case 'Shocks':
                image = require('../../Assets/Images/shocks.png');
                feature.value = 'Shocks';
                break;
              case 'Frame Width':
                image = require('../../Assets/Images/frame.png');
                color = Colors.darkwhite;
                break;
              default:
                //Wheel Size
                image = require('../../Assets/Images/wheel-size.png');
                color = Colors.darkwhite;
                break;
            }
            return (
              <View style={[styles.featureCard, {backgroundColor: color}]}>
                <RNImage source={image} style={styles.featureImage} />
                <Text style={styles.featureText}>{feature.value}</Text>
              </View>
            );
          }
        }}
        keyExtractor={(item, index) => String(index)}
        style={styles.featuresScroll}
        contentContainerStyle={styles.featuresContentScroll}
        horizontal
        showsHorizontalScrollIndicator
        alwaysBounceHorizontal
        persistentScrollbar
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

  if (props.isLoading) {
    <Container center style={{backgroundColor: Colors.darkwhite}}>
      <Loading />
    </Container>;
  }

  const headerColor = _getHeaderColor();
  const arrowColor = _getArrowColor();

  return (
    <Container>
      <Animated.View
        style={[styles.headerContainer, {backgroundColor: headerColor}]}>
        <AnimatedBackArrow
          onPress={() => props.navigation.goBack()}
          color={arrowColor}
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
          <Lightbox 
              springConfig={{tension: 30, friction: 7}}
              // renderHeader={this.renderCloseHeader}
              >
            <Image
              source={{uri: photoURL}}
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
              resizeMode="contain"
            />
          </Lightbox>
        </View>

        <View style={styles.bodyContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{brand}</Text>
              <Text style={styles.detail}>{type}</Text>
            </View>

            {/* <View style={styles.likeButtonContainer}>
              <LikeButton
                text={String(likes.length)}
                inWishList={inWishList}
                onPress={
                  props.uid
                    ? () => {
                        props.handleLike({
                          id: product.id,
                          uid: props.uid,
                          add: !inWishList,
                        });

                        if (inWishList) {
                          updateLikes(likes.filter((uid) => uid != props.uid));
                          // product = {...product, likes: product.}
                        } else {
                          updateLikes(likes.push(props.uid));
                        }
                      }
                    : () => toggleAuthModal(true)
                }
              />
            </View> */}
          </View>

          {renderFeatures(body)}
          {renderFeatures(dimensions)}
        </View>
      </Animated.ScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>PKR {price}</Text>
        </View>
        <TouchableOpacity
          disabled={sold ? true : false}
          style={[
            styles.button,
            {backgroundColor: sold ? Colors.lightgrey : !inCart ? Colors.primary : Colors.bloodorange},
          ]}
          onPress={() => props.handleCart(product, inCart)}>
          <Text style={styles.buttonText}>
            {sold ? 'Sold' : !inCart ? 'Add To Cart' : 'Remove from cart'}
          </Text>
        </TouchableOpacity>
      </View>

      <AuthModal
        visible={isAuthModalVisible}
        toggleModal={() => toggleAuthModal(false)}
        navToAuth={navToAuth}
      />
    </Container>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.market.isLoading,
  cart: state.market.cart,
  products: state.market.products,
  product: state.market.product,
});

const mapDispatchToProps = (dispatch) => ({
  handleLike: (payload) => dispatch(MarketActions.handleLikeRequest(payload)),
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),
  getProducts: () => dispatch(MarketActions.getProductsRequest()),
  storeProduct: (product) =>
    dispatch(MarketActions.storeProductRequest(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
