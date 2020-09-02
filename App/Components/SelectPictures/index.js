import React, { Component } from 'react'
import { Platform, Text, ScrollView, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity, CameraRoll, PermissionsAndroid } from 'react-native'
// import Svg, { Path } from 'react-native-svg';
// import Icon from 'react-native-vector-icons/FontAwesome'
import ActionSheet from 'react-native-actionsheet'
import * as BasicImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { withNavigation } from 'react-navigation';

import { Colors, Images, Helpers, Metrics, Fonts } from '../../Theme';
import ProgressiveImage from '../ProgressiveImage';
 
let {AddImage} = Images;
// const NothingHere = () => (
//   <Svg height={"100%"} width={"100%"} viewBox="0 0 400 400">
//       <Path 
//       d="M166.109 113.155 C 158.368 115.958,154.918 120.083,150.658 131.627 L 147.610 139.887 131.605 140.143 C 112.960 140.442,110.751 141.100,103.471 148.518 C 95.580 156.559,95.935 153.202,96.184 217.472 L 96.400 273.200 98.204 276.860 C 100.977 282.487,104.984 286.644,110.539 289.656 L 115.600 292.400 199.600 292.400 L 283.600 292.400 288.118 290.282 C 293.872 287.584,298.784 282.672,301.482 276.918 L 303.600 272.400 303.600 216.000 L 303.600 159.600 301.373 155.373 C 294.951 143.186,289.063 140.475,268.289 140.142 L 252.178 139.884 249.089 131.433 C 245.658 122.046,242.095 117.158,236.503 114.167 C 232.277 111.906,171.950 111.039,166.109 113.155 M208.230 169.166 C 235.215 173.977,253.118 201.333,246.420 227.523 C 236.444 266.528,186.059 277.272,162.040 245.515 C 135.687 210.672,165.415 161.534,208.230 169.166 M190.269 186.335 C 154.771 197.688,165.605 250.841,202.783 247.730 C 236.902 244.874,241.745 195.688,208.855 186.071 C 203.204 184.418,195.939 184.522,190.269 186.335 "
//       stroke={Colors.black} 
//       strokeWidth="1"/>
//   </Svg>
// )

