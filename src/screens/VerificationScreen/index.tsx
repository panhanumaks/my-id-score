import { loginAction } from '_redux/actions/auth.action';
import {
  ParamListBase,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import { AxiosError } from 'axios';
import Button from 'components/Button';
import CustomCamera from 'components/Camera';
import CameraScreen from 'components/Camera';
import PoweredByOjk from 'components/PoweredByOjk';
import Typography from 'components/Typography';
import { useFormik } from 'formik';
import useAuth from 'hooks/useAuth';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import RegisterService from 'services/register.service';
import COLORS from 'utils/colors';

const VerificationScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraType, setCameraType] = useState<'selfie' | 'nik'>('selfie');
  const registerService = RegisterService();
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [isSelfieUploaded, setIsSelfieUploaded] = useState(false);
  const [isNikUploaded, setIsNikUploaded] = useState(false);
  const { authData } = useSelector((state: any) => state.authReducer);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authData?.member?.image_selfie) {
      setIsSelfieUploaded(true);
    }
    if (authData?.member?.image_nik) {
      setIsNikUploaded(true);
    }
  }, []);

  const uploadSelfieandKtpFormik = useFormik({
    initialValues: {
      id: route.params?.id || '',
      nik: '',
      selfie: ''
    },
    onSubmit: (values) => {
      setLoading(true);
      registerService
        .uploadDocument({ ...values, type: !isNikUploaded ? 'nik' : 'selfie' })
        .then(({ data }) => {
          if (!isNikUploaded) {
            return setIsNikUploaded(true);
          } else if (!isSelfieUploaded) {
            setIsSelfieUploaded(true);
          }
          dispatch(loginAction(data));
          navigation.navigate('Pin');
        })
        .catch((e: AxiosError) => {
          const errorData = e.response?.data as any;
          Toast.show({
            type: 'error',
            text1: 'Terjadi Kesalahan',
            text2: errorData?.message
          });
        })
        .finally(() => setLoading(false));
    }
  });

  const takePhoto = (takePhotoResponse: any) => {
    if (cameraType === 'nik') {
      uploadSelfieandKtpFormik.setFieldValue(
        'nik',
        'file://' + takePhotoResponse?.path
      );
    } else {
      uploadSelfieandKtpFormik.setFieldValue(
        'selfie',
        'file://' + takePhotoResponse?.path
      );
    }
    setIsCameraActive(false);
  };
  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {!isNikUploaded && (
          <View style={{ width: '100%' }}>
            <Typography
              label="Verifikasi Foto KTP"
              textAlign="center"
              color={COLORS.dark}
              fontWeight="bold"
            />
            <View style={{ height: 25 }} />
            <View
              style={{
                flexDirection: 'row'
              }}
            >
              <View style={{ flex: 1 }}>
                <Image
                  source={IMAGES.ktp.correctKtp}
                  style={{
                    width: Dimensions.get('screen').width / 3,
                    height: Dimensions.get('screen').width / 3,
                    resizeMode: 'contain'
                  }}
                />
                <Image
                  source={IMAGES.ktp.wrongKtp}
                  style={{
                    width: Dimensions.get('screen').width / 3,
                    height: Dimensions.get('screen').width / 3,
                    resizeMode: 'contain'
                  }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Typography
                  fontWeight="bold"
                  color={COLORS.dark}
                  label={'Panduan Foto KTP '}
                />
                <View style={{ height: 5 }} />
                <View style={{ flexDirection: 'row' }}>
                  <Typography color={COLORS.dark} label={'- '} />
                  <Typography color={COLORS.dark} label={'E-KTP Asli'} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Typography color={COLORS.dark} label={'- '} />
                  <Typography
                    color={COLORS.dark}
                    label={'E-KTP Atas nama sendiri, bukan nama orang lain'}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Typography color={COLORS.dark} label={'- '} />
                  <Typography
                    color={COLORS.dark}
                    label={'Tidak Blur Atau Buram'}
                  />
                </View>
                <View style={{ height: 15 }} />
                <TouchableOpacity
                  onPress={() => {
                    setIsFrontCamera(false);
                    setIsCameraActive(true);
                    setCameraType('nik');
                  }}
                >
                  <Image
                    source={
                      uploadSelfieandKtpFormik.values.nik
                        ? {
                            uri: uploadSelfieandKtpFormik.values.nik
                          }
                        : IMAGES.ktp.uploadKtp
                    }
                    style={{
                      width: Dimensions.get('screen').width / 3,
                      height: Dimensions.get('screen').width / 4.2,
                      resizeMode: 'cover'
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {isNikUploaded && !isSelfieUploaded && (
          <View>
            <Typography
              label="Verifikasi Wajah"
              textAlign="center"
              color={COLORS.dark}
              fontWeight="bold"
            />
            <View style={{ height: 25 }} />
            <TouchableOpacity
              onPress={() => {
                setIsFrontCamera(true);
                setIsCameraActive(true);
                setCameraType('selfie');
              }}
            >
              <Image
                source={
                  uploadSelfieandKtpFormik.values.selfie
                    ? {
                        uri: uploadSelfieandKtpFormik.values.selfie
                      }
                    : IMAGES.ktp.uploadSelfie
                }
                style={{
                  width: Dimensions.get('screen').width / 3,
                  height: Dimensions.get('screen').width / 3,
                  resizeMode: 'cover'
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
        <Button
          onPress={() => uploadSelfieandKtpFormik.handleSubmit()}
          variant={'primary'}
          radius={8}
          title={'Lanjutkan'}
          loading={loading}
        />
        <PoweredByOjk />
        {isCameraActive ? (
          <CustomCamera takePhotoResponse={takePhoto} isFront={isFrontCamera} />
        ) : (
          <></>
        )}
      </ScrollView>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 40,
    alignItems: 'center'
  },
  divider: {
    width: Dimensions.get('screen').width,
    height: 0.5,
    left: -40,
    marginVertical: 20,
    backgroundColor: COLORS.textGray
  }
});

export default VerificationScreen;
