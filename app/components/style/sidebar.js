import { colors, create } from '../../style';

const styles = create({
  sidebar: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'stretch',
  },
  headerButton: {
    height: 148,
  },
  headerImage: {
    width: null,
    height: 148,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  nameField: {
    color: colors.white,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
  },
  buttonList: {
    flex: 3,
  },
  buttonIcon: {
    marginRight: 30,
    width: 28,
    textAlign: 'center',
  },
  buttonText: {
    padding: 16,
  },
});

export default styles;
