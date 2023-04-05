import {
  ParamListBase,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import Header from 'components/Header';
import ProductCard from 'components/ProductCard';
import TextInput from 'components/TextInput';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ProductService from 'services/product.service';
import COLORS from 'utils/colors';
import numberToRupiah from 'utils/numberToRupiah';

const PurchaseDetailScreen = () => {
  const route = useRoute();
  const { id }: any = route.params;
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [diskon, setDiskon] = useState(0);
  const [isVoucherActive, setIsVoucherActive] = useState(false);
  const [voucher, setVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { total }: any = product;
  useEffect(() => {
    setLoading(true);
    ProductService()
      .getProductDetail({ id })
      .then(({ data }) => {
        setProduct(data?.product);
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: 'Mohon Coba Kembali Lagi Nanti'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleVoucher = () => {
    setVoucherError('');
    ProductService()
      .claimVoucher({
        product_id: id,
        voucher
      })
      .then(({ data }) => {
        setDiskon(data?.order_total?.discount);
        setIsVoucherActive(true);
      })
      .catch(({ response }: AxiosError) => {
        const { message }: any = response?.data || {};
        setVoucherError(message);
      });
  };

  const cancelVoucher = () => {
    setDiskon(0);
    setIsVoucherActive(false);
  };

  const handleOrder = () => {
    setLoading(true);
    ProductService()
      .placeOrder({
        product_id: id,
        voucher: isVoucherActive ? voucher : 0
      })
      .then(({ data }) => {
        navigation.navigate('Payment', { id: data.order.id });
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: 'Mohon Coba Kembali Lagi Nanti'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <BasicLayout>
      <Header isShowBack />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            padding: 40,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Typography
              color={COLORS.dark}
              fontWeight="bold"
              variant="extra-larger"
              label="Rincian "
            />
            <Typography
              color={COLORS.primary}
              fontWeight="bold"
              variant="extra-larger"
              label="Pembelian"
            />
          </View>
          <View style={{ height: 25 }} />
          <ProductCard products={product} hideBuy />
          <View style={{ marginTop: 25, width: '100%' }}>
            <Typography
              color={COLORS.textGray}
              variant="small"
              label="Masukan Kode Voucher"
            />
            <View style={{ height: 5 }} />
            <View style={{ position: 'relative' }}>
              <TextInput
                placeholder="Masukkan Kode Voucher ..."
                editable={!isVoucherActive}
                value={voucher}
                onChangeText={setVoucher}
              />
              <Pressable
                onPress={() =>
                  !isVoucherActive ? handleVoucher() : cancelVoucher()
                }
                style={{ position: 'absolute', right: 0, padding: 15 }}
              >
                <Typography
                  label={
                    !isVoucherActive ? 'Gunakan Voucher' : 'Batalkan Voucher'
                  }
                  variant="extra-small"
                  color={COLORS.primary}
                />
              </Pressable>
              {voucherError !== '' && (
                <Typography
                  color={COLORS.primary}
                  label={voucherError}
                  style={{ marginTop: 5 }}
                />
              )}
            </View>
            <View style={{ height: 15 }} />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography
                color={COLORS.textGray}
                fontWeight="bold"
                label="Harga"
              />
              <Typography
                color={COLORS.primary}
                label={numberToRupiah(total || 0)}
              />
            </View>
            {diskon > 0 && (
              <>
                <View style={{ height: 5 }} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography
                    color={COLORS.textGray}
                    fontWeight="bold"
                    label="Diskon"
                  />
                  <Typography
                    color={COLORS.textGray}
                    label={'-' + numberToRupiah(diskon || 0)}
                  />
                </View>
              </>
            )}

            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.textGray,
                marginVertical: 10
              }}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Typography
                color={COLORS.textGray}
                fontWeight="bold"
                label="Total Harga"
              />
              <Typography
                color={COLORS.textGray}
                label={
                  '-' +
                  numberToRupiah(((total || 0) - (diskon || 0)).toString())
                }
              />
            </View>
            <View style={{ height: 25 }} />

            <Button
              variant="primary"
              title="Proses Pembayaran"
              radius={15}
              loading={loading}
              onPress={handleOrder}
            />
          </View>
        </View>
      </ScrollView>
    </BasicLayout>
  );
};

export default PurchaseDetailScreen;
