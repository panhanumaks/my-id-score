import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flexGrow: 1,
    alignItems: 'center',
    width: '100%'
  },
  contentWrapper: {
    alignItems: 'center',
    width: '100%',
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  myIdScoreLogo: {
    resizeMode: 'contain',
    height: 32,
    marginTop: 15
  },
  inputWrapper: {
    width: '100%'
  },
  ojkLogo: {
    width: 128,
    height: 56
  },
  header: {
    height: 70,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1
  }
});

export default styles;
