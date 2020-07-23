import React, { Component } from 'react'
import { Text, ScrollView, View, TouchableOpacity, Switch, FlatList } from 'react-native'

import Modal, { ModalContent, SlideAnimation, ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import DatePicker from 'react-native-date-picker'

import Container, {DismissKeyboardView} from '../../Components/Container';
import { TabHeader } from '../../Components/HeaderBar';
import { Fonts, Images, Metrics, Colors, Helpers, Strings } from '../../Theme';
import SelectPictures from '../../Components/SelectPictures';
import FieldInput from '../../Components/Input/FieldInput';

import shadowStyles from '../../StyleSheets/shadowStyles';

import styles from './styles';
import Loading from '../../Components/ActivityIndicator/Loading';

import storage from '@react-native-firebase/storage';

import { connect } from 'react-redux';
import ClaimActions from '../../Stores/Claim/Actions';
import ProgressiveImage from '../../Components/ProgressiveImage';
import Toast from '../../Components/Toast';
let toastDuration = 4000;
let {ChevronRight, Restart} = Images;

let typeOptions = ['Food', 'Fuel'];

function randomId() {
    return '_' + Math.random().toString(36).substr(2, 6)
}

const SelectedOptionBullet = () => (
    <View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.primary}}/>
)

const Field = ({label, value, onPress}) => (
    <TouchableOpacity underlayColor={'#fff'} style={styles.fieldContainer} onPress={onPress}>
        
        
        <View style={[styles.fieldLabelContainer, {flex: value ? 0.35 : 0.8}]}>
            <Text style={styles.fieldLabel}>{label}</Text>
        </View>

        
        {value ?
        <View style={[styles.fieldValueContainer, {flex: 0.45}]}>
            <Text style={styles.fieldValue}>{value}</Text>
        </View>
        :
        null
        }

        <View style={[styles.iconContainer, {flex: 0.2 }]}>
            <ChevronRight/>
        </View>

        
    </TouchableOpacity>
)

