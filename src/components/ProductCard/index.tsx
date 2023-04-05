import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import Button from 'components/Button';
import Typography from 'components/Typography';
import { Image, View } from 'react-native';
import COLORS from 'utils/colors';
import numberToRupiah from 'utils/numberToRupiah';

const ProductCard = (props: any) => {
  const {
    id,
    name,
    price,
    verification_fee,
    transfer_fee,
    total,
    description,
    product_details,
    product_features
  } = props?.products || {};
  const { hideBuy } = props;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View
      style={{
        borderColor: COLORS.gray,
        borderWidth: 1,
        width: 240,
        height: 340,
        borderRadius: 25,
        alignItems: 'center'
      }}
    >
      <Typography
        fontWeight="bold"
        variant="extra-larger"
        color={COLORS.primary}
        label={name}
        style={{ padding: 10 }}
      />
      <View
        style={{ backgroundColor: COLORS.gray, height: 1, width: '100%' }}
      />
      <Typography
        fontWeight="bold"
        variant="large"
        color={COLORS.primary}
        label={numberToRupiah(total || 0)}
        style={{ padding: 10 }}
      />
      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <View style={{ height: 10 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            fontWeight="bold"
            label="Biaya IdScore+"
            variant="medium"
            color={COLORS.textGray}
          />
          <Typography
            fontWeight="bold"
            label={numberToRupiah(price || 0)}
            variant="medium"
            color={COLORS.textGray}
          />
        </View>
        <View style={{ height: 5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            fontWeight="bold"
            label="Biaya Verifikasi +"
            variant="medium"
            color={COLORS.textGray}
          />
          <Typography
            fontWeight="bold"
            label={numberToRupiah(verification_fee || 0)}
            variant="medium"
            color={COLORS.textGray}
          />
        </View>
        <View style={{ height: 5 }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography
            fontWeight="bold"
            label="Biaya Transfer+"
            variant="medium"
            color={COLORS.textGray}
          />
          <Typography
            fontWeight="bold"
            label={numberToRupiah(transfer_fee || 0)}
            variant="medium"
            color={COLORS.textGray}
          />
        </View>
        <View style={{ height: 10 }} />
        {product_details?.map((val: any, index: number) => (
          <>
            <Typography
              key={'KEY_' + index}
              fontWeight="bold"
              label={val.description}
              variant="medium"
              textAlign="center"
              color={COLORS.textGray}
            />
            <View style={{ height: 5 }} />
          </>
        ))}
        <View style={{ height: 10 }} />

        {product_features?.map((val: any, index: number) => (
          <View
            key={'KEY_' + index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5
            }}
          >
            <Image
              source={val.check ? IMAGES.correct : IMAGES.wrong}
              style={{ width: 15, height: 15 }}
            />
            <View style={{ width: 5 }} />
            <Typography
              key={'KEY_' + index}
              fontWeight="bold"
              label={val.feature === 'IdReport' ? 'IdReport' : 'IdScore +'}
              variant="medium"
              textAlign="center"
              color={COLORS.primary}
            />
          </View>
        ))}
        <View style={{ height: 10 }} />
        <Typography
          fontWeight="bold"
          label={description}
          variant="small"
          color={COLORS.textGray}
        />
      </View>
      {!description && !hideBuy && (
        <View style={{ position: 'absolute', bottom: -20 }}>
          <Button
            variant="primary"
            title="Beli Paket"
            radius={15}
            padding={10}
            fontSize={12}
            onPress={() => navigation.navigate('PurchaseDetail', { id })}
          />
        </View>
      )}
    </View>
  );
};

export default ProductCard;
