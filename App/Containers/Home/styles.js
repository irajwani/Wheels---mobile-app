import {StyleSheet} from 'react-native';
import {Fonts, Metrics, Colors} from '../../Theme';

import shadowStyles from '../../StyleSheets/shadowStyles';

let cardWidth = 175,
  cardHeight = 175;

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  profileContainer: {
    marginHorizontal: Metrics.baseMargin,
  },

  claimsContainer: {
    marginHorizontal: Metrics.baseMargin,
  },

  claimsContentContainer: {},

  claimContainer: {
    width: cardWidth,
    height: cardHeight,
    backgroundColor: Colors.white,
    ...shadowStyles.thinWhiteCard,
    marginRight: 10,
  },

  image: {
    width: cardWidth,
    height: 0.65 * cardHeight,
  },

  textContainer: {},

  name: {
    ...Fonts.style.normal,
    fontWeight: 'bold',
  },

  time: {
    ...Fonts.style.small,
    color: Colors.secondary,
    marginTop: Metrics.baseMargin / 2,
    fontWeight: '200',
  },
});
