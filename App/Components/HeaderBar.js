import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {logoGreen} from '../colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Images, Colors, Fonts, Metrics, Helpers} from '../Theme';

let {BackArrow, SideBar, Cart} = Images;

const HeaderBar = ({
  toggleDrawer,
  showCart = true,
  cartCount = 0,
  navToCart = true,
}) => (
  <View
    style={[
      styles.headerContainer,
      {flex: 0.1, justifyContent: showCart ? 'space-between' : 'flex-start'},
    ]}>
    <SideBar onPress={toggleDrawer} />
 
    {showCart && (
      <View>
        <Cart onPress={navToCart} />
        {cartCount > 0 && (
          <View style={styles.cartCountContainer}>
            <Text style={styles.cartCount}>{cartCount}</Text>
          </View>
        )}
      </View>
    )}
  </View>
);

const TabHeader = ({text, button = false}) => (
  <View style={styles.tabHeader}>
    <Text style={styles.tabHeaderText}>{text}</Text>
    {button && button()}
  </View>
);

const ChatHeader = ({onPress, onNamePress, name}) => (
  <View style={styles.chatHeader}>
    <View style={{flex: 0.2}}>
      <BackArrow onPress={onPress} />
    </View>

    <View style={{flex: 0.6, ...Helpers.center}}>
      <Text
        onPress={onNamePress}
        style={{...Fonts.style.normal, fontWeight: '500', color: Colors.black}}>
        {name}
      </Text>
    </View>

    <View style={{flex: 0.2}} />
  </View>
);

export {HeaderBar, TabHeader, ChatHeader};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
  },

  cartCountContainer: {
    ...Helpers.center,
    position: 'absolute',
    zIndex: 999,
    bottom: Metrics.baseMargin,
    left: 1.5*Metrics.baseMargin,
    backgroundColor: Colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  cartCount: {
    ...Fonts.style.small,
    color: Colors.white,
  },

  logo: {
    width: 50,
    height: 50,
  },

  tabHeader: {
    // position: "relative",
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Metrics.baseMargin,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  tabHeaderText: {
    ...Fonts.style.medium,
    color: Colors.black,
    fontWeight: 'bold',
  },

  chatHeader: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    width: Metrics.screenWidth,
    flex: 0.1,

    padding: Metrics.baseMargin,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
});
