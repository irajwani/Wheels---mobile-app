import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {Images, Colors, Fonts, Metrics, Helpers} from '../Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

let {BackArrow, SideBar, Cart} = Images;

const HeaderBar = ({
  page,
  toggleDrawer,
  showCart = true,
  cartCount = 0,
  navToCart = () => {},
  tint = false,
}) => (
  <View
    style={[
      styles.headerContainer,
      {flex: 0.1, justifyContent: 'space-between', backgroundColor: tint ? Colors.primary : Colors.white},
    ]}>
    <SideBar onPress={toggleDrawer} color={tint ? Colors.white : Colors.black} />
    <Text style={{...Fonts.style.big, letterSpacing: 1.5, color: tint ? Colors.white : Colors.black}}>{page}</Text>
    {showCart && (
      <View>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={navToCart}>
          {cartCount > 0 && (
            <View style={styles.cartCountContainer}>
              <Text style={styles.cartCount}>{cartCount}</Text>
            </View>
          )}
          <Cart />
        </TouchableOpacity>
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
    paddingVertical: Metrics.baseMargin/2
  },

  cartCountContainer: {
    ...Helpers.center,
    backgroundColor: Colors.primary,
    width: 24,
    height: 24,
    borderRadius: Metrics.smallContainerRadius,
  },

  cartCount: {
    ...Fonts.style.normal,
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
