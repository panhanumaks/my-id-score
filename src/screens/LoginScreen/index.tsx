/* eslint-disable eslint-comments/disable-enable-pair */

import { loginAction, logoutAction } from '_redux/actions/auth.action';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import DividerText from 'components/DividerText';
import TextInput from 'components/TextInput';
import Typography from 'components/Typography';
import { useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import BasicLayout from 'layouts/BasicLayout';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch } from 'react-redux';
import LoginService from 'services/login.service';
import COLORS from 'utils/colors';
import { _storeLocalStorageItem } from 'utils/localStorage';
import * as yup from 'yup';

import styles from './styles';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const dispatch = useDispatch();
  const loginService = LoginService();


  const handleGoogleLogin = () => {
    setLoading(true);

    GoogleSignin.addScopes({
      scopes: ['openid', 'email', 'profile']
    });
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo) => {
              loginService
                .loginGoogle({
                  id_token: userInfo.idToken || ''
                })
                .then(async ({ data }) => {
                  await _storeLocalStorageItem({
                    storageKey: 'UserToken',
                    storageValue: data?.token
                  });
                  dispatch(loginAction(data));
                })
                .catch((error: AxiosError) => {
                  Toast.show({
                    type: 'error',
                    text1: 'Terjadi Kesalahan',
                    text2: JSON.stringify(error.response?.data)
                  });
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

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
  });

  const loginFormik = useFormik({
    validationSchema: loginValidationSchema,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      auth.login(values).finally(() => setLoading(false));
    }
  });

  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentWrapper}>
          <Typography
            label={'Selamat Datang di '}
            fontWeight="bold"
            color={COLORS.dark}
            variant="extra-large"
          />
          <Image source={IMAGES.myIdScore} style={styles.myIdScoreLogo} />
        </View>
        <View
          style={[
            styles.contentWrapper,
            styles.inputWrapper,
            { paddingTop: 50 }
          ]}
        >
          <View style={styles.inputWrapper}>
            <Typography
              style={{
                marginBottom: 5,
                marginLeft: 5
              }}
              fontWeight="bold"
              variant="large"
              color={COLORS.dark}
              label="Alamat Email"
            />
            <TextInput
              value={loginFormik.values.email}
              onChange={(e) =>
                loginFormik.setFieldValue('email', e.nativeEvent.text)
              }
              placeholder="Masukkan Alamat Email"
              errorValue={loginFormik.errors.email}
            />
          </View>
          <View style={[styles.inputWrapper, { marginTop: 15 }]}>
            <Typography
              style={{
                marginBottom: 5,
                marginLeft: 5
              }}
              fontWeight="bold"
              variant="large"
              color={COLORS.dark}
              label="Kata Sandi"
            />
            <TextInput
              type="password"
              value={loginFormik.values.password}
              onChange={(e) =>
                loginFormik.setFieldValue('password', e.nativeEvent.text)
              }
              placeholder="Masukkan Kata Sandi"
              errorValue={loginFormik.errors.password}
            />
          </View>
          <View style={{ height: 25 }} />
          <Button
            onPress={() => loginFormik.handleSubmit()}
            variant={'primary'}
            radius={8}
            title={'Masuk'}
            loading={loading}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25
            }}
          >
            <Typography
              fontWeight="bold"
              variant="small"
              label="Belum Punya Akun? "
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Register')}
            >
              <Typography
                fontWeight="bold"
                variant="small"
                color={COLORS.primary}
                textDecoration="underline"
                label="Buat Akun"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5
            }}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Register')}
            >
              <Typography
                fontWeight="bold"
                variant="small"
                color={COLORS.primary}
                label="Lupa Kata Sandi? "
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Register')}
            >
              <Typography
                fontWeight="bold"
                variant="small"
                color={COLORS.primary}
                textDecoration="underline"
                label="Lupa Pin?"
              />
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />
          <DividerText label="Atau Masuk Dengan" />
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
      </ScrollView>
    </BasicLayout>
  );
};

export default LoginScreen;
