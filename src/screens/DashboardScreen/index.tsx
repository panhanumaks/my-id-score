import { logoutAction } from '_redux/actions/auth.action';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images';
import Button from 'components/Button';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, View } from 'react-native';
import Speedometer from 'react-native-speedometer-chart';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from 'utils/colors';

import styles from './styles';

const DashboardScreen = () => {
  const [myScore, setMyScore] = useState(700);
  const totalScore = 900;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [modalLogout, setModalLogout] = useState<boolean>(false);
  const dispatch = useDispatch();

  type scoreType = 'VERY_NICE' | 'NICE' | 'ENOUGH' | 'BAD' | 'VERY_BAD';
  const scoreText = {
    VERY_NICE: 'Sangat Bagus!',
    NICE: 'Bagus!',
    ENOUGH: 'Cukup Bagus!',
    BAD: 'Buruk!',
    VERY_BAD: 'Sangat Buruk!'
  };
  const getScore = (score: number) => {
    let scoreType: scoreType = 'VERY_BAD';

    if (score < totalScore / 5) {
      scoreType = 'VERY_BAD';
    } else if (score < totalScore / 4) {
      scoreType = 'ENOUGH';
    } else if (score < totalScore / 3) {
      scoreType = 'BAD';
    } else if (score < totalScore / 2) {
      scoreType = 'NICE';
    } else {
      scoreType = 'VERY_NICE';
    }

    return scoreType;
  };

  const LogoutModal = () => {
    return (
      <Modal visible={modalLogout} animationType="slide">
        <View
          style={{
            flex: 1,
            position: 'relative',

            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography
            fontWeight="regular"
            label="Are you sure you want to logout?"
          />
          <View style={{ height: 15 }} />
          <View style={{ flexDirection: 'row' }}>
            <Button
              variant="primary"
              title="Logout"
              onPress={() => {
                dispatch(logoutAction());
                setModalLogout(false);
              }}
              width={100}
            />
            <View style={{ width: 5 }} />
            <Button
              variant="secondary"
              title="Cancel"
              onPress={() => setModalLogout(false)}
              width={100}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const { authData } = useSelector((state: any) => state.authReducer);

  const Header = () => {
    return (
      <View style={styles.header}>
        <View style={{ flexDirection: 'row' }}>
          <Typography
            variant="large"
            fontWeight="bold"
            color={COLORS.dark}
            label={'Selamat Pagi, '}
          />
          <Typography
            variant="large"
            fontWeight="bold"
            color={COLORS.primary}
            label={'Dina'}
          />
        </View>
        <Pressable onPress={() => setModalLogout(true)}>
          <Image
            source={{
              uri: authData.member.image_selfie
            }}
            style={{ width: 25, height: 25, borderRadius: 25 }}
          />
        </Pressable>
      </View>
    );
  };

  const YourCreditScore = () => {
    return (
      <View style={styles.box}>
        <Typography
          variant="large"
          fontWeight="bold"
          color={COLORS.dark}
          label={'Kredit Skor Kamu'}
        />
        <View style={{ height: 25 }} />
        <Speedometer
          value={myScore}
          totalValue={totalScore}
          size={200}
          outerColor={COLORS.gray}
          internalColor={COLORS.primary}
          percentStyle={{ color: COLORS.primary }}
        />
        <View
          style={{
            width: 200,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            marginTop: 10
          }}
        >
          <Typography
            color={COLORS.dark}
            variant="extra-small"
            style={{ marginLeft: 10 }}
            label={'0'}
          />
          <Typography color={COLORS.dark} variant="extra-small" label={'900'} />
        </View>
        <View style={{ position: 'absolute', top: 130 }}>
          <View style={{ alignItems: 'center' }}>
            <Typography
              color={COLORS.textGray}
              fontWeight="bold"
              variant="small"
              label={'Skor'}
            />
            <Typography
              color={COLORS.dark}
              fontWeight="bold"
              variant="ultra-large"
              label={'500'}
            />
          </View>
        </View>
        <Typography
          color={COLORS.primary}
          fontWeight="bold"
          variant="large"
          textAlign="center"
          label={scoreText[getScore(myScore)]}
        />
        <View style={{ height: 5 }} />
        <Typography
          color={COLORS.textGray}
          variant="small"
          textAlign="center"
          label={'Terakhir Diperbaharui 19 April 2023'}
        />
        <View style={{ height: 15 }} />
        <View style={{ paddingHorizontal: 50, width: '100%' }}>
          <Button
            onPress={() => navigation.navigate('Report')}
            variant={'primary'}
            padding={10}
            fontSize={12}
            radius={8}
            title={'Ingin Tahu apa perubahan Dalam Laporan Anda'}
          />
        </View>
      </View>
    );
  };

  const CheckCreditScore = () => {
    return (
      <View style={styles.box}>
        <Image
          source={IMAGES.analytic}
          style={{ height: 100, resizeMode: 'contain' }}
        />
        <View style={{ height: 15 }} />
        <Typography
          variant="large"
          fontWeight="bold"
          color={COLORS.primary}
          textAlign="center"
          label={'Periksa Skor Kredit \nterbaru Anda'}
        />
        <View style={{ height: 15 }} />
        <View style={{ paddingHorizontal: 50, width: '100%' }}>
          <Button
            onPress={() => {
              navigation.navigate('VerificationPhone');
            }}
            variant={'primary'}
            radius={8}
            title={'Cek Sekarang'}
          />
        </View>
      </View>
    );
  };

  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <YourCreditScore />
        <CheckCreditScore />
        <View style={{ height: 25 }} />
      </ScrollView>
      <LogoutModal />
    </BasicLayout>
  );
};

export default DashboardScreen;
