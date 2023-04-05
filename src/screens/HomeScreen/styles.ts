import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 35,
    alignItems: 'center'
  },
  myIdScoreLogo: {
    height: 42,
    resizeMode: 'contain',
    marginBottom: 40
  },
  buttonWrapper: {
    width: 191
  },
  alreadyRegistered: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textGray,
    paddingVertical: 20
  },
  ojkLogo: {
    width: 128,
    height: 56
  },
  footerWrapper: {
    top: -20,
    alignItems: 'center'
  }
});

export default styles;
