import React, {useState, useEffect, useRef} from 'react';
import {View, ScrollView, Text, Image, TouchableOpacity} from 'react-native';

import {connect} from 'react-redux';
import MarketActions from '../../Stores/Market/Actions';
import {HeaderBar} from '../../Components/HeaderBar';
import Container from '../../Components/Container';
import styles from './styles';
import {Colors, Images, Metrics, Fonts, Strings} from '../../Theme';
import Loading from '../../Components/ActivityIndicator/Loading';
import CartList from '../../Components/List/CartList';
// import {acc} from 'react-native-reanimated';
import Empty from '../../Components/Empty';
import CheckBox from '../../Components/Button/CheckBox';
import FieldInput from '../../Components/Input/FieldInput';
import borderStyles from '../../StyleSheets/borderStyles';
import Toast from '../../Components/Toast';
import ConfettiCannon from 'react-native-confetti-cannon';
import Utils from '../../Utils';
import Account from '../../Components/Card/Account';

let Steps = ['Cart', 'Address', 'Receipt'];

let {ChevronRight, DeliveryBadge, Success, Divider, BackArrow} = Images;

let toastDuration = 2500, toastText = "Placing order...";

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

  const form = useRef();

  let paymentMethods = [{text: "Electronic funds transfer", selected: true}];
  let localShippingMethod = [{text: "Ground (Free)", selected: true}];
  let [nationalShippingMethods, setShippingMethods] = useState([{text: "Air - PKR 3000", selected: true}, {text: "Ground - PKR 1500", selected: false}]);

  let [name, setName] = useState(props.name ? props.name : '');
  let [address, setAddress] = useState('');
  let [city, setCity] = useState('');
  let [phone, setPhone] = useState('');

  let [errors, setError] = useState({name: '', address: '', city: '', phone: ''});
  let [freeDelivery, toggleDelivery] = useState(true);
  
  let [showToast, toggleToast] = useState(false);

  useEffect(() => {
    if (step == 1) {
      form.current.scrollTo({x: 0.0, y: 80, animated: true});
    } 
    // else if (step == 2) {
    //   if (confettiCannon) {
    //     confettiCannon.startConfetti();
    //   }
    // }
    // if(props.cart == true) {
    //   props.cart = {};
    // }
  }, [step]);

  function resetCart() {
    setStep(0);
    props.emptyCart();
  }

  function handleBack() {
    setStep(0);
  }

  function handleNext() {
    if (step == 0) {
      setStep(step + 1);
    } else if (step == 1) {
      setStep(step + 1);
      placeOrder();
    } else {
      resetCart();
      props.navigation.navigate('Profile');
    }
  }

  function handleInput(field, value) {
    let error = "";
    switch(field) {
        case "name":
          error = Utils.isNameValid(value);
          setName(value);
          break;
        case "address":
          error = Utils.isAddressValid(value);
          setAddress(value);
          break;
        case "city":
          error = Utils.isNameValid(value);
          setCity(value);
          break;
        default:
          error = Utils.isPhoneValid(value);
          setPhone(value);
          break;
    }
    
    setError({...errors, [field]: error});
    

  }

  function placeOrder() {
    toggleToast(true);
    let text = false;
    if (!freeDelivery) {
      let method = nationalShippingMethods.find((method) => method.selected == true);
      text = method.text;
    }
    setTimeout(() => {
      toggleToast(false);
    }, toastDuration);
    let payload = {
      products: Object.values(props.cart).map(product => ({id: product.id, photoURL: product.photoURL, type: product.type, brand: product.type, price: product.price})),
      total: Utils.calculateTotal(props.cart, freeDelivery ? 0 : text == 'Air - PKR 3000' ? 3000 : 1500),
      buyer: {
        uid: props.uid,
        name,
        address,
        city,
        phone,
      },
      freeDelivery,
      deliveryMethod: freeDelivery
        ? 'ground'
        : text == 'Air - PKR 3000'
        ? 'air'
        : 'ground',
    };
    props.createOrder(payload);
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
            <View key={String(index)} style={styles.progressBarPiece}>
              
                <Text style={[styles.progressText, {color: isCircleFilled ? Colors.primary : Colors.grey }]}>{stepName}</Text>
                {index <= 1 && (
                  <Stick
                    backgroundColor={
                      isStickFilled ? Colors.primary : Colors.grey
                    }
                  />
                )}
              
              
                  
              
            </View>
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
        <ScrollView ref={form} style={[styles.bodyContainer, styles.formContainer]} contentContainerStyle={styles.formContentContainer} >
          <Text style={styles.formHeaderText}>Shipping Method</Text>
          {freeDelivery ? renderMethods(localShippingMethod, true) : renderMethods(nationalShippingMethods)}
          <Text style={styles.formHeaderText}>Payment Method</Text>
          {renderMethods(paymentMethods, true)}
          <Account />
          <Text style={{...Fonts.style.small, fontWeight: "500", marginVertical: Metrics.baseMargin}}>*Once you have placed this order, transfer funds to {Strings.companyName}'s bank account. Upon verification of funds transfer, we shall deliver your item to the provided mailing address.</Text>

          <Text style={styles.formHeaderText}>Mailing Address</Text>

          <FieldInput
            label={'Full Name'}
            value={name}
            onChangeText={text => handleInput('name', text)}
            placeholder={'e.g. Abeer Rizvi'}
            error={errors.name}
          />

          <FieldInput
            label={'Address'}
            value={address}
            onChangeText={text => handleInput('address', text)}
            error={errors.address}
            placeholder={'e.g. B-204 Diamond Apartments, Clifton Block 5'}
            multiline
          />

          <FieldInput
            label={'City'}
            value={city}
            onChangeText={text => handleInput('city', text)}
            error={errors.city}
            placeholder={'e.g. Karachi'}
          />

          <FieldInput
            label={'Phone'}
            value={phone}
            onChangeText={text => handleInput('phone', text)}
            error={errors.phone}
            placeholder={'e.g. 03002034034'}
          />
        </ScrollView>
      );
    } else {
      return (
        <View style={[styles.bodyContainer, styles.messageContainer]}>
          <ConfettiCannon count={200} fallSpeed={5000} fadeOut origin={{x: 0, y: 0}} colors={[Colors.primary, Colors.black]} />
          <Success />
          <Text style={styles.message}>Success! Your order will be delivered within {freeDelivery ? "3-5" : "7-12"} days.</Text>
        </View>
      );
    }
  }

  function renderMethods(methods, isStatic = false) {
    return methods.map((method, index) => (
      <View key={String(index)} style={styles.shippingRow}>
        <CheckBox
          checked={method.selected}
          onPress={
            isStatic
              ? () => {}
              : () =>
                  setShippingMethods([
                    {
                      text: 'Air - PKR 3000',
                      selected: method.text == 'Air - PKR 3000' ? true : false,
                    },
                    {
                      text: 'Ground - PKR 1500',
                      selected: method.text == 'Air - PKR 3000' ? false : true,
                    },
                  ])
          }
          text={method.text}
        />
      </View>
    ));
  }

  function renderFooter() {
    let subtotal = 0;
    if (Object.keys(props.cart).length > 0) {
      subtotal = Utils.calculateTotal(props.cart);
    }

    return (
      <View style={[styles.footerContainer, {flex: step < 2 ? 0.4 : 0.2}]}>

        {step < 2 && (
          <>
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
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.price}>PKR {subtotal}</Text>
                {!freeDelivery && <Text style={{...Fonts.style.small, alignSelf: 'center'}}>+ {nationalShippingMethods.find(method => method.selected == true) == {text: "", selected: true} ? "1500" : "3000"} Courier Fee</Text>}
              </View>
              
            </View>
          </View>
          </>
          )
        }

        <View style={styles.buttonsContainer}>
          {step == 1 && (
            <TouchableOpacity
              style={[styles.button, {flex: 0.3, backgroundColor: Colors.white, borderTopLeftRadius: Metrics.smallContainerRadius, borderBottomLeftRadius: Metrics.smallContainerRadius,}]}
              onPress={handleBack}
              disabled={false}>
              <BackArrow />
            </TouchableOpacity>  
          )}
          <TouchableOpacity
            style={[styles.button, {flex: step == 1 ? 0.7 : 1, backgroundColor: Colors.primary}, step == 1 ? {borderTopRightRadius: Metrics.smallContainerRadius, borderBottomRightRadius: Metrics.smallContainerRadius,} : {borderRadius: Metrics.smallContainerRadius}]}
            onPress={handleNext}
            disabled={step == 1 ? Object.values(errors).find((error) => error) || !name || !city || !address || !city ? true : false : false}>
            <ChevronRight />
            <Text style={styles.buttonText}>
              {step == 0 ? 'Proceed' : step == 1 ? 'Place Order' : 'Done'}
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    );
  }

  if (props.isLoading) {
    return (
      <Container center style={{backgroundColor: Colors.darkwhite}}>
        <Loading />
        {showToast && <Toast text={toastText} />}
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
        page={"CART"}
        toggleDrawer={() => props.navigation.toggleDrawer()}
        showCart={false}
      />
      {renderProgressBar()}
      {renderBody()}
      {renderFooter()}
      {showToast && <Toast text={toastText} />}
    </Container>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,
  isLoading: state.market.isLoading,
  cart: state.market.cart,

  name: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({
  handleCart: (product, inCart) =>
    dispatch(MarketActions.handleCartRequest(product, inCart)),

  emptyCart: () => dispatch(MarketActions.emptyCart()),
  createOrder: (payload) => dispatch(MarketActions.createOrderRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
