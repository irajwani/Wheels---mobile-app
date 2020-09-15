import React, {useState, useEffect} from 'react';

import {View, Image as RNImage, Text, TouchableOpacity} from 'react-native';

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
  }, [props.addStatus, props.cart]);

  function applySort(products, sortBy) {
    if(sortBy == 'Recency') {
      return products.sort((a,b) => a.createdAt._seconds - b.createdAt._seconds)
    }
    else if(sortBy == 'Price (ascending)') {
      return products.sort((a,b) => Number(a.price) - Number(b.price))
    }
    else {
      return products.sort((a,b) => Number(b.price) - Number(a.price))
    }
  }

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
          toggleOptionDrawer={() => toggleOptionDrawer(!isDrawerVisible)}
        />
        {isDrawerVisible && (
          <View style={styles.menu}>
            {sortOptions.map((option) => {
              return (
                <TouchableOpacity
                  onPress={() => setSortBy(option)}
                  style={[styles.menuItem, {backgroundColor: sortBy == option ? Colors.white : "transparent"}]}>
                  <Text
                    style={{
                      ...Fonts.style.small,
                      color: sortBy == option ? Colors.primary : Colors.black,
                    }}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  }

  function renderAuthModal() {
    return (
      <AuthModal visible={isAuthModalVisible} toggleModal={() => toggleAuthModal(false)} navToAuth={navToAuth}/>
        
    );
  }

  if (props.isLoading) {
    return (
      <View style={[styles.container, {...Helpers.center, backgroundColor: Colors.darkwhite}]}>
        <Loading />
      </View>
    );
  }
  console.log(props.cart);
  return (
    <View style={styles.container}>
      <HeaderBar
        page={"SHOP"}
        toggleDrawer={() => props.navigation.toggleDrawer()}
        cartCount={
          props.cart
            ? Object.keys(props.cart).length
            : 0
        }
        navToCart={() => props.navigation.navigate('Cart')}
      />
      {renderSearch()}
      <ProductList
        data={applySort(props.products).filter((product) =>
          product.brand.toLowerCase().includes(searchInput) || product.type.toLowerCase().includes(searchInput)
        )}
        isUser={props.uid}
        cart={props.cart}
        onPress={navToProduct}
        handleCart={props.handleCart}
        handleLike={props.handleLike}
        toggleModal={() => toggleAuthModal(!isAuthModalVisible)}
      />

      {renderAuthModal()}
    </View>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.market.isLoading,
  addStatus: state.market.addStatus,
  products: state.market.products,
  cart: state.market.cart,

  // name: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(MarketActions.getProductsRequest()),
  storeProduct: (product) => dispatch(MarketActions.storeProductRequest(product)),
  handleLike: (payload) => dispatch(MarketActions.handleLikeRequest(payload)),
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
