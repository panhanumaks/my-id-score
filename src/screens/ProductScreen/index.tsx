import Header from 'components/Header';
import ProductCard from 'components/ProductCard';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import ProductService from 'services/product.service';
import COLORS from 'utils/colors';

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ProductService()
      .getProduct()
      .then(({ data }) => {
        setProducts(data?.products || []);
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

  if (loading) return <ActivityIndicator />;
  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Header isShowBack />
        <View style={{ padding: 20 }}>
          <Typography
            color={COLORS.dark}
            variant="extra-large"
            fontWeight="bold"
            label="Layanan"
          />
          <Typography
            color={COLORS.primary}
            variant="extra-large"
            fontWeight="bold"
            label="Paket Report"
          />
        </View>
        <View style={{ height: 30 }} />
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard products={item} />}
          keyExtractor={(item: any) => item?.id || ''}
          horizontal
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <View style={{ marginLeft: 20 }} />}
        />
      </ScrollView>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});

export default ProductScreen;
