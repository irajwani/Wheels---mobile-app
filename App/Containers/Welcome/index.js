import React, { Component } from 'react'
import { Text, View, ScrollView, Image, SafeAreaView, TouchableOpacity, ImageBackground, StyleSheet, CheckBox, Alert, Linking, Modal, Keyboard, KeyboardAvoidingView } from 'react-native'

import Container from '../../Components/Container'
import Loading from '../../Components/ActivityIndicator/Loading';

import SelectPictures from '../../Components/SelectPictures';
import AuthButton from '../../Components/Button/AuthButton';
import SimpleButton from '../../Components/Button/SimpleButton';

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
// import {LoginManager, AccessToken, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';

// import authService from '../../Services/AuthService';
import NavigationService from '../../Services/NavigationService';

import AuthActions from '../../Stores/Auth/Actions'

import styles from './styles';
// import Tutorial from '../Tutorial';
import { Colors, Fonts, Images, Strings, Helpers, Metrics } from '../../Theme';
import AuthInput from '../../Components/Input/AuthInput';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';;

let {Check, BackArrow, Close, Info} = Images;
let { EulaTop, EulaBottom, TsAndCs, PrivacyPolicy } = Strings;

import Toast from '../../Components/Toast';

import Utils from '../../Utils'
import { DocModal, CustomModal } from '../../Components/Modal';
import shadowStyles from '../../StyleSheets/shadowStyles';
let toastDuration = 4000;

let avatarUri = "https://firebasestorage.googleapis.com/v0/b/wheels-a3ad6.appspot.com/o/Placeholders%2FsmallProfile.jpg?alt=media&token=6235cc25-3dc9-4adf-b731-81d30e7496a1"
 // '[DEFAULT]'


