import {
  CommonActions,
  ParamListBase,
  useNavigation
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import Button from 'components/Button';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { Image, View } from 'react-native';
import COLORS from 'utils/colors';

const PaymentSuccess = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <BasicLayout>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
        <Image
          source={IMAGES.paymentSuccess}
          style={{ width: 200, height: 200, resizeMode: 'contain' }}
        />
        <View style={{ flexDirection: 'row' }}>
          <Typography
            color={COLORS.dark}
            fontWeight="bold"
            variant="extra-larger"
            label="Pembayaran "
          />
          <Typography
            color={COLORS.primary}
            fontWeight="bold"
            variant="extra-larger"
            label="Berhasil"
          />
        </View>
        <View style={{ height: 5 }} />
        <Typography
          color={COLORS.textGray}
          fontWeight="bold"
          variant="medium"
          label="Data Anda akan kami Proses"
        />
        <View style={{ height: 15 }} />
        <View style={{width: 150}}>
        <Button
          variant={'primary'}
          radius={8}
          fontSize={12}
          padding={10}
          title={'Kembali'}
          onPress={() =>
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }]
              })
            )
          }
        />
        </View>
      </View>
    </BasicLayout>
  );
};

export default PaymentSuccess;
