import React, {useState, useEffect} from 'react';

import {View, Image as RNImage, Text, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';

import {withNavigationFocus} from 'react-navigation';
// import {useFocusEffect} from '@react-navigation/native';
import Container, {ScrollContainer} from '../../Components/Container';
import Loading from '../../Components/ActivityIndicator/Loading';
import {AuthModal} from '../../Components/Modal';
import {HeaderBar} from '../../Components/HeaderBar';
import OrdersList from '../../Components/List/OrdersList';
import ProgressiveImage from '../../Components/ProgressiveImage';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import {connect} from 'react-redux';
import AuthActions from '../../Stores/Auth/Actions';
import MarketActions from '../../Stores/Market/Actions';
import {Images, Colors} from '../../Theme';

import styles from './styles';
import WishList from '../../Components/List/WishList';

function Profile(props) {
  let [isAuthModalVisible, toggleAuthModal] = useState(true);

  useEffect(() => {
    if (props.uid) {
      toggleAuthModal(false);
      props.getOrders(props.uid);
    }
  }, []);

  useEffect(() => {
    console.log('focused');
    if (!props.uid) {
      toggleAuthModal(true);
    }
  }, [props.isFocused]);

  useEffect(() => {
    props.getOrders(props.uid);
  }, [props.addStatus]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     console.log('focused');
  //     if (!props.uid) {
  //       toggleAuthModal(true);
  //     }

  //     return () => {
  //       console.log('unfocused')
  //     };
  //   }, [])
  // );

  function navToAuth() {
    toggleAuthModal(false);
    props.navigation.navigate('AuthStack');
  }

  function navToShop() {
    toggleAuthModal(!isAuthModalVisible);
    props.navigation.navigate('Shop');
  }

  function logOut() {
    auth()
      .signOut()
      .then(() => {
        props.logOut();
        props.navigation.navigate('SplashScreen');
      });
  }

  function renderProfile() {
    return (
      <View style={styles.profileContainer}>
        <ProgressiveImage
          thumbnailSource={Images.smallProfile}
          source={{uri: props.photoURL}}
          style={styles.profilePicture}
        />
        <Text style={styles.profileName}>{props.name}</Text>
        <TouchableOpacity style={styles.logOutButton} onPress={logOut}>
          <Text style={styles.logOut}>Log Out</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderWishList() {
    return (
      <View style={styles.wishListContainer}>
        <Text style={styles.title}>Favorites</Text>
        <WishList
          data={props.products.filter((product) =>
            product.likes.includes(props.uid),
          )}
        />
      </View>
    );
  }

  function renderOrders() {
    return (
      <View style={styles.ordersContainer}>
        <Text style={styles.title}>Orders</Text>
        <OrdersList data={props.orders} updateOrder={props.updateOrder} />
      </View>
    );
  }

  if (!props.uid) {
    return (
      <Container>
        <AuthModal
          isStatic={true}
          visible={isAuthModalVisible}
          toggleModal={() => toggleAuthModal(!isAuthModalVisible)}
          navToAuth={navToAuth}
          navToShop={navToShop}
        />
      </Container>
    );
  }

  if (props.isLoading) {
    return (
      <Container center style={{backgroundColor: Colors.darkwhite}}>
        <Loading />
      </Container>
    );
  }

  return (
    <ScrollContainer>
      <HeaderBar
        page={'PROFILE'}
        toggleDrawer={() => props.navigation.toggleDrawer()}
      />

      {renderProfile()}
      {renderWishList()}
      {renderOrders()}

      <AuthModal
        isStatic={true}
        visible={isAuthModalVisible}
        toggleModal={() => toggleAuthModal(!isAuthModalVisible)}
        navToAuth={navToAuth}
        navToShop={navToShop}
      />
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.market.isLoading,
  products: state.market.products,
  orders: state.market.orders,

  name: state.auth.profile.profile.displayName,
  photoURL: state.auth.profile.profile.photoURL,

  addStatus: state.market.addStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getOrders: (uid) => dispatch(MarketActions.getOrdersRequest(uid)),

  updateOrder: (id) => dispatch(MarketActions.updateOrderRequest(id)),

  logOut: () => dispatch(AuthActions.logOut()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNavigationFocus(Profile));
