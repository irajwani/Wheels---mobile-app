import React, { Component } from 'react'
import { Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, CheckBox, Alert, Linking, Modal } from 'react-native'

import Container from '../../Components/Container'
import Loading from '../../Components/ActivityIndicator/Loading';
import TutorialList from '../../Components/List/TutorialList';
import SelectPictures from '../../Components/SelectPictures';
import AuthButton from '../../Components/Button/AuthButton';

import auth from '@react-native-firebase/auth';

import authService from '../../Services/AuthService';
import NavigationService from '../../Services/NavigationService';

import AuthActions from '../../Stores/Auth/Actions'

import styles from './styles';
// import Tutorial from '../Tutorial';
import { Colors, Fonts, Images, Strings, Helpers, Metrics } from '../../Theme';
import AuthInput from '../../Components/Input/AuthInput';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';;

let {Check, Facebook, Google, Account} = Images;
let { EulaTop, EulaBottom, TsAndCs, PrivacyPolicy, EulaLink } = Strings;

import Toast from '../../Components/Toast';

import Utils from '../../Utils'
let toastDuration = 4000;

let avatarUri = "https://firebasestorage.googleapis.com/v0/b/awitan-3865c.appspot.com/o/Placeholders%2FsmallProfile.jpg?alt=media&token=6235cc25-3dc9-4adf-b731-81d30e7496a1"
 // '[DEFAULT]'

 let Tutorial = [
     {
         image: Images.nothingHere, 
         text: {header: "File Claims", text: "Search from a number of different socials going on around your city. Whatever your preference, Awitan has got you covered."}
    },
     {
         image: Images.nothingHere, 
         text: {header: "View Feedback", text: "Host events and sessions to meet like minded Awitaners to broaden your circle. "}
    },
     {
         image: Images.nothingHere, 
         text: {header: "Track Expenses", text: "Some pretty bad description text."}
    },
 ]


