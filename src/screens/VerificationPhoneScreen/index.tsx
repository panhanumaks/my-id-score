import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import Header from 'components/Header';
import OtpInput from 'components/OtpInput';
import PoweredByOjk from 'components/PoweredByOjk';
import TextInput from 'components/TextInput';
import Typography from 'components/Typography';
import { useFormik } from 'formik';
import BasicLayout from 'layouts/BasicLayout';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PhoneService from 'services/phone.service';
import COLORS from 'utils/colors';

const VerificationPhoneScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState<'VERIF' | 'INPUT_NUMBER' | 'INPUT_OTP'>(
    'VERIF'
  );

  const inputNumberFormik = useFormik({
    initialValues: {
      mobile: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      PhoneService()
        .updateMobileNumber(values)
        .then(() => {
          setStep('INPUT_OTP');
        })
        .catch((error: AxiosError) => {
          const errorDataResponse = error?.response?.data as any;
          const errorData = errorDataResponse?.errors;
          Object.keys(errorData).map((key) => {
            inputNumberFormik.setFieldError(key, errorData[key][0]);
          });
        })
        .finally(() => setLoading(false));
    }
  });
  const verifyMobileNumber = useFormik({
    initialValues: {
      verification_otp: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      PhoneService()
        .verifyMobileNumber({
          verification_otp: values.verification_otp,
          mobile: inputNumberFormik.values.mobile
        })
        .then(() => {
          navigation.navigate('Product');
        })
        .catch((error: AxiosError) => {
          const errorDataResponse = error?.response?.data as any;
          const errorData = errorDataResponse?.errors;
          Object.keys(errorData).map((key) => {
            verifyMobileNumber.setFieldError(key, errorData[key][0]);
          });
        })
        .finally(() => setLoading(false));
    }
  });

  const VerifComponent = () => {
    return (
      <View style={{ padding: 40 }}>
        <Typography
          variant="large"
          textAlign="center"
          fontWeight="bold"
          color={COLORS.primary}
          label="Sebelum Melanjutkan Verifikasi Nomor HP Anda"
        />
        <View style={{ height: 15 }} />
        <Button
          onPress={() => setStep('INPUT_NUMBER')}
          variant={'primary'}
          radius={8}
          fontSize={12}
          padding={10}
          title={'Verifikasi Nomor HP'}
          loading={loading}
        />
      </View>
    );
  };

  const InputNumberComponent = () => {
    return (
      <View style={{ padding: 40, flex: 1 }}>
        <Typography
          label="Masukkan Nomor Telepon"
          fontWeight="bold"
          variant="extra-large"
          color={COLORS.dark}
        />
        <View style={{ height: 5 }} />
        <Typography
          label="Kami akan mengirimkan Pesan Berupa Kode OTP Kenomor Anda"
          fontWeight="regular"
          variant="small"
          color={COLORS.textGray}
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={inputNumberFormik.values.mobile}
          onChange={(e) =>
            inputNumberFormik.setFieldValue('mobile', e.nativeEvent.text)
          }
          placeholder="Masukkan nomor"
          prefix="+62"
          keyboardType='numeric'
          errorValue={inputNumberFormik.errors.mobile}
        />
        <View style={{ height: 15 }} />
        <Button
          onPress={() => inputNumberFormik.handleSubmit()}
          variant={'primary'}
          radius={8}
          fontSize={12}
          padding={10}
          title={'Kirim'}
          loading={loading}
        />
      </View>
    );
  };

  const InputOtpComponent = () => {
    return (
      <View style={{ padding: 40, flex: 1 }}>
        <Typography
          label="Kode OTP "
          fontWeight="bold"
          variant="extra-large"
          color={COLORS.dark}
        />
        <View style={{ height: 5 }} />
        <Typography
          label="Kami telah mengirimkan Pesan Berupa Kode OTP Kenomor Anda"
          fontWeight="regular"
          variant="small"
          color={COLORS.textGray}
        />
        <View style={{ height: 10 }} />
        <View>
          <OtpInput
            values={verifyMobileNumber.values.verification_otp}
            onChange={(value) => {
              verifyMobileNumber.setFieldValue('verification_otp', value);
            }}
            errorValue={verifyMobileNumber.errors.verification_otp}
          />
        </View>
        <View style={{ height: 15 }} />
        <Button
          onPress={() => verifyMobileNumber.handleSubmit()}
          variant={'primary'}
          radius={8}
          fontSize={12}
          padding={10}
          title={'Selesai'}
          loading={loading}
        />
      </View>
    );
  };

  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Header isShowBack />
        {step === 'VERIF' && VerifComponent()}
        {step === 'INPUT_NUMBER' && InputNumberComponent()}
        {step === 'INPUT_OTP' && InputOtpComponent()}
        <View>
          <PoweredByOjk />
          <View style={{ height: 25 }} />
        </View>
      </ScrollView>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between'
  }
});

export default VerificationPhoneScreen;
