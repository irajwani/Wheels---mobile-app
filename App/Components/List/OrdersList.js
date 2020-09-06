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
import Utils from '../../Utils';
import AuthButton from '../Button/AuthButton';
import SimpleButton from '../Button/SimpleButton';

let {Trash, Divider} = Images;

const OrdersList = ({
  data,
  updateOrder
}) => (
  <Animated.FlatList
    style={[styles.container]}
    contentContainerStyle={styles.contentContainer}
    data={data}
    showsVerticalScrollIndicator={true}
    renderItem={({item}) => {
      let {status} = item;
      let statusText;
      switch(status) {
        case "store":
          statusText = "In Store (Your order is being prepared for delivery)";
          break;
        case "transit":
          statusText = "In Transit";
          break;
        default:
          statusText = "Delivered";
          break;
      }
      return (
          <View style={styles.orderContainer}>
            <View style={styles.dateContainer}>
                <Text>Placed at: {Utils.easyTime(item.date._seconds, true)}</Text>
                <Text>Total: PKR {item.total}</Text>
            </View>

            <Divider />

            <View style={styles.productsContainer}>
                {item.products.map((product) => {
                    let {photoURL, brand, type, price} = product;
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
                            <Text style={styles.brand}>{brand}</Text>
                            <Text style={styles.type}>{type}</Text>
                            <Text style={styles.price}>PKR {price}</Text>
                        </View>

                        
                            
                        
                    </View>
                    )
                })}
            </View>

            <Divider />

            <Text style={{...Fonts.style.normal, marginBottom: 0.5*Metrics.baseMargin}}>Status: <Text style={{...Fonts.style.normal, fontWeight: "500", color: status == "store" ? Colors.bloodorange : status == 'transit' ? Colors.green : Colors.primary}}>{statusText}</Text></Text>
            {status == "transit" && 
                <SimpleButton 
                  text={"Have you received your order?"}
                  onPress={() => updateOrder(item.id)}
                />
            } 
          </View>
      )  
    }}
    keyExtractor={(item, index) => index}
    numColumns={1}
    ListEmptyComponent={() => (
      <View style={{...Helpers.center}}>
        <Text style={{...Fonts.style.normal}}>No Orders!</Text>
      </View>
    )}
  />
);

export default OrdersList;

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

  orderContainer: {
    backgroundColor: Colors.white,
    padding: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.lightgrey,
    borderRadius: Metrics.mediumContainerRadius,
    marginBottom: Metrics.baseMargin,
  },

  dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },

  productsContainer: {

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
        flex: 0.55,
        paddingHorizontal: Metrics.baseMargin,
        justifyContent: 'space-between',
      },

        brand: {
          ...Fonts.style.normal,
          fontWeight: "500"
        },

        type: {
          ...Fonts.style.normal,
        },

        price: {
          ...Fonts.style.normal,
          fontWeight: "500",
          textAlign: 'right',
        },


  
});
