/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */

import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import COLORS from 'utils/colors';

const CameraFaceScreen = () => {
  const [isFocus, setIsFocus] = useState(true);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const navigation = useNavigation();

  const camera = useRef<any>(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const takePhoto = async () => {
    await camera.current
      .takePhoto({
        flash: 'on'
      })
      .then(() => {
        setIsFocus(false);
        Toast.show({
          type: 'success',
          text1: 'Yeey',
          text2: 'Upload ktp kamu berhasil diterima'
        });
        navigation.goBack();
      });
  };

  if (device == null) return <ActivityIndicator size={'large'} />;

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocus}
        photo
        ref={camera}
      />
      <TouchableOpacity
        style={{
          height: 75,
          width: 75,
          borderRadius: 75 / 2,
          position: 'absolute',
          bottom: 50,
          borderColor: COLORS.dark,
          borderWidth: 10,
          backgroundColor: COLORS.white,
          left: Dimensions.get('window').width / 2 - 75 / 2
        }}
        onPress={takePhoto}
      />
    </View>
  );
};

export default CameraFaceScreen;
