import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import Button from 'components/Button';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ProductService from 'services/product.service';
import COLORS from 'utils/colors';

const ReportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const handleSendToEmail = () => {
    setLoading(true);
    ProductService()
      .sendCreditScoreToEmail()
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Yeey,',
          text2: 'Kredit Skor kamu berhasil dikirim, silahkan cek email kamu'
        });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: 'Mohon Coba Kembali Lagi Nanti'
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <BasicLayout>
      <Pressable style={{ padding: 20 }} onPress={() => navigation.goBack()}>
        <Image
          source={IMAGES.icons.arrowLeft}
          style={{ width: 15, height: 15 }}
        />
      </Pressable>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          color={COLORS.dark}
          fontWeight="bold"
          variant="extra-larger"
          label="Laporan"
        />
        <Typography
          color={COLORS.primary}
          fontWeight="bold"
          variant="extra-larger"
          label=" Kredit Score Anda"
        />
        <View style={{ height: 40 }} />
        <Image
          source={IMAGES.creditScore}
          style={{ height: 250, width: 250, resizeMode: 'contain' }}
        />
        <View style={{ height: 25 }} />
        <View style={{ width: 150}}>
          <Button
            variant={'primary'}
            radius={8}
            fontSize={12}
            padding={10}
            title={'Kirim Ke Email'}
            onPress={handleSendToEmail}
            loading={loading}
          />
        </View>
      </View>
    </BasicLayout>
  );
};

export default ReportScreen;
