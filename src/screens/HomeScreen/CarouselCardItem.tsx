import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import COLORS from 'utils/colors';

export const SLIDER_WIDTH =
  Dimensions.get('window').width + 80;
export const ITEM_WIDTH = Math.round(
  SLIDER_WIDTH * 0.7
);

const CarouselCardItem = ({
  item,
  index
}: any) => {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.imageWrapper}>
        <Image
          source={item.imgUrl}
          style={{
            ...styles.image,
            height: item.imgHeight
          }}
        />
      </View>
      <Text style={styles.title}>
        {item.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: ITEM_WIDTH,
    minHeight: 250
  },
  image: {
    width: ITEM_WIDTH,
    resizeMode: 'contain'
  },
  imageWrapper: {
    height: 150,
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    color: COLORS.dark,
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 30
  }
});

export default CarouselCardItem;
