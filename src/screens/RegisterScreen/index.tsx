/* eslint-disable eslint-comments/disable-enable-pair */

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import CheckBox from 'components/Checkbox';
import DividerText from 'components/DividerText';
import OtpInput from 'components/OtpInput';
import TextInput from 'components/TextInput';
import Typography from 'components/Typography';
import { useFormik } from 'formik';
import BasicLayout from 'layouts/BasicLayout';
import { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LoginService from 'services/login.service';
import RegisterService from 'services/register.service';
import COLORS from 'utils/colors';

import styles from './styles';

type StepInterface = 'EMAIL' | 'VERIFICATION_EMAIL' | 'PROFILE';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const registerService = RegisterService();

  const [step, setStep] = useState<StepInterface>('EMAIL');
  const handleGoogleLogin = () => {
    setLoading(true);

    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo) => {
              LoginService()
                .registerGoogle({ id_token: userInfo.idToken || '' })
                .then(({ data }) => {
                  registerEmailFormik.setFieldValue(
                    'email',
                    data?.member?.email
                  );
                  setStep('VERIFICATION_EMAIL');
                });
            })
            .catch((e) => {
              Toast.show({
                type: 'error',
                text1: 'Terjadi Kesalahan',
                text2: JSON.stringify(e)
              });
            })
            .finally(() => {
              setLoading(false);
            });
        }
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          text1: 'Terjadi Kesalahan',
          text2: JSON.stringify(e)
        });
        setLoading(false);
      });
  };

  const registerEmailFormik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      registerService
        .register(values)
        .then(() => {
          setStep('VERIFICATION_EMAIL');
        })
        .catch((error: AxiosError) => {
          const errorDataResponse = error?.response?.data as any;
          const errorData = errorDataResponse?.errors;
          Object.keys(errorData).map((key) => {
            registerEmailFormik.setFieldError(key, errorData[key][0]);
          });
        })
        .finally(() => setLoading(false));
    }
  });

  const registerVerificationEmailFormik = useFormik({
    initialValues: {
      verification_otp: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      registerService
        .verifyEmail({
          verificationOtp: values.verification_otp,
          email: registerEmailFormik.values.email
        })
        .then((val) => {
          registerFormik.setFieldValue('id', val?.data?.member?.id);
          setStep('PROFILE');
        })
        .catch((error: AxiosError) => {
          const errorDataResponse = error?.response?.data as any;
          const errorData = errorDataResponse?.errors;
          Object.keys(errorData).map((key) => {
            registerVerificationEmailFormik.setFieldError(
              key,
              errorData[key][0]
            );
          });
        })
        .finally(() => setLoading(false));
    }
  });

  const registerFormik = useFormik({
    initialValues: {
      id: '',
      name: '',
      nik: '',
      date_of_birth: new Date(),
      password: '',
      password_confirmation: '',
      pin: '',
      pin_confirmation: '',
      term_and_condition: false,
      payment_condition: false
    },
    onSubmit: (values) => {
      setLoading(true);
      registerService
        .updateProfile(values)
        .then((val) => {
          navigation.navigate('Login');
          Toast.show({
            type: 'success',
            text1: 'Selamat,',
            text2: 'Akun anda berhasil dibuat'
          });
        })
        .catch((error: AxiosError) => {
          const errorDataResponse = error?.response?.data as any;
          const errorData = errorDataResponse?.errors;
          Object.keys(errorData).map((key) => {
            registerFormik.setFieldError(key, errorData[key][0]);
          });
        })
        .finally(() => setLoading(false));
    }
  });

  return (
    <BasicLayout>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ padding: 20 }}
        >
          <Image
            source={IMAGES.icons.arrowLeft}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <Typography
          fontWeight="bold"
          variant="extra-larger"
          color={COLORS.dark}
          label="Daftar"
        />
      </View>
      {step === 'EMAIL' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.contentWrapper]}>
            <View style={[styles.inputWrapper]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="regular"
                variant="medium"
                color={COLORS.dark}
                label="Alamat Email"
              />
              <TextInput
                value={registerEmailFormik.values.email}
                onChange={(e) =>
                  registerEmailFormik.setFieldValue('email', e.nativeEvent.text)
                }
                placeholder="Masukkan Alamat Email "
                errorValue={registerEmailFormik.errors.email}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                { marginTop: 35, alignItems: 'center' }
              ]}
            >
              <Button
                onPress={() => registerEmailFormik.handleSubmit()}
                variant={'primary'}
                radius={8}
                title={'Daftar Sekarang'}
                loading={loading}
              />
              <View style={{ height: 10 }} />
              <DividerText label="Atau Daftar Dengan" />
              <View style={{ height: 10 }} />
              <View
                style={{
                  paddingHorizontal: 75,
                  width: '100%'
                }}
              >
                <Button
                  onPress={handleGoogleLogin}
                  variant={'secondary'}
                  leftIcon={IMAGES.google}
                  radius={8}
                  title={'Google'}
                  loading={loading}
                />
              </View>
              <View style={{ height: 20 }} />
              <Typography
                fontWeight="bold"
                variant="small"
                label="Terdaftar dan diawasi oleh"
              />
              <View style={{ height: 8 }} />
              <Image source={IMAGES.ojk} style={styles.ojkLogo} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
      {step === 'VERIFICATION_EMAIL' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.contentWrapper]}>
            <View style={[styles.inputWrapper]}>
              <Typography
                fontWeight="bold"
                variant="extra-large"
                color={COLORS.dark}
                label="Kode OTP"
              />
              <View style={{ height: 5 }} />
              <Typography
                fontWeight="regular"
                variant="small"
                color={COLORS.textGray}
                label={`Kode OTP Telah dikirimkan ke Alamat Email ${registerEmailFormik.values.email}`}
              />
              <View style={{ height: 15 }} />
              <OtpInput
                values={registerVerificationEmailFormik.values.verification_otp}
                onChange={(value) =>
                  registerVerificationEmailFormik.setFieldValue(
                    'verification_otp',
                    value
                  )
                }
                errorValue={
                  registerVerificationEmailFormik.errors.verification_otp
                }
              />
              <View style={{ height: 35 }} />
              <Button
                onPress={() => registerVerificationEmailFormik.handleSubmit()}
                variant={'primary'}
                radius={8}
                title={'Lanjutkan'}
                loading={loading}
              />
            </View>
            <View
              style={[
                styles.inputWrapper,
                { marginTop: 15, alignItems: 'center' }
              ]}
            >
              <Typography
                fontWeight="bold"
                variant="small"
                label="Terdaftar dan diawasi oleh"
              />
              <View style={{ height: 8 }} />
              <Image source={IMAGES.ojk} style={styles.ojkLogo} />
            </View>
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
      {step === 'PROFILE' ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={[styles.contentWrapper, styles.inputWrapper]}>
            <View style={[styles.inputWrapper]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Nama Lengkap Sesuai KTP"
              />
              <TextInput
                value={registerFormik.values.name}
                onChange={(e) =>
                  registerFormik.setFieldValue('name', e.nativeEvent.text)
                }
                placeholder="Masukkan Nama Depan"
                errorValue={registerFormik.errors.name}
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Nomor KTP"
              />
              <TextInput
                value={registerFormik.values.nik}
                onChange={(e) =>
                  registerFormik.setFieldValue('nik', e.nativeEvent.text)
                }
                placeholder="Masukkan Nomor KTP"
                errorValue={registerFormik.errors.nik}
                keyboardType='numeric'
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Tanggal Lahir"
              />
              <TextInput
                value={registerFormik.values.date_of_birth as any}
                onChange={(e) => {
                  registerFormik.setFieldValue('date_of_birth', e);
                }}
                type="date"
                placeholder="Masukkan Tanggal Lahir"
                errorValue={registerFormik.errors.date_of_birth as any}
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Kata Sandi"
              />

              <Typography
                style={{
                  marginBottom: 5
                }}
                variant="small"
                color={COLORS.dark}
                label="Buat kata sandi minimal 8 karakter dengan kombinasi angka, huruf besar dan huruf kecil"
              />
              <TextInput
                type="password"
                value={registerFormik.values.password}
                onChange={(e) =>
                  registerFormik.setFieldValue('password', e.nativeEvent.text)
                }
                placeholder="Masukkan Kata Sandi"
                errorValue={registerFormik.errors.password}
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Ulangi Kata Sandi"
              />
              <TextInput
                type="password"
                value={registerFormik.values.password_confirmation}
                onChange={(e) =>
                  registerFormik.setFieldValue(
                    'password_confirmation',
                    e.nativeEvent.text
                  )
                }
                placeholder="Masukkan Kata Sandi"
                errorValue={registerFormik.errors.password_confirmation}
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Buat PIN"
              />

              <Typography
                style={{
                  marginBottom: 5
                }}
                variant="small"
                color={COLORS.dark}
                label="Buat pin untuk akun Sobat IdScore agar lebih aman dengan 6 digit angka."
              />
              <TextInput
                type="password"
                value={registerFormik.values.pin}
                onChange={(e) =>
                  registerFormik.setFieldValue('pin', e.nativeEvent.text)
                }
                placeholder="Buat PIN"
                errorValue={registerFormik.errors.pin}
                keyboardType='numeric'
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <Typography
                style={{
                  marginBottom: 5
                }}
                fontWeight="bold"
                variant="large"
                color={COLORS.dark}
                label="Ulangi PIN"
              />
              <TextInput
                type="password"
                value={registerFormik.values.pin_confirmation}
                onChange={(e) =>
                  registerFormik.setFieldValue(
                    'pin_confirmation',
                    e.nativeEvent.text
                  )
                }
                placeholder="Ulangi PIN"
                errorValue={registerFormik.errors.pin_confirmation}
                keyboardType='numeric'
              />
            </View>
            <View style={[styles.inputWrapper, { marginTop: 25 }]}>
              <CheckBox
                isSelected={registerFormik.values.term_and_condition}
                setSelection={(values: boolean) =>
                  registerFormik.setFieldValue('term_and_condition', values)
                }
                isError={registerFormik.errors.term_and_condition}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5
                  }}
                >
                  <Typography
                    fontWeight="bold"
                    color={COLORS.dark}
                    label="Saya menyetujui "
                  />
                  <Typography
                    fontWeight="bold"
                    color={COLORS.primary}
                    textDecoration="underline"
                    label="Syarat & Ketentuan"
                  />
                  <Typography
                    fontWeight="bold"
                    color={COLORS.dark}
                    label=" yang berlaku."
                  />
                </View>
              </CheckBox>
            </View>
            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <CheckBox
                isSelected={registerFormik.values.payment_condition}
                setSelection={(values: boolean) =>
                  registerFormik.setFieldValue('payment_condition', values)
                }
                isError={registerFormik.errors.payment_condition}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 5
                  }}
                >
                  <Typography
                    color={COLORS.dark}
                    fontWeight="bold"
                    label="Saya bersedia untuk membayar biaya verifikasi dan biaya transfer."
                  />
                </View>
              </CheckBox>
            </View>
            <View style={{ height: 35 }} />
            <Button
              onPress={() => registerFormik.handleSubmit()}
              variant={'primary'}
              radius={8}
              title={'Daftar Sekarang'}
              loading={loading}
            />
            <View style={{ height: 35 }} />
            <Typography
              fontWeight="bold"
              variant="small"
              label="Terdaftar dan diawasi oleh"
            />
            <View style={{ height: 8 }} />
            <Image source={IMAGES.ojk} style={styles.ojkLogo} />
          </View>
        </ScrollView>
      ) : (
        <></>
      )}
    </BasicLayout>
  );
};

export default RegisterScreen;
