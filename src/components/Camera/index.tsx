/* eslint-disable eslint-comments/disable-enable-pair */

import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  View
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import COLORS from 'utils/colors';

const CustomCamera = ({ takePhotoResponse, isFront }) => {
  const [isFocus, setIsFocus] = useState(true);
  const devices = useCameraDevices('wide-angle-camera');
  const device = isFront ? devices.back : devices.front;

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
        flash: 'on',
        base64: true
      })
      .then((response) => {
        takePhotoResponse(response);
      });
  };

  if (device == null) return <ActivityIndicator size={'large'} />;

  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isFocus}
        photo
        ref={camera}
      />
      <Pressable
        style={{
          height: 75,
          width: 75,
          borderRadius: 75 / 2,
          position: 'absolute',
          bottom: 50,
          borderColor: COLORS.dark,
          borderWidth: 10,
          backgroundColor: COLORS.white,
          left: Dimensions.get('window').width / 2 - 75 / 2,
          zIndex: 9999
        }}
        onPress={takePhoto}
      />
    </View>
  );
};

export default CustomCamera;
