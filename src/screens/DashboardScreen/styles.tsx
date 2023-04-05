import { StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  },
  header: {
    paddingVertical: 25,
    paddingHorizontal: 45,
    backgroundColor: COLORS.white,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    borderColor: COLORS.textGray,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  box: {
    flexDirection: 'column',
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 35,
    marginTop: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;
