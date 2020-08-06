import React, { Component } from 'react';
import {TouchableOpacity, View, Text, Image, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import styled from "styled-components/native"; // 3.1.6
import Carousel, {Pagination} from 'react-native-snap-carousel'; // 3.6.0
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Images, Helpers, Fonts, Metrics } from '../../Theme';
import Container from '../Container';
import borderStyles from '../../StyleSheets/borderStyles';

let {screenWidth, screenHeight} = Metrics;

let dotStyle = {backgroundColor: Colors.primary, height: 12, width: 12, borderRadius: 6}
class TutorialList extends Component {

  constructor(props){
    super();
    this.state = {
      errors: [],
      activeSlide: 0,
    }
    this.props = props;
    this._carousel = {};
  }

  handleSnapToItem(index){
    // console.log("snapped to ", index);
    this.setState({ activeSlide: index });
  }

  _renderItem = ( {item, index} ) => {
    // console.log("rendering,", index, item)
    
    return (
      
      
        <View style={styles.carouselContainer}>

          <TouchableOpacity 
          onPress={ () => { 
            // console.log("clicked to index", index)
            this._carousel.snapToItem(index);
          }}
          style={styles.cardContainer}
          >

            
              <Image source={item.image} style={styles.image}/>

              <Text style={styles.label}>{item.text}</Text>
            

            

          </TouchableOpacity>

          
          
          {this.pagination}
          

        </View>
        
        
    );
  }

  get pagination () {
    const { activeSlide } = this.state;
    const {data, biggerImage} = this.props;
    return (
        <Pagination
          carouselRef={this._carousel}
          tappableDots={true}
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={dotStyle}
          inactiveDotStyle={{
              backgroundColor: Colors.shadow
              // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.5}
          inactiveDotScale={1}
        />
    );
}

// <TouchableBackground onPress={this.props.onPress}>

  render = () => {
    const { data } = this.props;
    let {currentIndex} = this._carousel
  
    return (

      
      
        
        <View style={{flex: 0.6, ...Helpers.center}}>
          <Carousel
            ref={ (c) => { this._carousel = c; } }
            data={data}
            renderItem={this._renderItem.bind(this)}
            onSnapToItem={this.handleSnapToItem.bind(this)}
            sliderWidth={screenWidth*0.9}
            itemWidth={screenWidth*0.9}
            layout={'default'}
            firstItem={0}
          />
        </View>
          
        

        
      
    )
  
  }
}
export default TutorialList;

const CardContainer = styled.TouchableOpacity`
 display: flex;
 flex: 0.8;
 border: 0.5px solid black;
 ${'' /* width: 600px; */}
 ${'' /* height: 600px; */}
 background-color: #fff;
 padding: 10px 40px;
`

const styles = StyleSheet.create({

  container: {flex: 1, padding: Metrics.doubleBaseMargin},

  headerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

    skipButton: {
      backgroundColor: Colors.primary,
      width: 70,
      height: 40,
      ...borderStyles.thinWhiteBorder,
      // borderRadius: 30,
      ...Helpers.center,
    },

      skipText: {
        ...Fonts.style.medium,
        color: Colors.white,
        fontWeight: "500",

      },

  carouselContainer: {
    // flex: 0.8,
    // flexGrow: 1,
    // justifyContent: 'space-between',
    // marginTop: 40,
    // height: 0.6*Metrics.screenHeight
    // backgroundColor: 'red'
  },

    cardContainer: {
      backgroundColor: Colors.white,
      ...Helpers.center,
      // flex: 1, //flex of 0.0 leftover to get carousel and pagination to play nice
      // height: 0.5*screenHeight,
      // padding: Metrics.baseMargin,
      
      // height: 300,
      // ...borderStyles.thinBorder
    },

        image: {
          width: 200,
          height: 200,
          borderRadius: 60,
        },

        label: {
          ...Fonts.style.normal,
          textAlign: 'center',
        },
      

      textContainer: {
        flex: 0.3,
        ...Helpers.center,
      },

        text: {
          textAlign: 'center',
          ...Fonts.style.medium,
        },

    paginationContainer: {
      // flex: 0.2,
      // backgroundColor: 'pink',
      flexDirection: 'row',
      alignItems: 'center',justifyContent: 'center',
      // bottom: 0,position: "absolute", 
      
    },

  footerButton: {
    flex: 0.1,
    // marginHorizontal: 20,
    // marginVertical: 30,
    backgroundColor: Colors.primary,
    ...borderStyles.thinWhiteBorder,
    ...Helpers.center,
  }



  

  

  
})

