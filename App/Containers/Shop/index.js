import React, {useState, useEffect} from 'react';

import {View, Image as RNImage, Text} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';

import styles from './styles';
import Loading from '../../Components/ActivityIndicator/Loading';
import {Helpers, Fonts, Metrics, Colors, Strings, Images} from '../../Theme';

import Utils from '../../Utils';
import {AuthModal} from '../../Components/Modal';
import ProductList from '../../Components/List/ProductList';
import TutorialList from '../../Components/List/TutorialList';
import AuthButton from '../../Components/Button/AuthButton';
import {HeaderBar} from '../../Components/HeaderBar';
import SearchInput from '../../Components/Input/SearchInput';
import SortButton from '../../Components/Button/SortButton';

let {Close} = Images;

let sortOptions = ['Recency', 'Price (ascending)', 'Price (descending)'];
let Tutorial = [
  {
    image: Images.bikeSketchOne,
    text:
      'Search from a number of different socials going on around your city. Whatever your preference, Awitan has got you covered.',
  },
  {
    image: Images.bikeSketchTwo,
    text:
      'Host events and sessions to meet like minded Awitaners to broaden your circle. ',
  },
  {
    image: Images.bikeSketchThree,
    text: 'Some pretty bad description text.',
  },
];

function Shop(props) {
  let [isAuthModalVisible, toggleAuthModal] = useState(false);
  let [searchInput, handleSearchInput] = useState('');
  let [isDrawerVisible, toggleOptionDrawer] = useState(false);
  let [sortBy, setSortBy] = useState('Recency');

  function shouldShowAuthModal() {
    if (props.uid == '') {
      toggleAuthModal(true);
    }
  }

  function navToAuth() {
    toggleAuthModal(false);
    props.navigation.navigate('AuthStack');
  }

  function navToProduct(product) {
    props.navigation.navigate('Product', {product});
  }

  useEffect(shouldShowAuthModal, []);

  useEffect(() => {
    props.getProducts();
  }, []);

  function renderSearch() {
    return (
      <View style={styles.searchContainer}>
        <SearchInput
          value={searchInput}
          placeholder={'Search...'}
          onChangeText={(search) => handleSearchInput(search)}
        />
        <SortButton
          options={sortOptions}
          isDrawerVisible={isDrawerVisible}
          toggleOptionDrawer={toggleOptionDrawer}
          selectedItem={sortBy}
          onMenuItemPress={(option) => setSortBy(option)}
        />
      </View>
    );
  }

  function renderAuthModal() {
    return (
      <AuthModal visible={isAuthModalVisible}>
        <View style={styles.closeContainer}>
          <Close onPress={() => toggleAuthModal(false)} />
        </View>

        <View style={styles.modalHeader}>
          <RNImage source={Images.logo} style={styles.logo} />
          <Text style={styles.modalHeaderText}>{Strings.companyName}</Text>
        </View>

        <TutorialList data={Tutorial} />

        <View style={styles.modalFooter}>
          <AuthButton text={'Sign Up'} onPress={navToAuth} />
          <Text style={{...Fonts.style.normal}} onPress={navToAuth}>
            Already have an account? Sign In
          </Text>
        </View>
      </AuthModal>
    );
  }

  if (props.isLoading) {
    return (
      <View style={[styles.container, {...Helpers.center}]}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderBar
        toggleDrawer={() => props.navigation.toggleDrawer()}
        cartCount={
          Object.keys(props.cart).length > 0
            ? Object.keys(props.cart).length
            : 0
        }
        navToCart={() => props.navigation.navigate('Cart')}
      />
      {renderSearch()}
      <ProductList
        data={props.products.filter((product) =>
          product.name.toLowerCase().includes(searchInput),
        )}
        wishlist={props.wishlist}
        cart={props.cart}
        onPress={navToProduct}
        handleCart={props.handleCart}
        handleLike={props.handleLike}
      />

      {renderAuthModal()}
    </View>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.market.isLoading,
  products: state.market.products,
  wishlist: state.auth.profile.wishlist,
  cart: state.market.cart,

  // name: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(MarketActions.getProductsRequest()),
  handleLike: (payload) => dispatch(MarketActions.handleLikeRequest(payload)),
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
