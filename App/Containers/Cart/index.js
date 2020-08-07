import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';
import {HeaderBar} from '../../Components/HeaderBar';
import Container from '../../Components/Container';
import styles from './styles';
import {Colors, Images} from '../../Theme';
import Loading from '../../Components/ActivityIndicator/Loading';
import CartList from '../../Components/List/CartList';
import {acc} from 'react-native-reanimated';
import Empty from '../../Components/Empty';
import CheckBox from '../../Components/Button/CheckBox';

let Steps = ['Cart', 'Address', 'Receipt'];

let {ChevronRight, DeliveryBadge, Divider} = Images;

const Circle = ({backgroundColor, step}) => (
  <View style={[styles.circle, {backgroundColor}]}>
    <Text style={styles.stepNumber}>{step}</Text>
  </View>
);

const Stick = ({backgroundColor}) => (
  <View style={[styles.stick, {backgroundColor}]} />
);

function Cart(props) {
  let [step, setStep] = useState(0);
  let [freeDelivery, toggleDelivery] = useState(true);
  console.log('HERE', props.cart);
  // useEffect(() => {
  //   if(props.cart == true) {
  //     props.cart = {};
  //   }
  // }, [])

  function resetCart() {
    setStep(0);
    this.props.emptyCart();
  }

  function handleNext() {
    if (step == 0) {
      setStep(step + 1);
    } else if (step == 1) {
      setStep(step + 1);
      confirmOrder();
    } else {
      resetCart();
    }
  }

  function renderProgressBar() {
    return (
      <View style={styles.progressBarContainer}>
        {Steps.map((stepName, index) => {
          let isCircleFilled = false,
            isStickFilled = false;
          if (index == 0) {
            isCircleFilled = true;
            if (step >= 1) {
              isStickFilled = true;
            }
          } else if (index == 1) {
            if (step >= 1) {
              isCircleFilled = true;
            }

            if (step >= 2) {
              isStickFilled = true;
            }
          } else {
            if (step == 2) {
              isCircleFilled = true;
            }
          }
          return (
            <>
              <Circle
                step={`${index + 1}`}
                backgroundColor={
                  isCircleFilled ? Colors.primary : Colors.lightgrey
                }
              />
              {index <= 1 && (
                <Stick
                  backgroundColor={
                    isStickFilled ? Colors.primary : Colors.lightgrey
                  }
                />
              )}
            </>
          );
        })}
      </View>
    );
  }

  function renderBody() {
    if (step == 0) {
      return (
        <CartList
          data={Object.values(props.cart)}
          style={styles.bodyContainer}
          removeProduct={(product, inCart) => props.handleCart(product, inCart)}
        />
      );
    } else if (step == 1) {
      return (
        <View style={styles.bodyContainer}>

        </View>
      )
    } else {
      return (
        <View style={styles.bodyContainer}>
          
        </View>
      )
    }
  }

  function renderFooter() {
    let subtotal = 0;
    if (Object.keys(props.cart).length > 0) {
      subtotal = Object.values(props.cart)
        .map((product) => Number(product.price))
        .reduce((accumulator, value) => accumulator + value);
    }

    return (
      <View style={styles.footerContainer}>
        <View style={styles.disclaimerContainer}>
          <CheckBox
            checked={freeDelivery}
            onPress={() => toggleDelivery(!freeDelivery)}
            text={'I would like my order delivered within Karachi?'}
          />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.badgeContainer}>
            <DeliveryBadge freeDelivery={freeDelivery} />
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.price}>PKR {subtotal}</Text>
          </View>
        </View>

        <Divider />

        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          disabled={false}>
          <ChevronRight />
          <Text style={styles.buttonText}>
            {step == 0 ? 'Proceed' : step == 1 ? 'Place Order' : 'Done'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function confirmOrder() {
    console.log('yo');
  }

  if (props.isLoading) {
    return (
      <Container center>
        <Loading />
      </Container>
    );
  }

  if (Object.keys(props.cart).length == 0) {
    return (
      <Container>
        <Empty
          image={Images.emptyCart}
          title={'Your Cart is Empty'}
          text={"Looks like you haven't added any bicycles to your cart yet"}
          onPress={() => props.navigation.navigate('Shop')}
        />
      </Container>
    );
  }

  return (
    <Container>
      <HeaderBar
        toggleDrawer={() => props.navigation.toggleDrawer()}
        showCart={false}
      />
      {renderProgressBar()}
      {renderBody()}
      {renderFooter()}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  isLoading: state.market.isLoading,
  cart: state.market.cart,

  // name: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),

  emptyCart: () => dispatch(MarketActions.emptyCart()),
  // createOrder: (payload) => dispatch(MarketActions.createOrderRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
