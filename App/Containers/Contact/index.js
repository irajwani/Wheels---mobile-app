import React, {useState} from 'react';
import {View, Text} from 'react-native';

import styles from './styles';
import {Colors, Images, Metrics, Fonts, Strings} from '../../Theme';

import {connect} from 'react-redux';
import ContactActions from '../../Stores/Contact/Actions';

import FieldInput from '../../Components/Input/FieldInput';
import Utils from '../../Utils';
import {ScrollContainer} from '../../Components/Container';

import HTML from 'react-native-render-html';
import SimpleButton from '../../Components/Button/SimpleButton';

let Details = [
    {field: 'email', value: Strings.Email},
    {field: 'phone', value: Strings.Phone},
    {field: 'address', value: Strings.Address},
];

let MapHTML = `
<iframe
  width="600"
  height="450"
  frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBUkOB1x1F-bsZcGDnxXQI76JbU-4n8vqI&q=Space+Needle,Seattle+WA" allowfullscreen>
</iframe>`;

function Contact(props) {
  let [name, setName] = useState(props.displayName ? props.displayName : '');
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

  return (
    <ScrollContainer>

      <View style={styles.mapContainer}>
        <HTML html={MapHTML} />
      </View>

      {Details.map((detail) => (
        <Text style={styles.field}>
          {detail.field}
          <Text style={styles.value}>{detail.value}</Text>
        </Text>
      ))}

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
        text={'Send'}
        disabled={Object.values(errors).find((error) => error)}
        onPress={() => props.sendMessage({name, email, message})}
      />

      

      
    </ScrollContainer>
  );
}

const mapStateToProps = (state) => ({
  displayName: state.auth.profile.profile.displayName,
});

const mapDispatchToProps = (dispatch) => ({
    sendMessage: (payload) => dispatch(ContactActions.sendMessageRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
