import { AxiosError } from 'axios';
import Header from 'components/Header';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import Toast from 'react-native-toast-message';
import ProductService from 'services/product.service';
import COLORS from 'utils/colors';

const OrderScreen = () => {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    ProductService()
      .getOrder()
      .then(({ data }) => {
        setOrderData(data.orders);
      });
  }, []);

  const handleRefund = (id: any) => {
    ProductService()
      .postRefund({ id })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Proses Refund Berhasil',
          text2: 'Mohon tunggu 1x24 jam di saldo kamu ya'
        });
      })
      .catch(({ response }: AxiosError) => {
        const { message }: any = response?.data as any;
        Toast.show({
          type: 'error',
          text1: 'Proses Refund Kamu Gagal',
          text2: message
        });
      })
      .finally(() => {
        ProductService()
          .getOrder()
          .then(({ data }) => {
            setOrderData(data.orders);
          });
      });
  };

  const handlePayment = (_orderData: any) => {
    ProductService()
      .processPayment({
        va_number: _orderData?.code,
        amount: _orderData?.sub_total
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'Pembayaran Berhasil',
          text2: 'Mohon Tunggu Beberapa saat untuk perubahan status'
        });
      })
      .catch(({ response }: AxiosError) => {
        const { message }: any = response?.data as any;
        Toast.show({
          type: 'error',
          text1: 'Proses Refund Kamu Gagal',
          text2: message
        });
      })
      .finally(() => {
        ProductService()
          .getOrder()
          .then(({ data }) => {
            setOrderData(data.orders);
          });
      });
  };

  const OrderCard = ({ data }: any) => {
    const generateLabel = () => {
      let _label = '';
      if (data.is_payment) {
        if (data.is_refund) _label = 'Refund sedang dalam proses';
        else _label = 'Pembayaran berhasil';
      } else {
        _label = 'Sedang Diproses';
      }
      return _label;
    };
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray,
          borderRadius: 10,
          padding: 10,
          position: 'relative'
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Typography variant="large" fontWeight="bold" label={'Order ID : '} />
          <Typography variant="large" fontWeight="bold" label={data.code} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Typography variant="small" label={'Status : '} />
          <Typography variant="small" label={generateLabel()} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Typography variant="small" label={'Created at : '} />
          <Typography
            variant="small"
            label={moment(data.created_at).format('L')}
          />
        </View>
        {!data.is_payment && (
          <View
            style={{
              position: 'absolute',
              top: 15,
              right: 0,
              paddingVertical: 20,
              paddingHorizontal: 10
            }}
          >
            <Pressable onPress={() => handlePayment(data)}>
              <Typography
                color={COLORS.primary}
                fontWeight="bold"
                label="Bayar Sekarang"
              />
            </Pressable>
          </View>
        )}
        {data.is_payment && !data.is_refund ? (
          <View
            style={{
              position: 'absolute',
              top: 15,
              right: 0,
              paddingVertical: 20,
              paddingHorizontal: 10
            }}
          >
            <Pressable onPress={() => handleRefund(data.id)}>
              <Typography
                color={COLORS.primary}
                fontWeight="bold"
                label="Ajukan Refund"
              />
            </Pressable>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };
  return (
    <BasicLayout>
      <View style={{ flexGrow: 1 }}>
        <Header isShowBack />
        <FlatList
          data={orderData}
          renderItem={({ item }) => <OrderCard data={item} />}
          keyExtractor={(item: any) => item?.id || ''}
          contentContainerStyle={{ paddingHorizontal: 20, marginVertical: 20 }}
          ItemSeparatorComponent={() => <View style={{ marginTop: 20 }} />}
        />
      </View>
    </BasicLayout>
  );
};

export default OrderScreen;