class SelectPictures extends Component {
  static defaultProps = {
    navToComponent: "CreateProfile",
    pictureuris: "nothing here",
    onSubmit: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      // cameraToggle: false, 
      showPhotoGallery: false,
      photoArray: []
    };
  }

  //Primary Function
  onSelect = () => {
    // console.log('Opening iOS image selector')
    const options = {
      title: "How would you like to select the image?",
      cancelButtonTitle: "Cancel",
      takePhotoButtonTitle: "Camera",
      chooseFromLibraryButtonTitle: "Photo Library",
      cameraType: 'back',
      mediaType: 'photo',
    }
    
    BasicImagePicker.default.showImagePicker(options, (response) => {
        if(response.didCancel) {
            return null
        }   
        else {
            
            const picture = response.uri;
            let origin = "";
            switch(this.props.navToComponent) {
              case "CreateProfile":
                origin = "Welcome";
                break;
              case "Gallery":
                  origin = "Gallery";
                  break;
              default:
                origin = "Create";
                break;

            }
          
            this.props.navigation.navigate(`${origin}`, {pictureuris: picture} )
            
        }
        
    })
  }

  //Root/Most Important function of component (deprecated)
  platformSpecificAction = () => {
    let {navToComponent} = this.props;
    if(navToComponent == 'EditProfile' || navToComponent == 'CreateProfile') {
      if(Platform.OS == "ios") {
        this.showActionSheet();
      }
      else {
        const options = {
          title: "Select Option",
          cancelButtonTitle: "Cancel",
          takePhotoButtonTitle: "Camera",
          chooseFromLibraryButtonTitle: "Photo Library",
          cameraType: 'back',
          mediaType: 'photo',
      }
        
        BasicImagePicker.default.showImagePicker(options, (response) => {
            if(response.didCancel) {
                return null
            }   
            else {
                
                const picture = response.uri;
                this.props.navigation.navigate('Welcome', {pictureuris: picture} );
                
            }
            
        })
  
        
      }
      
    }
    else {
      
      Platform.OS == "ios" ? 
        this.showActionSheet() 
        :
        this.props.navigation.navigate('CameraForEachPicture', {navToComponent: `${navToComponent}` });
    }

    
  }

  showActionSheet = () => {
    // console.log('adding Item')
    this.ActionSheet.show()

  }

  cameraOrGallery(index, navToComponent) {
    //iOS only function
  // if (index === 0) {
  //   // this.setState({cameraToggle: true});
  //   this.launchCamera(navToComponent);

  // }
  //request photos permission on lower versions of android to launch gallery
  //On iOS and sufficiently high versions of Android, just open gallery
  if (index == 0) {
    this.launchGallery(navToComponent);
    // Platform.OS == "android" ? Platform.Version <= 22 ? this.launchGallery(navToComponent) : this.requestPhotosPermission(navToComponent) : this.launchGallery(navToComponent);
  }
  
  // if (index == 0) {
  //   return null
  // }
  }

  launchCamera = (navToComponent) => {
      //iOS only function
    
    
    //
    // this.props.navigation.navigate('Camera', {navToComponent: `${navToComponent}` }) 
    //

    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let pictureuris = image.path
      console.log('Preparing to nav back to origin component with pictures:')
      // console.log(pictureuris);
      let origin = "";
      switch(navToComponent) {
        case "CreateProfile":
          origin = "Welcome";
          break;
        default:
          origin = "Create";
          break;

      }
    
      this.props.navigation.navigate(`${origin}`, {pictureuris: pictureuris} )
    });
      
   
    
  }

  launchGallery = (navToComponent) => {
    

    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   // cropping: true,
    //   // multiple: navToComponent == "CreateProfile" ? false : false,
    //   // maxFiles: 4
    // }).then(image => {
    //   // console.log(image);
    //   // console.log("TEST FOR IMAGES: " + JSON.stringify(images));
    //   let pictureuris = image.sourceURL
    //   console.log('Preparing to nav back to origin component with pictures:')
    //   // console.log(pictureuris);
    //   let origin = "";
    //   switch(navToComponent) {
    //     case "CreateProfile":
    //       origin = "Welcome";
    //       break;
    //     default:
    //       origin = "Create";
    //       break;

    //   }
    
    //   this.props.navigation.navigate(`${origin}`, {pictureuris: pictureuris} )
    // });
  }

  // launchGallery(navToComponent) {
  //   // console.log('opening Photo Library');
  //   let photoArray;
  //   // console.log("HERE MAN")
  //   CameraRoll.getPhotos({ first: 30 })
  //   .then(res => {
  //     photoArray = res.edges;
  //     // console.log("OVER HERE"+ photoArray);
  //     //now navigate to new component which will collect the image uri for usage and then nav back to create profile
  //     this.props.navigation.navigate('ViewPhotos', {photoArray: photoArray, navToComponent: `${navToComponent}` })
  //     // this.setState({ showPhotoGallery: true, photoArray: photoArray })
  //   })
    
    
  // }

  // launchImagePickerCamera = (navToComponent) => {
  //   // BasicImagePicker.openCamera({
  //   //   width: 300,
  //   //   height: 400,
  //   //   cropping: true,
  //   // }).then(image => {
  //   //   console.log(image);
  //   //   // let pictureuris = [image.uri];
  //   //   // this.props.navigation.navigate(`${navToComponent}`, {pictureuris: pictureuris});
  //   // });



  //   const options = {
  //     title: null,
  //     cancelButtonTitle: null,
  //     takePhotoButtonTitle: null,
  //     chooseFromLibraryButtonTitle: null,
  //     cameraType: 'back',
  //     mediaType: 'photo',

  //   }
  //   BasicImagePicker.launchCamera(options, (response) => {
  //     const pictureuris = [response.uri];
  //     this.props.navigation.navigate(`${navToComponent}`, {pictureuris: pictureuris});
  //   })
  // }

  requestPhotosPermission = async (navToComponent) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.launchGallery(navToComponent);
        } else {
          alert('NottMyStyle cannot select a picture(s) from your gallery without your permission to access your gallery.');
        }
    } catch (err) {
      console.warn(err)
    }
  }

  renderProfilePicture = (pictureuris) => {
    return (
      <TouchableOpacity onPress={this.onSelect} style={{...Helpers.thinBorder, borderRadius: 25,}}>
        <Image 
          source={pictureuris === 'nothing here' ? Images.smallProfile : {uri: pictureuris}}
          style={styles.profilePicture}
        /> 
      </TouchableOpacity>
    )
  }

  renderPlus = (pictureuris) => {
    let notEmpty = Array.isArray(this.props.pictureuris) && this.props.pictureuris.length > 0;
    // console.log(pictureuris, isEmpty);
    if(!notEmpty) {
      return ( 
        <AddImage onPress={this.onSelect}/> 
      )
    }
    
    return <Text style={{...Fonts.style.normal, color: Colors.white}} onPress={this.props.onSubmit}>Save</Text>
  }

  renderEventPicture = (pictureuris) => (
    <TouchableOpacity onPress={this.onSelect} style={styles.eventPictureContainer}>
      <ProgressiveImage
        thumbnailSource={Images.blur}
        source={pictureuris === 'nothing here' ? Images.nothingHere : {uri: pictureuris}}
        style={styles.eventPicture}
      /> 
    </TouchableOpacity>
  )

  renderMainPictureRow = (pictureuris) => {
    
    return (
      <View style={styles.mainPictureRow}>
        <TouchableHighlight underlayColor={'transparent'} style={styles.mainPictureTouchContainer} onPress={this.platformSpecificAction} >
          
            {pictureuris === 'nothing here' ? 
              <View style={[this.props.navToComponent == "CreateProfile" ? styles.mainPictureCP : styles.mainPicture, {justifyContent: 'center', alignItems: 'center'}]}>
                {
                  this.props.navToComponent == "CreateProfile" || this.props.navToComponent == "EditProfile" ? 
                  <Image 
                    source={Images.blankAvatar}
                    style={styles.mainPictureBlank}
                  /> 
                  : 
                  <NothingHere/>
                }
              </View>
              :
              <Image 
              source={{uri: pictureuris} } 
              style={this.props.navToComponent == "CreateProfile" ? [styles.mainPictureCP, {backgroundColor: 'transparent'}] : styles.mainPicture} 
              /> 
            }
            
        </TouchableHighlight>        
      </View>
    )
  }

  //Function to display this piece of UI is invoked only if pictureuris length is greater than 1, and of course the check on if whether it's an array or the string: 'nothing here'
  renderOtherPicturesRow = (pictureuris) => {
    // var pictures = pictureuris == 'nothing here' ? 'zero pictures' : pictureuris.slice(1);

    const pictures = pictureuris.slice(1);
    // console.log(pictures)
    return (
      
      <ScrollView horizontal={true} scrollEnabled={pictures.length == 3 ? true : false} style={{flex: 0.3,}} contentContainerStyle={styles.otherPicturesRow}>
        
        {pictures.map( (uri, index) => 
          <TouchableHighlight key={index} underlayColor={'transparent'} style={{paddingHorizontal: 3}} onPress={this.platformSpecificAction} >
            <Image source={{uri: uri}} style={styles.otherPicture} /> 
          </TouchableHighlight>  
          
        )
        }
      </ScrollView>
      
    )
  }

  render() {
    let {navToComponent, pictureuris} = this.props;
    var moreThanOnePicture = Array.isArray(this.props.pictureuris) && this.props.pictureuris.length > 1;
    console.log('image(s):');
    console.log(pictureuris);
    // console.log(moreThanOnePicture);
    // just have one uri and one image placeholder in the case of creating or editing your profile
    return (
      
      <View>
      
        {navToComponent == 'Create' ? 
            this.renderEventPicture(pictureuris) 
          : 
            navToComponent == 'Gallery' ? 
                this.renderPlus(pictureuris) 
              : 
                this.renderProfilePicture(pictureuris)
        }
      
        {/* <ActionSheet
        ref={o => this.ActionSheet = o}
        title={'Method to select profile picture:'}
        options={['Camera', 'cancel']}
        // options={['Camera', 'Photo Library', 'cancel']}
        cancelButtonIndex={1}
        destructiveButtonIndex={1}
        onPress={(index) => { this.cameraOrGallery(index, this.props.navToComponent) }}
        
        /> */}
    
      </View>
      
      
    )
  }
}

