import {
    CommonActions,
  ParamListBase,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Button from 'components/Button';
import Header from 'components/Header';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ProductService from 'services/product.service';
import COLORS from 'utils/colors';
import numberToRupiah from 'utils/numberToRupiah';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState([]);
  const route = useRoute();
  const { id }: any = route.params;
  const [dataOrdering, setDataOrdering] = useState<any>({});

  const [loading, setLoading] = useState(false);
  const [isSelectedPayment, setIsSelectedPayment] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setLoading(true);
    ProductService()
      .getPaymentMethod()
      .then(({ data }) => {
        setPaymentMethod(data.payment_methods['Transfer Virtual Account']);
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

  const handleSelectedPayment = (bank_code: any) => {
    setLoading(true);
    ProductService()
      .updatePaymentMethod({ id, bank_code })
      .then(({ data }) => {
        setDataOrdering(data);
        setIsSelectedPayment(true);
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
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography
            color={COLORS.dark}
            fontWeight="bold"
            variant="extra-larger"
            label="Pembayaran"
          />
          {!isSelectedPayment ? (
            <>
              {paymentMethod.map((val: any, index: number) => {
                return (
                  <Pressable
                    key={'KEY_' + index}
                    style={{
                      borderColor: COLORS.gray,
                      borderWidth: 1,
                      borderRadius: 15,
                      width: '100%',
                      paddingTop: 30,
                      paddingBottom: 15,
                      paddingLeft: 15,
                      flexDirection: 'row',
                      marginTop: 15
                    }}
                    onPress={() => handleSelectedPayment(val.bank_code)}
                  >
                    <Image
                      source={{
                        uri: val.image
                      }}
                      style={{ width: 60, height: 30, resizeMode: 'contain' }}
                    />
                    <Typography
                      style={{ marginLeft: 15 }}
                      label={val.name}
                      color={COLORS.dark}
                    />
                  </Pressable>
                );
              })}
            </>
          ) : (
            <View
              style={{ marginTop: 25, width: '100%', paddingHorizontal: 20 }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Typography label="Bank Code: " />
                <Typography label={dataOrdering?.order?.bank_code} />
              </View>
              <View style={{ height: 10 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Typography label="Va Number: " />
                <Typography label={dataOrdering?.order?.account_number} />
              </View>
              <View style={{ height: 10 }} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Typography label="Total Harga: " />
                <Typography
                  label={numberToRupiah(dataOrdering?.order?.total || 0)}
                />
              </View>
              <View style={{ height: 40 }} />
              <Button
                variant={'primary'}
                radius={8}
                fontSize={12}
                padding={10}
                title={'Bayar Sekarang'}
                onPress={() => navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'BottomTab' }, { name: 'PaymentSuccess' }]
                    })
                )}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </BasicLayout>
  );
};

export default PaymentScreen;
