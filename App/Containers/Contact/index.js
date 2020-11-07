import React, {useState} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import styles from './styles';
import {Colors, Images, Metrics, Fonts, Strings} from '../../Theme';

import {connect} from 'react-redux';

import FieldInput from '../../Components/Input/FieldInput';
import Utils from '../../Utils';
import Container, {ScrollContainer} from '../../Components/Container';

import HTML from 'react-native-render-html';
import SimpleButton from '../../Components/Button/SimpleButton';
import Toast from '../../Components/Toast';

import contactService from '../../Services/ContactService';
import {HeaderBar} from '../../Components/HeaderBar';
import Loading from '../../Components/ActivityIndicator/Loading';

let {Email, Phone, Address} = Images;

let toastDuration = 2500,
  toastText = 'Message Sent!';

let Details = [
  {field: 'Email', icon: () => <Email />, value: Strings.Email},
  {field: 'Phone', icon: () => <Phone />, value: Strings.Phone},
  {field: 'Address', icon: () => <Address />, value: Strings.Address},
];

function Contact(props) {
  let [isLoading, toggleLoading] = useState(false);
  let [showToast, toggleToast] = useState(false);
  let [name, setName] = useState(props.name ? props.name : '');
  let [email, setEmail] = useState('');
  let [message, setMessage] = useState('');

  let [errors, setError] = useState({name: '', email: '', message: ''});

  function handleInput(field, value) {
    let error = '';
    switch (field) {
      case 'name':
        error = Utils.isNameValid(value);
        setName(value);
        break;
      case 'email':
        error = Utils.isEmailValid(value);
        setEmail(value);
        break;
      default:
        error = Utils.isNameValid(value);
        setMessage(value);
        break;
    }

    setError({...errors, [field]: error});
  }

  async function sendMessage() {
    toggleLoading(!isLoading);
    let response = await contactService.sendMessage({name, email, message});
    console.log("HERE");
    console.log(response);
    if (response.status == 200) {
      toggleToast(!showToast);
      setTimeout(() => {
        toggleToast(!showToast);
      }, toastDuration);
      toggleLoading(false);
    } else {
      toggleLoading(false);
    }
  }

  const renderDetails = () => (
    <View style={styles.detailsContainer}>
      {Details.map((detail, index) => (
        <View key={String(index)} style={styles.detailContainer}>
          
          {detail.icon()}
          
          <Text style={styles.detailText}>{detail.value}</Text>
          
        </View>
      ))}
    </View>
  );

  const renderMap = () => (
    <View style={styles.mapContainer}>
      <Text style={styles.detailText}>Visit Cycling Rack on Badar Commercial for greater selection, bicycle repairs, stickers, decals, and other customization options.</Text>
      <Image source={Images.map} style={styles.map} />
    </View>
  );

  if (isLoading) {
    return (
      <Container center style={{backgroundColor: Colors.darkwhite}}>
        <Loading />
        {showToast && <Toast text={toastText} />}
      </Container>
    );
  }

  return (
    <ScrollContainer style={{backgroundColor: Colors.primary}}>
      <HeaderBar
        tint
        page={'CONTACT US'}
        toggleDrawer={() => props.navigation.toggleDrawer()}
        showCart={false}
      />

      {renderDetails()}
      {renderMap()}

      <View style={styles.formContainer}>
        <Text style={{...Fonts.style.big, color: Colors.white}}>For questions, details about orders or any other concern, please send us a message. Our representative will get back to you within 3 business days.</Text>
        <FieldInput
          label={'Email'}
          value={email}
          onChangeText={(text) => handleInput('email', text)}
          placeholder={'john.doe@example.com'}
          error={errors.email}
        />

        <FieldInput
          label={'Full Name'}
          value={name}
          onChangeText={(text) => handleInput('name', text)}
          placeholder={'e.g. Abeer Rizvi'}
          error={errors.name}
        />

        <FieldInput
          label={'Message'}
          value={message}
          onChangeText={(text) => handleInput('message', text)}
          placeholder={''}
          multiline
          error={errors.message}
        />

        <SimpleButton
          text={'Send Message'}
          disabled={Object.values(errors).find((error) => error)}
          onPress={sendMessage}
        />
      </View>

      {showToast && <Toast text={toastText} />}
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => ({
  name: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
