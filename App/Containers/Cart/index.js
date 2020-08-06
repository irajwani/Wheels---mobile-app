import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';
import {HeaderBar} from '../../Components/HeaderBar';
import Container from '../../Components/Container';
import styles from './styles';
import {Colors} from '../../Theme';
import Loading from '../../Components/ActivityIndicator/Loading';
import CartList from '../../Components/List/CartList';
import {acc} from 'react-native-reanimated';
import Empty from '../../Components/Empty';

let Steps = ['Cart', 'Address', 'Receipt'];

const Circle = ({backgroundColor, step}) => (
  <View style={[styles.circle, {backgroundColor}]}>
    <Text style={styles.stepNumber}>{step}</Text>
  </View>
);

function Stick({backgroundColor}) {
  <View style={[styles.stick, {backgroundColor}]} />;
}

function Cart(props) {
  let [step, setStep] = useState(0);

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
      return <View />;
    } else {
      return <View />;
    }
  }

  function goNext() {
    if (step < 2) {
      setStep(step + 1);
    } else {
      confirmOrder();
    }
  }

  function renderFooter() {
    let subtotal = Object.values(props.cart)
      .map((product) => product.price)
      .reduce((accumulator, value) => accumulator + value);
    return (
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={goNext}
          disabled={false}>
          <Text style={styles.buttonText}>
            {step == 2 ? 'Place Order' : 'Proceed'}
          </Text>
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>PKR {subtotal}</Text>
        </View>
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

  if (!props.cart) {
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
  // createOrder: (payload) => dispatch(MarketActions.createOrderRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
