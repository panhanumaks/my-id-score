import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import COLORS from 'utils/colors';

const BasicLayout = ({
  children
}: {
  children: JSX.Element | Array<JSX.Element>;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  }
});

export default BasicLayout;
