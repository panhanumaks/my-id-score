import { useNavigation } from '@react-navigation/native';
import IMAGES from 'assets/images';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import COLORS from 'utils/colors';

const Header = ({ isShowBack }: { isShowBack?: boolean }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerWrapper}>
      {isShowBack ? (
        <Pressable style={{ padding: 20 }} onPress={() => navigation.goBack()}>
          <Image
            source={IMAGES.icons.arrowLeft}
            style={{ width: 15, height: 15 }}
          />
        </Pressable>
      ) : (
        <View style={{ width: 75 }} />
      )}

      <Image
        source={IMAGES.myIdScore}
        style={{ width: 100, height: 40, resizeMode: 'contain' }}
      />
      <View style={{ width: 75 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    paddingVertical: 10,
    alignItems: 'center'
  }
});

export default Header;
