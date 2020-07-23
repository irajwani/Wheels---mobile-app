import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import ProgressiveImage from '../ProgressiveImage';

// import shadowStyles from '../../StyleSheets/shadowStyles'
// import borderStyles from '../../StyleSheets/borderStyles'
import { Images, Fonts, Helpers, Colors, Metrics } from '../../Theme';
import Utils from '../../Utils';

let {Guitar, Piano, Saxophone, Note, Improve, Mentor, Perform} = Images;

export default ({item, onPress}) => {
    // console.log(item);
    return (
    <View style={{marginVertical: Metrics.baseMargin,}}>
    <TouchableOpacity 
    style={styles.container} onPress={() => onPress(item.uid)}
    underlayColor={'transparent'}
    >
        <View style={styles.imageContainer}>
            <ProgressiveImage source={{uri: item.photoUrl}} thumbnailSource={Images.smallProfile} style={styles.image}/>
        </View>

        <View style={styles.textContainer}>
            <View style={styles.nameContainer}>
                <Text style={{...Fonts.style.small, color: Colors.primary, fontWeight: "bold"}}>{item.name}</Text>

                <Text style={{...Fonts.style.small, color: Colors.secondary}}>{Utils.easyTime(item.time._seconds, true)}</Text>
            </View>
            {item.type == "userHasJoined" ?
                <Text style={styles.feedText}>{item.text}</Text>
                :
                item.update.field == 'gallery' ?
                    <>
                    <Text style={styles.feedText}>Uploaded a picture to their gallery</Text>
                    <ProgressiveImage source={{uri: item.update.value}} thumbnailSource={Images.glass} style={styles.image}/>
                    </>
                    :
                    item.update.field == 'interests' ?
                        <Text style={styles.feedText}>Updated their musical interests</Text>
                        :
                        <Text style={styles.feedText}>Updated {item.update.field} to {item.update.value}</Text>
            }
        </View>
        
    </TouchableOpacity>


    <View style={{flexDirection: 'row'}}>
        {(item.instruments != undefined && item.instruments.length > 0) && renderInstruments(item.instruments.length)}
        {(item.activities != undefined && item.activities.length > 0) && renderActivities(item.activities)}
    </View>
    </View>
)}

const renderInstruments = (instrumentsCount) => (
    <View style={[styles.subDetailContainer]}>


        <Note />
        <Text style={{...Fonts.style.normal, marginLeft: Metrics.baseMargin/2, alignSelf: 'center', color: Colors.primary}}>{instrumentsCount}</Text>
        {/* {instruments.map((i) => {
            if(i == "Guitar") {
                return <Guitar />
            }
            else if(i == "Piano") {
                return <Piano />
            }
            else if(i == "Saxophone") {
                return <Saxophone />
            }

            else {
                return <Guitar />
            }
        })} */}
    </View>
)

const renderActivities = (activities) => (
    <View style={[styles.subDetailContainer, {backgroundColor: Colors.white}]}>
        {activities.map((a) => {
            if(a == "Learn") {
                return <Improve />
            }
            else if(a == "Teach") {
                return <Mentor />
            }
            else {
                return <Perform />
            }
        })}
    </View>
)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        paddingVertical: Metrics.baseMargin/2,
    },

        imageContainer: {
            flex: 0.2,
            ...Helpers.center,
            
        },

            image: {
                width: 40,
                height: 40,
                borderRadius: 20,

            },

        textContainer: {
            flex: 0.8,
            paddingHorizontal: Metrics.baseMargin
        },

        nameContainer: {flexDirection: 'row', justifyContent: 'space-between'},

            feedText: {...Fonts.style.small, marginTop: Metrics.baseMargin/2},

        subDetailContainer: {
            flexDirection: 'row',
            padding: Metrics.baseMargin,

        },



})