export class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticating: false,
            newUser: true,

            username: "habid",
            email: "test_1@gmail.com",
            pass: "password",
            pass2: "password",
            pictureUrl: "",

            errors: {
                username: "",
                email: "",
                pass: "",
            },
            
            googleUser: false,
            facebookUser: false,
            socialInformation: {},

            saveUsernamePass: true,

            showLoginForm: true,

            // EULA modal
            isVisible: false,
            privacyModalVisible: false, termsModalVisible: false,

            uploadingPicture: false,

            showToast: false,
            text: ""

            


        }
        // console.log(props.navigation.state.params.newUser)
        // this.newUser = props.navigation.state.params.newUser;
    }

    async UNSAFE_componentWillMount () {
       
        let newUser = await AsyncStorage.getItem('newUser');
        AsyncStorage.getItem('saveUsernamePass')
        .then( (data) => {
            // console.log(data);
            this.setState({saveUsernamePass: data == "true" ? true : false}, () => {
                if(this.state.saveUsernamePass) {
                    AsyncStorage.multiGet(['previousEmail', 'previousPassword'] ).then((data)=> {
                        this.setState({email: data[0][1] ? data[0][1] : '', pass: data[1][1] ? data[1][1] : '', }) 
                    })
                }
                
            })
        })
        .then( () => {
            if(newUser == 'false') {
                this.setState({newUser: false})
            }
            else {
                AsyncStorage.setItem('newUser', 'false', () => {
                    //since this person is a new user, show them tutorials screen,
                    //and also set newUser to false so they don't see tutorial in future
                    this.setState({newUser: true})
                });
            }
            
        })
        .catch( () => {
            console.log("Error Retrieving Data")
        })

        
        
    }

    toggleForm = () => this.setState({showLoginForm: !this.state.showLoginForm})
   

    signIn = () => {
        this.setState({ error: '', authenticating: true });
        const { email, pass } = this.state;

        if (!email || !pass) {
            alert("You cannot Sign In if your email and/or password fields are blank.");
            this.setState({authenticating: false});
        }
        else if (!pass.length >= 6) {
            alert("Your password's length must be greater or equal to 6 characters.");
            this.setState({authenticating: false});
        }
        else {

        
        auth().signInWithEmailAndPassword(email, pass)
            .then(() => {
                auth().onAuthStateChanged( (user) => {
                    if(user) {
                        this.state.saveUsernamePass ? AsyncStorage.multiSet([ ['previousEmail', email], ['previousPassword', pass] ]) : null;
                        this.successfulLoginCallback();
                    }
                })

            })
            .catch( () => {
                let err = 'Authentication failed, please sign up or enter correct credentials.';
                this.setState( { authenticating: false } );
                alert(err);
            })

        }

        
            

    }

    toggleSaveUsernamePass = () => {
        this.setState({saveUsernamePass: !this.state.saveUsernamePass}, () => {
            AsyncStorage.setItem('saveUsernamePass', this.state.saveUsernamePass ? "true" : "false");
        });
    }


    
    successfulLoginCallback = () => {
        this.setState({authenticating: false, isLoading: false}, () => {NavigationService.navigate('AppStack')});
    }
    // Definition: Invoked when onSignInPress() AND signInWithGoogle()  are pressed: 
    // that is when user presses Sign In Button, or when they choose to sign up or sign in through Google 
    //The G and F UserBooleans are used only in the attemptSignUp function to determine what data to navigate with to the CreateProfile Screen.
    

    toggleNewUser = () => {
        this.setState({newUser: !this.state.newUser})
    }

    renderRememberHelper = () => (
        
        <View style={styles.authActionsContainer}>
            <View style={styles.rememberMeContainer}>
                <TouchableOpacity onPress={this.toggleSaveUsernamePass} style={{height: 25, width: 25, borderWidth: 1, borderRadius: 10, borderColor: Colors.secondary, justifyContent: 'center', alignItems: 'center', marginRight: 5,}}>
                    {this.state.saveUsernamePass ?
                        <Check/>
                    :
                        null
                    }
                </TouchableOpacity>
                <Text onPress={this.toggleSaveUsernamePass} style={{...Fonts.style.small, color: Colors.secondary}}>Remember Me?</Text>
            </View>
            
            <TouchableOpacity 
            onPress={this.toggleShowPasswordReset}
            style={styles.forgotPasswordContainer}>
                <Text style={{...Fonts.style.small, color: Colors.secondary}}>Forgot Password?</Text>
            </TouchableOpacity>
        </View>

        
    )

    toggleModal = () => this.setState({isVisible: !this.state.isVisible})

    renderModals = () => {
        
        return (
        <>
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.isVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}
        >
        <SafeAreaView style={styles.modal}>
            
            <Text style={styles.modalHeader}>End-User License Agreement for Awitan</Text>
            <ScrollView contentContainerStyle={styles.licenseContainer}>
                <Text style={styles.document}>{EulaTop}</Text>
                <Text style={{color: Colors.number}} onPress={() => Linking.openURL(EulaLink)}>{EulaLink}</Text>
                <Text style={styles.document}>{EulaBottom}</Text>
            </ScrollView>
            <View style={styles.documentOpenerContainer}>
                <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, termsModalVisible: true})}}>
                    Terms & Conditions
                </Text>
                <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, privacyModalVisible: true})}}>
                    See Privacy Policy
                </Text>
            </View>
            

        </SafeAreaView>
        </Modal>
        
        {this.renderTermsModal()}
        {this.renderPrivacyModal()}
        </>
    )}

    renderTermsModal = () => (
        //   {/* Modal to show Terms and Conditions */}
          <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.termsModalVisible}
          onRequestClose={() => {
              Alert.alert('Modal has been closed.');
          }}
          >
              <SafeAreaView style={styles.modal}>
                  <Text style={styles.modalHeader}>Terms & Conditions of Use</Text>
                  <ScrollView contentContainerStyle={styles.licenseContainer}>
                      <Text>{TsAndCs}</Text>
                  </ScrollView>
                  <Text onPress={() => { this.setState({modalVisible: true, termsModalVisible: false}) }} style={styles.gotIt}>
                      Got It!
                  </Text>
              </SafeAreaView>
          </Modal>
      )
    
    renderPrivacyModal = () => (
        // {/* Modal to show Privacy Policy */}
        <Modal
        animationType="fade"
        transparent={false}
        visible={this.state.privacyModalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
        }}
        >
            <SafeAreaView style={styles.modal}>
                <Text style={styles.modalHeader}>Privacy Policy of {Strings.companyName}</Text>
                <ScrollView contentContainerStyle={styles.licenseContainer}>
                    <Text>{PrivacyPolicy}</Text>
                </ScrollView>
                <Text onPress={() => { this.setState({modalVisible: true, privacyModalVisible: false}) }} style={styles.gotIt}>
                    Got It!
                </Text>
            </SafeAreaView>
        </Modal>
    )

    handleInput = (field, value) => {
        let {...state} = this.state;
        console.log(value);
        let error = "";
        switch(field) {
            case "email":
                error = Utils.isEmailValid(value)
                break;
            default:
                break;
        }
        state[field] = value;
        state.errors[field] = error;
        
        this.setState(state);

    }

    renderWelcome = () => {
        let {authenticating, showLoginForm, username, email, pass, pass2, errors, uploadingPicture, showToast} = this.state;
        let {isLoading} = this.props;
        let isProfileValid = username && email && (pass == pass2);

        // console.log(errors);
        if(isLoading) {
            return (
                <Container center>
                    <Loading />
                    {showToast && <Toast text={this.state.toast}/>}
                </Container>
            )
        }
        return (
        <Container style={styles.container}>
            <View style={styles.headerContainer}>
                
                
                <Image source={Images.logo} style={styles.logo}/>
                
                
            </View>

            
            <View style={styles.formContainer}>
                
                <AuthInput 
                    placeholder={'Email'}
                    value={this.state.email}
                    onChangeText={email => this.handleInput('email', email)}
                    error={errors.email}
                    // onChangeText={email => this.setState({email})}
                    keyboardType={'email-address'}
                />

                <AuthInput
                    placeholder={'Password'}
                    value={this.state.pass}
                    onChangeText={pass => this.setState({pass})}
                    secureTextEntry
                />

                

                {this.renderRememberHelper()}

                {authenticating ? 
                    <View style={{...Helpers.center}}>
                        <Loading />
                    </View>
                :
                    <AuthButton
                        text={"SIGN IN"}
                        onPress={this.signIn}  
                    />
                }


            </View>

            <View style={styles.footerContainer}>
                <Text onPress={this.toggleModal} style={[styles.footer, {color: Colors.secondary}]}>
                Terms & Conditions 
                </Text>
            </View>
            

            {this.renderModals()}
            {showToast && <Toast text={this.state.toast}/>}
        </Container>
    )
}
    renderTutorialOrWelcome = () => {
        
        return (
        this.state.newUser ?
            <TutorialList data={Tutorial} handleSkip={this.toggleNewUser} />
            : 
            this.renderWelcome()
    )}

    render() {
        
        
        return (
            this.renderTutorialOrWelcome()
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    newUser: state.auth.newUser,
    // uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    // createUser: (newUser) => dispatch(AuthActions.createUserRequest(newUser)),
    // logIn: () => dispatch(AuthActions.logIn()),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Welcome)

const tutorialStyles = StyleSheet.create({
    
    // TUTORIAL
    headerContainer: {
        flex: 0.15,
        ...Helpers.center,

    },
        headerText: {
            ...Fonts.style.h1,
            color: Colors.secondary,
            letterSpacing: 1.7,
        },

    carouselContainer: {
        flex: 0.6,
        ...Helpers.center,
    },

    footerContainer: {
        flex: 0.25,
        ...Helpers.center,
    },

        skipButton: {
            paddingVertical: 3,
            width: Metrics.screenWidth/2.4,
            ...Helpers.center,
            ...Helpers.thinBorder,
            backgroundColor: '#fff'
        },
    
})
