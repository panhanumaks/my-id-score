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
import Typography from 'components/Typography';
import { useFormik } from 'formik';
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
import { Image as ImageCompressor } from 'react-native-compressor';
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

  const takePhoto = async (takePhotoResponse: any) => {
    if (cameraType === 'nik') {
      const result = await ImageCompressor.compress(
        'file://' + takePhotoResponse?.path,
        {
          maxHeight: 500,
          maxWidth: 500,
          quality: 0.5
        }
      );

      uploadSelfieandKtpFormik.setFieldValue('nik', result);
    } else {
      const result = await ImageCompressor.compress(
        'file://' + takePhotoResponse?.path,
        {
          maxHeight: 500,
          maxWidth: 500,
          quality: 0.5
        }
      );
      uploadSelfieandKtpFormik.setFieldValue('selfie', result);
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
              variant="extra-larger"
            />
            <View style={{ height: 25 }} />
            <Typography
              label="Foto Kartu Identitas kamu seperti contoh dibawah ini :"
              color={COLORS.dark}
            />
            <View style={{ height: 15 }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
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

              {uploadSelfieandKtpFormik.values.nik && (
                <Image
                  source={{
                    uri: uploadSelfieandKtpFormik.values.nik
                  }}
                  style={{
                    width: Dimensions.get('screen').width / 3,
                    height: Dimensions.get('screen').width / 4.2,
                    resizeMode: 'cover',
                    borderRadius: 5,
                    alignSelf: 'center',
                    marginBottom: 15
                  }}
                />
              )}

              <View
                style={{
                  width: 150,
                  alignSelf: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  onPress={() => {
                    setIsFrontCamera(false);
                    setIsCameraActive(true);
                    setCameraType('nik');
                  }}
                  variant={'secondary'}
                  radius={8}
                  fontSize={12}
                  title={'Unggah Foto KTP'}
                  loading={loading}
                />
              </View>
            </View>
          </View>
        )}
        {isNikUploaded && !isSelfieUploaded && (
          <View>
            <Typography
              label="Verifikasi Wajah"
              color={COLORS.dark}
              fontWeight="bold"
              variant="extra-larger"
            />
            <View style={{ height: 50 }} />
            <TouchableOpacity
              onPress={() => {
                setIsFrontCamera(true);
                setIsCameraActive(true);
                setCameraType('selfie');
              }}
              style={{alignItems : 'center', justifyContent: 'center'}}
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
                  resizeMode: 'cover',
                  borderRadius: uploadSelfieandKtpFormik.values.selfie ? 15 : 0
                }}
              />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
      <View style={{ padding: 20 }}>
        <Button
          onPress={() => uploadSelfieandKtpFormik.handleSubmit()}
          variant={'primary'}
          radius={8}
          title={'Lanjutkan'}
          loading={loading}
          disabled={
            !isNikUploaded
              ? !uploadSelfieandKtpFormik.values.nik
              : !uploadSelfieandKtpFormik.values.selfie
          }
        />
      </View>

      {isCameraActive ? (
        <CustomCamera takePhotoResponse={takePhoto} isFront={isFrontCamera} />
      ) : (
        <></>
      )}
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
