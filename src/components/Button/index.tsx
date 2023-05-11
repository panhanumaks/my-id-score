import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text
} from 'react-native';
import COLORS from 'utils/colors';

import { ButtonInterface } from './Button.type';

const Button = (props: ButtonInterface) => {
  const {
    color,
    radius,
    variant,
    title,
    onPress,
    leftIcon,
    loading,
    disabled,
    fontSize,
    padding,
    width
  } = props;

  const styles = StyleSheet.create({
    button: {
      width: width || '100%',
      padding: padding || 15,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }
  });

  const [timesPressed, setTimesPressed] = useState(false);

  useEffect(() => {
    if (timesPressed) {
      setTimeout(() => {
        setTimesPressed(false);
      }, 200);
    }
  }, [timesPressed]);

  return (
    <Pressable
      {...props}
      onPress={(event: any) => {
        setTimesPressed(true);
        return onPress && onPress(event);
      }}
      style={{
        ...styles.button,
        borderRadius: radius || 0,
        backgroundColor: color
          ? color
          : variant === 'primary'
          ? COLORS.primary
          : COLORS.white,
        opacity: disabled ? 0.6 : timesPressed ? 0.8 : 1,
        elevation: variant === 'primary' ? 0 : 4
      }}
      disabled={loading || disabled}
    >
      {loading ? (
        <>
          <ActivityIndicator
            size={'small'}
            color={variant === 'primary' ? COLORS.white : COLORS.primary}
          />
        </>
      ) : (
        <>
          {leftIcon && (
            <Image
              source={leftIcon}
              style={{
                width: 26,
                height: 26,
                marginRight: 0,
                top: 1
              }}
            />
          )}
          <Text
            style={{
              color: variant === 'primary' ? COLORS.white : COLORS.dark,
              fontWeight: 'bold',
              fontSize: fontSize || 16,
              textAlign: 'center'
            }}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

export default Button;