class Create extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            previousId: false,

            uploadingPicture: false,

            input: "",

            type: "", 
            amount: "", 
            description: "",
            time: new Date,
            
            

            isVisible: false,

            showToast: false,
            toast: "",

        }

        this.create = this.create.bind(this);
        
    }

    // componentWillMount() {
        

    // }

    componentDidUpdate = (prevProps) => {
        if(prevProps.addStatus != this.props.addStatus && this.props.addStatus == 'idle') {
            let payload = {
                uid: this.props.uid,
            }
            this.props.getClaims(payload);  
        }

        
        
    }

    promiseToUploadPhoto = (uid, uri, id) => {
        return new Promise(async (resolve, reject) => {
            let mime = "image/jpg";
            if(uri.includes('googleusercontent') || uri.includes('platform') || uri.includes('firebasestorage')) {
                // console.log(`We already have a url for this image: ${uri}, so need for interaction with cloud storage, just store URL in cloud db`);
                
                // const imageRef = firebase.storage().ref().child(`Users/${uid}/profile`);
                resolve(uri);
            }

            else {
                // console.log('user has chosen picture manually through photo lib or camera, store it on cloud and generate a URL for it.')
                // let resizedImage = await ImageResizer.createResizedImage(uri,resizedWidth, resizedHeight,'JPEG',suppressionLevel);
                // const uploadUri = Platform.OS === 'ios' ? resizedImage.uri.replace('file://', '') : resizedImage.uri
                const uploadUri = Metrics.platform == "ios" ? uri.replace('file://', '') : uri
                // let uploadBlob = null
                // const imageRef = 
                storage().ref().child(`Claims/${uid}/${id}`)
                .putFile(uploadUri, {contentType: mime})
                .then(uploadTask => {
                    
                    resolve(uploadTask.downloadURL);
                })
                .catch((error) => {
                    reject(error)
                })
                
                
                
                
            }
    
    })
    }

    startOver = () => {
        this.setState({
            uploadingPicture: false, input: "",
            amount: "", 
            description: "",
            time: new Date, 
            type: "",
            showToast: true, toast: `Success!`
        }, () => {
            this.props.navigation.setParams({pictureuris: "nothing here"});
            setTimeout(() => {
                this.setState({showToast: false})
            }, toastDuration);
        });
    }

    async create(uri) {
        let {editMode, previousId, amount, type, description, time} = this.state;
        this.setState({
            uploadingPicture: true, 
            showToast: true, toast: `${editMode ? "Updating" : "Creating"} Claim. Please wait...`
        }, () => {
            setTimeout(() => {
                this.setState({showToast: false})
            }, toastDuration);
        });
        let {uid, displayName} = this.props;
        let id = randomId();
        let url = await this.promiseToUploadPhoto(uid, uri, id = previousId ? previousId : id);
        let payload = {
            uid,
            createdBy: displayName,
            id: previousId ? previousId : id,
            photoURL: url,
            amount,
            description,
            time,
            type,
        };
        this.props.createClaim(payload); //isLoading through props
        this.startOver();
        

        
    }

    toggleModal = (input) => this.setState({isVisible: !this.state.isVisible, input})

    renderModal = () => (
        <Modal
          rounded={true}
          modalStyle={{...shadowStyles.blackShadow, margin: Metrics.baseMargin}}
          modalTitle={<ModalTitle hasTitleBar={false} title={this.state.input.toUpperCase()} titleTextStyle={{...Fonts.style.normal, color: Colors.primary, fontWeight: "600"}}/>}
          visible={this.state.isVisible}
          onTouchOutside={() => this.toggleModal(this.state.input)}
          modalAnimation={new SlideAnimation({
            slideFrom: 'top',
          })}
          swipeDirection={['up', 'down', 'left', 'right']}
          swipeThreshold={100} 
          onSwipeOut={() => this.toggleModal(this.state.input)}
          footer={
          <ModalFooter bordered={false}>
            <ModalButton
              text="Save"
              textStyle={{...Fonts.style.medium, color: Colors.primary}}
              onPress={() => this.toggleModal(this.state.input)}
            />
          </ModalFooter>
          }
        >
          <ModalContent>
                {this.renderModalChildren(this.state.input)}
          </ModalContent>
        </Modal>
    )

    renderModalChildren = (input) => {

        if(input == 'type') {
            return typeOptions.map((option) => (
                <TouchableOpacity style={styles.typeContainer} onPress={()=>this.setState({type: option})}>
                        <View style={styles.radioButton}>
                            {option == this.state.type ? <SelectedOptionBullet /> : null}
                        </View>
                        
                        <Text style={{...Fonts.style.normal, marginLeft: Metrics.baseMargin}}>{option}</Text>
                        
                </TouchableOpacity>
            ))
            
        }
 
       

       else if(input == 'time') {
            return (
            <DatePicker
                date={this.state.time}
                onDateChange={(time) => this.setState({time})}
            />
            )
       }

       
    }

    renderToast = () => (
        <Toast text={this.state.toast}/>
    )

    render() {
        let {editMode, amount, description, time, type, uploadingPicture, showToast} = this.state;
        let {isLoading} = this.props;
        var pictureuris;

        let claim = this.props.navigation.getParam('claim', undefined);
        console.log('within Create');
        
        if(!editMode && claim !== undefined) {
            //Overwrite state with values from listing if this is first time Navigating to Create component from Journal
            this.setState({
                editMode: true,
                previousId: claim.id,
                uploadingPicture: false,

                input: "",

                type: claim.type, 
                amount: claim.amount, 
                description: claim.description ? claim.description : "",
                time: claim.time,
            
            })
        }

        if(editMode) {
            pictureuris = this.props.navigation.getParam('pictureuris', "nothing here");
        }
        else {
            pictureuris = this.props.navigation.getParam('pictureuris', "nothing here");
        } 
         

        

        let isDone = amount && time && pictureuris !== "nothing here"
        if (isLoading || uploadingPicture) {
            return (
                <Container center>
                    <Loading />
                    {showToast && this.renderToast()}
                </Container>
            )
        }
        return (
            <Container>
                <TabHeader text={"Create"} button={() => <Restart onPress={this.startOver}/>}/>

                <ScrollView style={{flex: 0.8}}>
                    {/* 1. Picture */}
                    <Text style={[styles.fieldLabel, {marginVertical: Metrics.baseMargin}]}>Photographic Evidence:</Text>

                    <SelectPictures navToComponent={'Create'} pictureuris={pictureuris}/>

                    {/* 2. Type */}
                    {/* <Field label="Type" value={type} onPress={() => this.toggleModal('type')}/> */}
                    
                    
                    {/* 3. Name */}
                    



                    <View style={[styles.fieldContainer, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                        <Text style={[styles.fieldLabel]}>Amount</Text>
                        <FieldInput value={amount} placeholder={"Rs. 0"} maxLength={5} onChangeText={(amount)=>this.setState({amount})} keyboardType={Metrics.platform == "ios" ? 'number-pad' : 'phone-pad'}/>
                    </View>

                    {/* 4. Date and Time */}
                    <Field label="Date & Time" value={time.toLocaleString('en-GB')} onPress={() => this.toggleModal('time')}/>
                    
                    {/* 5. Venue */}

                    {/* Extra. Description */}
                    <View style={[styles.fieldContainer, {flexDirection: 'column', alignItems: 'flex-start'}]}>
                        <Text style={[styles.fieldLabel]}>Description (Optional)</Text>
                        <DismissKeyboardView>
                            <FieldInput value={description} placeholder={"E.g. Valet & tipping expenses excluded"} onChangeText={(description)=>this.setState({description})} multiline={true}/>
                        </DismissKeyboardView>
                    </View>

                    {/* 6. Privacy */}

                    

                </ScrollView>


                <TouchableOpacity
                    disabled={isLoading || !isDone}
                    onPress={() => this.create(pictureuris)}
                    style={[styles.footerContainer, !isDone ? {backgroundColor: Colors.lightgrey} : null]}
                >
                    <Text style={{...Fonts.style.normal, fontWeight: "bold"}}>{editMode ? "UPDATE" : "SUBMIT"} CLAIM</Text>
                </TouchableOpacity>
                

                {this.renderModal()}
                {showToast && this.renderToast()}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    uid: state.auth.uid,

    isLoading: state.claim.isLoading,
    users: state.claim.users,

    addStatus: state.claim.addStatus,

    displayName: state.auth.profile.profile.displayName,
    

})

const mapDispatchToProps = (dispatch) => ({
    createClaim: (payload) => dispatch(ClaimActions.createClaimRequest(payload)),  

    // just to rehydrate store after submitting listing
    getClaims: (payload) => dispatch(ClaimActions.getClaimsRequest(payload)),
})

export default connect(
mapStateToProps,
mapDispatchToProps
)(Create)