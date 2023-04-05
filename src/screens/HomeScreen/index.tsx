/* eslint-disable eslint-comments/disable-enable-pair */

import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from 'assets/images/index';
import Button from 'components/Button';
import Typography from 'components/Typography';
import BasicLayout from 'layouts/BasicLayout';
import React, { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import COLORS from 'utils/colors';

import CarouselCardItem, { ITEM_WIDTH, SLIDER_WIDTH } from './CarouselCardItem';
import styles from './styles';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [indexPagination, setIndexPagination] = useState(0);
  const data = [
    {
      title: 'Reputasi menunjukkan siapa diri Sobat IdScore',
      imgUrl: IMAGES.onBoarding.one,
      imgHeight: 140
    },
    {
      title:
        'Jangan khawatir, data pribadi Sobat IdScore akan kami jaga dengan keamanan yang ketat dan terpercaya',
      imgUrl: IMAGES.onBoarding.two,
      imgHeight: 140
    },
    {
      title: '100 % Aman lewat Verifikasi KTP Dan Selfie',
      imgUrl: IMAGES.onBoarding.three,
      imgHeight: 140
    }
  ];
  const isCarousel = useRef(null);

  return (
    <BasicLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={IMAGES.myIdScore} style={styles.myIdScoreLogo} />
        <Carousel
          vertical={false}
          layout="tinder"
          layoutCardOffset={18}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndexPagination(index)}
          useScrollView={true}
        />
        <View style={{ top: -40 }}>
          <Pagination
            carouselRef={isCarousel as any}
            dotsLength={data.length}
            activeDotIndex={indexPagination}
            dotStyle={{
              width: 40,
              height: 6,
              borderRadius: 4,
              marginHorizontal: 0,
              backgroundColor: COLORS.primary
            }}
            inactiveDotStyle={{
              width: 40,
              height: 6,
              borderRadius: 4,
              marginHorizontal: 0,
              backgroundColor: COLORS.gray
            }}
            inactiveDotOpacity={1}
            inactiveDotScale={0.95}
            tappableDots={true}
          />
        </View>
        <View style={styles.footerWrapper}>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={() => navigation.navigate('Register')}
              variant={'primary'}
              radius={27}
              title={'Daftar'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              marginBottom: 15
            }}
          >
            <Typography
              fontWeight="bold"
              variant="small"
              label="Sudah Terdaftar ? "
            />
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('Login')}
            >
              <Typography
                fontWeight="bold"
                variant="small"
                color={COLORS.primary}
                label="Masuk Akun"
              />
            </TouchableOpacity>
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

export default HomeScreen;
