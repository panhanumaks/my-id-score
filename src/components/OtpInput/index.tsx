import Typography from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import COLORS from 'utils/colors';

const styles = StyleSheet.create({
  otpBoxesContainer: {
    flexDirection: 'row'
  },
  otpBox: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    height: Dimensions.get('window').width / 6,
    width: Dimensions.get('window').width / 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const OtpInput = ({
  values: otpVal,
  onChange: setOtpVal,
  errorValue,
  resendOtp
}: {
  values: string;
  onChange: (values: string) => void;
  errorValue: string | undefined;
  resendOtp?: () => void;
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  return (
    <View
      style={{
        position: 'relative',
        display: 'flex',
        flex: 1
      }}
    >
      <View style={styles.otpBoxesContainer}>
        {[0, 1, 2, 3].map((item, index) => (
          <View style={styles.otpBox} key={index}>
            <Typography
              label={otp[item]}
              color={COLORS.textGray}
              variant="extra-large"
              fontWeight="bold"
            />
          </View>
        ))}
      </View>
      <TextInput
        onChange={(value) => {
          if (value.nativeEvent.text.length > 4) {
            return setOtpVal(otpVal);
          }
          setOtpVal(value.nativeEvent.text);
        }}
        onChangeText={(value) => {
          if (value.length > 4) {
            return;
          }
          setOtp(value as any);
        }}
        style={{
          height: Dimensions.get('window').width / 6,
          width: '100%',
          position: 'absolute',
          opacity: 0
        }}
        keyboardType='numeric'
        value={otpVal}
      />
      <View style={{ height: 5 }} />
      <View style={{ flexDirection: 'row' }}>
        <Typography
          label={'Tidak Menerima Kode OTP ? '}
          color={COLORS.textGray}
          variant="small"
        />
        <Typography
          label={'Kirim Ulang'}
          color={COLORS.primary}
          textDecoration="underline"
          variant="small"
          onPress={resendOtp}
        />
      </View>

      {errorValue && (
        <Typography
          label={errorValue}
          color={COLORS.primary}
          variant="small"
          style={{ marginTop: 3 }}
        />
      )}
    </View>
  );
};

export default OtpInput;
