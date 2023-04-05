import IMAGES from 'assets/images';
import Typography from 'components/Typography';
import { Image, View } from 'react-native';

const PoweredByOjk = () => {
  return (
    <View style={[{ marginTop: 30, alignItems: 'center' }]}>
      <Typography
        fontWeight="bold"
        variant="small"
        label="Terdaftar dan diawasi oleh"
      />
      <View style={{ height: 8 }} />
      <Image
        source={IMAGES.ojk}
        style={{
          width: 128,
          height: 56
        }}
      />
    </View>
  );
};

export default PoweredByOjk;