{/* <Icon.Button name='plus' onPress={() => this.showActionSheet() }>
          <Text>Add Picture of Item</Text>
        </Icon.Button> */}

const styles = StyleSheet.create( {

  image: {
    width: 100,
    height: 100
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    // backgroundColor: 'red',
  },

  eventPictureContainer: {
    ...Helpers.thinBorder, 
    width: Metrics.screenWidth, height: 200,
    backgroundColor: Colors.lightgrey,
  },

    eventPicture: {
      height: 200,
      width: Metrics.screenWidth,

    },


  mainPictureRow: {
    // flex: 1,
    flexDirection: 'row',
    // backgroundColor: bgBlack,
  },

  mainPictureTouchContainer: {
    // flex: 2,
    // backgroundColor: bgBlack,
    // width: 150,
    // height: 150,
    paddingVertical: 0,
    // paddingHorizontal: 5,
    borderRadius: 0
    // width: null,
    // height: null,
    // resizeMode: 'cover',
    // width: 150,
    // height: 150,
    // borderRadius: 100,
    // borderColor: 'green',
    // borderWidth: 5,
    
  },

  mainPicture: {
    // flex: 1,
    width: 130,
    height: 130,
    // alignSelf: 'stretch',
    // resizeMode: 'cover',
    // alignSelf: 'stretch',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    
  },

  mainPictureCP: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#fff'
  },

  mainPictureBlank: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  otherPicturesRow: {
    // height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 0,
    paddingHorizontal: 5,
    // backgroundColor: 'green',
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },

  otherPictureTouchContainer: {
    flex: 0.3,
    // width: 80,
    // height: 80,
    borderRadius: 0,
    // backgroundColor: 'yellow'
  },

  otherPicture: {
    // width: null,
    // height: null,
    // resizeMode: 'cover',
    width: 110,
    height: 110,
    // alignSelf: 'stretch',
    borderRadius: 5,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },

} )

export default withNavigation(SelectPictures);