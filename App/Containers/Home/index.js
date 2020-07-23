import React, {useEffect} from 'react';

import {View, FlatList, Text} from 'react-native';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import {connect} from 'react-redux';
import ClaimActions from '../../Stores/Claim/Actions';

import styles from './styles';
import Loading from '../../Components/ActivityIndicator/Loading';
import {Helpers, Fonts, Metrics, Colors} from '../../Theme';

import Utils from '../../Utils';

function Home(props) {
  useEffect(() => {
    let payload = {
      uid: props.uid,
    };
    props.getClaims(payload);
  }, [props.addStatus]);

  function renderClaim(item, index) {
    return (
      <View style={styles.claimContainer}>
        <Image
          source={{uri: item.photoURL}}
          indicator={ProgressBar}
          indicatorProps={{
            borderWidth: 1,
            borderColor: Colors.primary,
            borderRadius: Metrics.baseMargin,
            color: Colors.primary,
            unfilledColor: Colors.white,
            alignSelf: 'center',
          }}
          style={styles.image}
        />

        <View style={styles.textContainer}>
          <Text style={styles.amount}>PKR {item.amount}</Text>
          <Text style={styles.time}>{Utils.easyTime(item.time)}</Text>
          {item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
        </View>
      </View>
    );
  }

  if (props.isLoading) {
    return (
      <View style={[styles.container, {...Helpers.center}]}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={{...Fonts.style.normal}}>{props.name}</Text>
        <Text style={{...Fonts.style.normal, fontStyle: 'italic'}}>
          {props.id}
        </Text>
      </View>

      <FlatList
        style={[styles.claimsContainer]}
        contentContainerStyle={styles.claimsContentContainer}
        data={props.claims}
        renderItem={renderClaim}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={() => (
          <View style={{...Helpers.center}}>
            <Text style={{...Fonts.style.normal}}>Such empty, much wow!</Text>
          </View>
        )}
      />
    </View>
  );
}

const mapStateToProps = (state) => ({
  uid: state.auth.uid,

  isLoading: state.claim.isLoading,

  name: state.auth.profile.profile.displayName,
  id: state.auth.profile.id,
  claims: state.claim.claims,

  addStatus: state.claim.addStatus,
});

const mapDispatchToProps = (dispatch) => ({
  getClaims: (payload) => dispatch(ClaimActions.getClaimsRequest(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
