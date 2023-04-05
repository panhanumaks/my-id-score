/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable sonarjs/no-duplicate-string */
import { logoutAction } from '_redux/actions/auth.action';
import {
  CommonActions,
  ParamListBase,
  useNavigation
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import PoweredByOjk from 'components/PoweredByOjk';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import LoginService from 'services/login.service';
import COLORS from 'utils/colors';

const PinScreen = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { authData } = useSelector((state: any) => state.authReducer);
  const onChangeValue = (val: string) => {
    if (val === 'backspace') {
      setValue(value.slice(0, -1));
    } else {
      const resultVal = value.concat(val);
      if (resultVal.length > 6) {
        return null;
      }

      if (resultVal !== 'backspace') {
        setValue(value.concat(val));
      }
      if (resultVal.length === 6) {
        LoginService()
          .confirmPin({ pin: resultVal })
          .then(() => {
            return navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'BottomTab' }]
              })
            );
          })
          .catch(() => {
            Toast.show({
              type: 'error',
              text1: 'Pin Salah',
              text2: 'Mohon Masukkan Pin Kembali'
            });
            setValue('');
          });
      }
    }
  };

  useEffect(() => {
    if (!authData?.member?.image_selfie) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Verification',
              params: {
                id: authData?.member?.id
              }
            }
          ]
        })
      );
    }
  }, []);

  const Dot = ({ active }: { active: boolean }) => {
    return (
      <View
        style={{
          borderRadius: 10,
          width: 20,
          height: 20,
          backgroundColor: active ? COLORS.primary : COLORS.gray
        }}
      />
    );
  };

  return (
    <BasicLayout>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          paddingVertical: 20
        }}
      >
        <Pressable
          style={{ padding: 20 }}
          onPress={() => dispatch(logoutAction())}
        >
          <Image
            source={IMAGES.icons.arrowLeft}
            style={{ width: 15, height: 15 }}
          />
        </Pressable>
        <View style={styles.container}>
          <Typography
            color={COLORS.dark}
            fontWeight="bold"
            label="Masukkan PIN"
            textAlign="center"
            variant="large"
          />
          <View style={{ height: 30 }} />
          <View
            style={{
              width: '100%',
              maxWidth: 180,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Dot active={value.length >= 1} />
            <Dot active={value.length >= 2} />
            <Dot active={value.length >= 3} />
            <Dot active={value.length >= 4} />
            <Dot active={value.length >= 5} />
            <Dot active={value.length >= 6} />
          </View>
          <View style={{ height: 30 }} />
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              maxWidth: 200
            }}
          >
            {[1, 2, 3].map((val: any, index: any) => {
              return (
                <Pressable
                  key={`${val}_${index}`}
                  onPress={() => onChangeValue(val)}
                  style={{ padding: 20 }}
                >
                  <Typography
                    variant="extra-larger"
                    fontWeight="bold"
                    color={COLORS.primary}
                    label={val.toString()}
                  />
                </Pressable>
              );
            })}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              maxWidth: 200
            }}
          >
            {[4, 5, 6].map((val: any, index: any) => {
              return (
                <Pressable
                  key={`${val}_${index}`}
                  onPress={() => onChangeValue(val)}
                  style={{ padding: 20 }}
                >
                  <Typography
                    variant="extra-larger"
                    fontWeight="bold"
                    color={COLORS.primary}
                    label={val.toString()}
                  />
                </Pressable>
              );
            })}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              maxWidth: 200
            }}
          >
            {[7, 8, 9].map((val: any, index: any) => {
              return (
                <Pressable
                  key={`${val}_${index}`}
                  onPress={() => onChangeValue(val)}
                  style={{ padding: 20 }}
                >
                  <Typography
                    variant="extra-larger"
                    fontWeight="bold"
                    color={COLORS.primary}
                    label={val.toString()}
                  />
                </Pressable>
              );
            })}
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              maxWidth: 200
            }}
          >
            {['', 0, 'backspace'].map((val: any, index: any) => {
              return (
                <Pressable
                  key={`${val}_${index}`}
                  onPress={() => onChangeValue(val)}
                  style={{
                    top: val === 'backspace' ? 20 : 0,
                    left: val === 'backspace' ? -10 : 0,
                    padding: val === 'backspace' ? 0 : 20
                  }}
                >
                  {val === 'backspace' ? (
                    <Image
                      source={IMAGES.backspace}
                      style={{
                        width: 40,
                        height: 20
                      }}
                    />
                  ) : (
                    <Typography
                      variant="extra-larger"
                      fontWeight="bold"
                      color={COLORS.primary}
                      label={val.toString()}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>
        <PoweredByOjk />
      </View>
    </BasicLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default PinScreen;
