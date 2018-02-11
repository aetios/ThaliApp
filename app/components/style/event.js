import { Dimensions } from 'react-native';
import { StyleSheet, colors } from '../../style';

const windowWidth = Dimensions.get('window').width;
export const memberSize = (windowWidth - 64) / 3;

const styles = StyleSheet.create({
  eventView: {
    padding: 16,
    backgroundColor: colors.background,
  },
  locationImageWrapper: {
    marginLeft: -16,
    marginRight: -16,
    marginTop: -16,
    marginBottom: 24,
  },
  locationImage: {
    height: 150,
  },
  titleText: {
    marginBottom: 16,
    fontSize: 20,
    color: colors.darkGrey,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  infoHolder: {
    flexDirection: 'row',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22.0,
    color: colors.darkGrey,
    width: '50%',
    paddingRight: 8,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  infoValueText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22.0,
    color: colors.darkGrey,
    width: '50%',
    android: {
      fontFamily: 'sans-serif',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '300',
    },
  },
  pizzaHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  pizzaText: {
    fontSize: 14,
    lineHeight: 22.0,
    color: colors.darkGrey,
    width: '50%',
    paddingRight: 8,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  pizzaButton: {
    flex: 1,
  },
  registrationText: {
    marginTop: 16,
  },
  registrationActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  secondButtonMargin: {
    marginLeft: 16,
  },
  descText: {
    fontSize: 14,
    lineHeight: 24.0,
    color: colors.black,
  },
  registrationsTitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: colors.darkGrey,
    marginBottom: 16,
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colors.dividerGrey,
  },
  italicText: {
    fontStyle: 'italic',
  },
  flex: {
    flex: 1,
  },
  memberView: {
    marginBottom: 16,
    marginRight: 16,
  },
});

export default styles;