export class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticating: false,
            newUser: true,

            name: "Imad Rajwani",
            email: "imad@gmail.com",
            pass: "password",
            pass2: "password",
            pictureUrl: "",

            errors: {
                name: "",
                email: "",
                pass: "",
            },
            
            googleUser: false,
            facebookUser: false,
            socialInformation: {},

            saveUsernamePass: true,
            showPasswordReset: false,

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

    async UNSAFE_componentWillMount() {
       
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

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow.bind(this),
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide.bind(this),
        );
      
    }

    keyboardDidShow() {
        this.setState({keyboardShown: true})
    }

    keyboardDidHide() {
        this.setState({keyboardShown: false})
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }


    toggleForm = () => this.setState({showLoginForm: !this.state.showLoginForm})

    toggleShowPasswordReset = () => this.setState({showPasswordReset: !this.state.showPasswordReset})
    

    promiseToUploadPhoto = (uid, uri) => {
        return new Promise((resolve, reject) => {
            let mime = "image/jpg";
            if(uri.includes('googleusercontent') || uri.includes('platform') || uri.includes('firebasestorage')) {
                // console.log(`We already have a url for this image: ${uri}, so need for interaction with cloud storage, just store URL in cloud db`);
                
                // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
                resolve(uri);
            }

            else if(uri == "nothing here") {
                resolve(avatarUri)
            }

            else {
                console.log('user has chosen picture manually through photo lib or camera, store it on cloud and generate a URL for it.')
                // let resizedImage = await ImageResizer.createResizedImage(uri,resizedWidth, resizedHeight,'JPEG',suppressionLevel);
                // const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri
                const uploadUri = Metrics.platform == "ios" ? uri.replace('file://', '') : uri
                // let uploadBlob = null
                // const imageRef = 
                storage().ref().child(`Users/${uid}/profile`)
                .putFile(uploadUri, {contentType: mime})
                .then(uploadTask => {
                    console.log("HEREE")
                    console.log(uploadTask.downloadURL);
                    resolve(uploadTask.downloadURL);
                })
                .catch((error) => {
                    reject(error)
                })
                
                
                
                
            }
    
    })
    }

    updateFirebase = async (uid, uri) => {
        let {email, username} = this.state;
        let {createUser} = this.props;
        let url = await this.promiseToUploadPhoto(uid, uri);
        let token = await AsyncStorage.getItem('fcmToken');
        let newUser = {
            uid,
            email,
            photoUrl: url,
            username, 
            token
        };
        
        createUser(newUser);
        this.setState({isLoading: false, modalVisible: false});
    }

    //Invoked when you 'Accept' EULA as a Google User trying to sign up
    // createProfileForGoogleOrFacebookUser = async (user, pictureuri, socialPlatform) => {

    //     console.log('Initiate FB or Google Sign Up')
    //     let {email, pass} = this.state;
    //     if(socialPlatform == "google") {
    //         const {idToken, accessToken} = user;
    //         const credential = await auth.GoogleAuthProvider.credential(idToken, accessToken);
    //         const socialUser = await auth().signInWithCredential(credential);
            
    //         const linkWithEmailCredential = await auth.EmailAuthProvider.credential(email, pass);
    //         console.log(credential);
    //         auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
    //             this.updateFirebase(socialUser.uid, pictureuri);
    //             // console.log(usercred);
    //             // console.log("Account linking success", usercred.user);
    //         }, function(error) {
    //             console.log("Account linking error", error);
    //         });   
    //     }
    //     else {
    //         const {accessToken} = user;
    //         const credential = await auth.FacebookAuthProvider.credential(accessToken);
    //         const socialUser = await auth().signInWithCredential(credential);
            
    //         const linkWithEmailCredential = await auth.EmailAuthProvider.credential(email, pass);
    //         console.log(credential);
    //         auth().currentUser.linkAndRetrieveDataWithCredential(linkWithEmailCredential).then( (usercred) => {
    //             // console.log(usercred);
    //             this.updateFirebase(socialUser.uid, pictureuri);
    //             // console.log("Account linking success", usercred.user);
    //         }, function(error) {
    //             console.log("Account linking error", error);
    //         });
    //     }
    
    // }

    createProfile = (uri) => {
        //Person could arrive here through vanilla sign up, or after using social authentication such that they don't require further account creation
        // console.log("Initaite profile creation");
        let {email, pass, name} = this.state;
        this.setState({uploadingPicture: true, showToast: true, toast: `Creating user named: ${name}. Please wait...`}, () => {
            setTimeout(() => {
                this.setState({showToast: false})
            }, toastDuration);
        })
        
        
        auth().createUserWithEmailAndPassword(email, pass)
        .then(async () => {
            // console.log('created new firebase certified user');
            let uid = auth().currentUser.uid;
            let url;

            let mime = "image/jpg";
            if(uri.includes('googleusercontent') || uri.includes('platform') || uri.includes('firebasestorage')) {
                // console.log(`We already have a url for this image: ${uri}, so need for interaction with cloud storage, just store URL in cloud db`);
                
                // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
                url = uri;

                let token = await AsyncStorage.getItem('fcmToken');
                let newUser = {
                    uid,
                    email,
                    photoURL: url,
                    name, 
                    token
                    // token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
                }
                console.log("HERE");
                console.log(newUser);
                this.props.createUser(newUser);
                this.setState({uploadingPicture: false, isVisible: false});
            }

            else if(uri == "nothing here") {
                url = avatarUri;

                let token = await AsyncStorage.getItem('fcmToken');
                let newUser = {
                    uid,
                    email,
                    photoURL: url,
                    name, 
                    token
                    // token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
                }
                console.log("HERE");
                console.log(newUser);
                this.props.createUser(newUser);
                this.setState({uploadingPicture: false, isVisible: false});
            }

            else {
                console.log('user has chosen picture manually through photo lib or camera, store it on cloud and generate a URL for it.')
                // let resizedImage = await ImageResizer.createResizedImage(uri,resizedWidth, resizedHeight,'JPEG',suppressionLevel);
                // const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri
                const uploadUri = Metrics.platform == "ios" ? uri.replace('file://', '') : uri
                // let uploadBlob = null
                // const imageRef = 
                storage().ref().child(`Users/${uid}/profile`)
                .putFile(uploadUri, {contentType: mime})
                .then(async uploadTask => {
                    url = await storage().ref(`Users/${uid}/profile`).getDownloadURL();

                    let token = await AsyncStorage.getItem('fcmToken');
                    let newUser = {
                        uid,
                        email,
                        photoURL: url,
                        name, 
                        token
                        // token: "dJUd9hBupPI:APA91bHq7vv-mlMWvsplrlBFq8RI6mstf0ub8Ws6H-EYffd5M2zkP2Stg78Lk3WdzxkjmVfGUwoNm0DJmHivmgG84fqD7es3Fj8wuUisSQHLCe6yclsuITUDzRfnjuU1_j5HPdTdJ7yY",
                    }
                    this.props.createUser(newUser);
                    this.setState({uploadingPicture: false, isVisible: false});
                })
                .catch((error) => {
                    console.log(error)
                })
                
                
                
                
            }

        })
        .catch(error => {
            alert(error.message);
        })
        
        
    }

    // signInWithFacebook = () => {
    //     //TODO: Connect to app's auth chain
    //     this.setState({isLoading: true});

    //     //Neat Trick: Define two functions (one for success, one for error), with a thenable based on the object returned from the Promise.
    //     LoginManager.logOut();
    //     LoginManager.logInWithPermissions(['email']).then(
    //         (result) => {
              
    //           if (result.isCancelled) {
    //             this.setState({isLoading: false});
    //           } 
    //           else {
                
    //             AccessToken.getCurrentAccessToken().then( (token) => {
    //                 // console.log(data)
    //                 const infoRequest = new GraphRequest(
    //                     '/me?fields=name,picture,email',
    //                     null,
    //                     async (error, result) => {
    //                         if(error) {
    //                             alert('Error fetching data: ' + error.toString());
    //                         }
    //                         else {
    //                             // console.log("GraphRequest was successful", result.picture.data.url);
    //                             let {data} = await authService.isUserRegistered(result.email);
    //                             if(data.isRegistered) {
    //                                 this.successfulLoginCallback()
    //                                 // this.setState({isLoading: false}, () => {this.props.navigation.navigate('AppStack')});
    //                             }
    //                             else {
    //                                 let socialInformation = {
    //                                     accessToken: token.accessToken,
    //                                     user: result
    //                                 }
    //                                 console.log('here');
    //                                 console.log(result);
    //                                 this.setState({isLoading: false, socialInformation, facebookUser: true, showLoginForm: false}, () => {
    //                                     this.props.navigation.setParam({pictureuris: [socialInformation.user.picture.data.url]})
    //                                 })
    //                             }
    //                         }
    //                     }
    //                 );
    //                 // Start the graph request.
    //                 new GraphRequestManager().addRequest(infoRequest).start();
                    

    //             } )
                
                
    //           }
    //         },
    //         (error) => {
    //           alert('Login failed because: ' + error);
    //         }
    //       );
    // }

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

    // componentDidMount() {
    //     platform === "ios" ?
    //         GoogleSignin.configure({
    //             iosClientId: '791527199565-kfkgft1g8p2tamioshmqj8pa38r3sesh.apps.googleusercontent.com',
    //         })
    //         :
    //         GoogleSignin.configure();
    // }

    // signInWithGoogle = () => {
    //     !this.state.loading ? this.setState({loading: true}) : null;
    //     // console.log('trying to sign with google')
    //     GoogleSignin.signIn()
    //     .then((data) => {
    //         //TODO: Since "google sign in with account" pop up does not show after person selects an account, 
    //         //need a way to unlink google account and revive original chain fully so user may use another google account to sign up
    //         //maybe look at other apps
    //         console.log(data);
            
    //         let {idToken, accessToken, user} = data;
    //         let socialInformation = {
    //             idToken, accessToken, user
    //         }
    //         return socialInformation;
            
    //     })
    //     .then(async (socialInformation) => {
    //         // console.log(socialInformation.user.email)
    //         let {data} = await isUserRegistered(socialInformation.user.email);
    //         if(data.isRegistered) {
    //             this.setState({loading: false}, () => {this.props.navigation.navigate('AppStack')});
    //         }
    //         else {
    //             alert('here')
    //             this.setState({loading: false}, () => {this.attemptSignUp(socialInformation, true, false)})
    //         }
            
            
    //         // console.log("STATUS:" + JSON.stringify(isRegistered));
    //         // this.successfulLoginCallback(currentUser, googleUserBoolean = true, facebookUserBoolean = false);
    //         // console.log('successfully signed in:', currentUser);
    //         // console.log(JSON.stringify(currentUser.toJSON()))
    //     })
    //     .catch( (err) => {
    //         platform === 'ios' ? console.log('user canceled google signin') : alert("Whoops! Here's what happened: " + err); 
    //         this.setState({loading: false});
    //     })
    // }

    
    successfulLoginCallback = () => {
        this.setState({authenticating: false, isLoading: false}, () => {NavigationService.navigate('SplashScreen')});
    }
    // Definition: Invoked when onSignInPress() AND signInWithGoogle()  are pressed: 
    // that is when user presses Sign In Button, or when they choose to sign up or sign in through Google 
    //The G and F UserBooleans are used only in the attemptSignUp function to determine what data to navigate with to the CreateProfile Screen.
    

    toggleNewUser = () => {
        this.setState({newUser: !this.state.newUser})
    }

    renderBioInput = () => {
        var pictureuris = this.props.navigation.getParam('pictureuris', "nothing here");
        return (
        <View style={styles.bioInputContainer}>
        
            
            <AuthInput
                label={'Name'} 
                placeholder={'e.g. Ahmed Ali Kalhoro'}
                value={this.state.name}
                onChangeText={name => this.handleInput('name', name)}
                keyboardType={'default'}
                error={this.state.errors.name}
            />
            
            <View style={{position: 'absolute', right: 5, marginTop: 4, zIndex: 1}}>
                <SelectPictures navToComponent={'CreateProfile'} pictureuris={pictureuris} />    
            </View>
        </View>
    )}

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

    resetPassword = () => {
        auth().sendPasswordResetEmail(this.state.email)
        .then( async () => {
            await this.toggleShowPasswordReset;
            alert('Password Reset Email successfully sent! Please check your inbox for instructions on how to reset your password');
        })
        .catch( () => {
            alert('Please input a valid email address');
        })

    }

    renderPasswordResetModal = () => (
        <CustomModal visible={this.state.showPasswordReset}>
            <Container style={{margin: Metrics.baseMargin}}>
                <View style={{flexDirection: 'row', marginVertical: 2*Metrics.baseMargin, alignItems: 'center'}}>
                    <Close onPress={this.toggleShowPasswordReset} />
                </View>

                <AuthInput 
                    label={'Email'}
                    placeholder={'john@example.com'}
                    value={this.state.email}
                    onChangeText={email => this.handleInput('email', email)}
                    error={this.state.errors.email}
                    // onChangeText={email => this.setState({email})}
                    keyboardType={'email-address'}
                />

                <AuthButton
                    disabled={this.state.errors.email}
                    text={"Reset Password"}
                    onPress={this.resetPassword}  
                    extraStyles={{marginTop: 3*Metrics.baseMargin}}
                />
            </Container>
        </CustomModal>
    )

    toggleModal = () => this.setState({isVisible: !this.state.isVisible})

    renderModals = (isProfileValid) => {
        var pictureuris = this.props.navigation.getParam('pictureuris', "nothing here");
        return (
        <>
        <DocModal 
            visible={this.state.isVisible}
            toggleModal={() => this.setState({isVisible: !this.state.isVisible})}
            title={"End User License Agreement"}
            doc={() => (
                <>
                <Text style={styles.document}>{EulaTop}</Text>
                <Text style={styles.document}>{EulaBottom}</Text>
                </>
                )
            }
            buttonRow={() => (
                <View style={{alignItems: 'center', justifyContent: 'space-evenly', padding: Metrics.baseMargin/2}}>
                    <SimpleButton
                        disabled={!isProfileValid}
                        text={"SIGN UP"}
                        onPress={() => this.createProfile(pictureuris)}
                    />
                    <Text style={{...Fonts.style.small, color: Colors.grey}}>By pressing sign up, you agree to the End-User License agreement above.</Text>
                </View>
            )}
            secondButtonRow={() => (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                    <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, termsModalVisible: true})}}>
                    Terms & Conditions
                    </Text>
                    <Text style={styles.documentOpener} onPress={() => {this.setState({modalVisible: false, privacyModalVisible: true})}}>
                    Privacy Policy
                    </Text>
                </View>
            )}
        />
        
        {this.renderTermsModal()}
        {this.renderPrivacyModal()}
        </>
    )}

    renderTermsModal = () => (
        //   {/* Modal to show Terms and Conditions */}
          <DocModal 
            visible={this.state.termsModalVisible}
            toggleModal={() => { this.setState({modalVisible: true, termsModalVisible: false}) }}
            title={"Terms & Conditions of Use"}
            doc={() => <Text>{TsAndCs}</Text>}
            secondButtonRow={() => (
                <View style={{...Helpers.center}}>
                    <Text onPress={() => {this.setState({termsModalVisible: false, privacyModalVisible: true})}}>Privacy Policy</Text>
                </View>
            )}
          />
      )
    
    renderPrivacyModal = () => (
        // {/* Modal to show Privacy Policy */}
        <DocModal 
            visible={this.state.privacyModalVisible}
            toggleModal={() => { this.setState({modalVisible: true, privacyModalVisible: false}) }}
            title={"Privacy Policy"}
            doc={() => <Text>{PrivacyPolicy}</Text>}
            secondButtonRow={() => (
                <View style={{...Helpers.center}}>
                    <Text onPress={() => {this.setState({termsModalVisible: true, privacyModalVisible: false})}}>Terms & Conditions</Text>
                </View>
            )}
          />
    )

    handleInput = (field, value) => {
        let {...state} = this.state;
        console.log(value);
        let error = "";
        switch(field) {
            case "name":
                break;
            case "email":
                error = Utils.isEmailValid(value)
                break;
            case "pass":
                error = Utils.isPasswordValid(value)
                break;
            case "pass":
                if(value != state.pass) {
                    error =  "Passwords must match!"
                }
                break;
            default:
                break;
        }
        state[field] = value;
        state.errors[field] = error;
        
        this.setState(state);

    }
    

    render() {
        
        
        let {authenticating, showLoginForm, name, email, pass, pass2, errors, uploadingPicture, showToast, keyboardShown} = this.state;
        let {isLoading} = this.props;
        let isProfileValid = true;
        Object.values(errors).forEach((error) => {
            if(error) {
                isProfileValid = false;
            }
        })

        // console.log(errors);
        if(isLoading || uploadingPicture) {
            return (
                <Container center>
                    <Loading />
                    {showToast && <Toast text={this.state.toast}/>}
                </Container>
            )
        }
        return (
        <Container style={{backgroundColor: Colors.primary}}>

            <View style={styles.headerContainer}>
                <BackArrow onPress={() => this.props.navigation.navigate('AppStack')} color={Colors.white}/>
                
                <View style={{flexDirection: 'row'}}>
                {["Sign In", "Sign Up"].map((item, index) => {
                    let isSelected = false;
                    if(showLoginForm && index == 0) {
                        isSelected = true
                    }
                    else if(!showLoginForm && index == 1) {
                        isSelected = true
                    }
                    return (
                        <TouchableOpacity
                            onPress={this.toggleForm}
                            style={[
                                styles.toggleButton, 
                                isSelected && {backgroundColor: Colors.white, ...shadowStyles.thinWhiteCard}, 
                                index == 0 ? 
                                    {borderTopLeftRadius: Metrics.smallContainerRadius, borderBottomLeftRadius: Metrics.smallContainerRadius} 
                                    : 
                                    {borderTopRightRadius: Metrics.smallContainerRadius, borderBottomRightRadius: Metrics.smallContainerRadius}
                            ]}
                        >
                            <Text 
                            style={[styles.toggleText, {color: isSelected ? Colors.primary :  Colors.white}]}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
                </View>

                <Info onPress={this.toggleModal}/>
                
                
            </View>


            <View style={styles.formContainer}>


                <KeyboardAvoidingView style={styles.form} behavior={'padding'} keyboardVerticalOffset={80} enabled={keyboardShown}>
                <ScrollView>
                    
                    {showLoginForm ? 
                        null
                        : 
                        this.renderBioInput()
                    }
                    <AuthInput 
                        label={'Email'}
                        placeholder={'john@example.com'}
                        value={this.state.email}
                        onChangeText={email => this.handleInput('email', email)}
                        error={errors.email}
                        // onChangeText={email => this.setState({email})}
                        keyboardType={'email-address'}
                    />

                    <AuthInput
                        label={'Password'}
                        placeholder={'••••••••••'}
                        value={this.state.pass}
                        onChangeText={pass => this.handleInput('pass', pass)}
                        error={errors.pass}
                        secureTextEntry
                    />

                    {!showLoginForm && 
                        <AuthInput
                        label={'Retype password'}
                        placeholder={'Confirm Password'}
                        value={this.state.pass2}
                        onChangeText={pass2 => this.handleInput('pass2', pass2)}
                        secureTextEntry
                        />  
                    }

                    {showLoginForm && this.renderRememberHelper()}
                </ScrollView>
                </KeyboardAvoidingView>

                <View style={styles.formFooter}>
                {authenticating ? 
                    <View style={{...Helpers.center}}>
                        <Loading />
                    </View>
                    :
                    showLoginForm ?
                        <AuthButton
                            text={"SIGN IN"}
                            onPress={this.signIn}  
                        />
                    :
                        <AuthButton
                            disabled={!isProfileValid}
                            text={"SIGN UP"}
                            onPress={this.toggleModal}  
                        />
                    
                }
                </View>
                

            </View>

            {this.renderPasswordResetModal()}
            {this.renderModals(isProfileValid)}
            {showToast && <Toast text={this.state.toast}/>}
            
            
        </Container>
    )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.auth.isLoading,
    newUser: state.auth.newUser,
    // uid: state.auth.uid
})

const mapDispatchToProps = (dispatch) => ({
    createUser: (newUser) => dispatch(AuthActions.createUserRequest(newUser)),
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
