import React from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components';
import COLORS from 'utils/colors';

import {
  FontWeightType,
  TextProps,
  TextVariantType
} from './Typography.type';

type TextFontSizeType =
  | '24px'
  | '20px'
  | '18px'
  | '16px'
  | '14px'
  | '12px'
  | '10px';

export const fontWeightMapper: Record<
  FontWeightType,
  string
> = {
  'extra-bold': '900',
  bold: '700',
  'semi-bold': '600',
  regular: '400',
  light: '300',
  thin: '200'
};

const fontSizeMapper: Record<
  TextVariantType,
  TextFontSizeType
> = {
  'ultra-large': '24px',
  'extra-larger': '20px',
  'extra-large': '18px',
  large: '16px',
  medium: '14px',
  small: '12px',
  'extra-small': '10px'
};

const StyledText = styled(RNText)<TextProps>`
  color: ${(props) =>
    props.color || COLORS.textGray};
  font-size: ${(props) =>
    fontSizeMapper[props.variant || 'medium']};
  font-style: ${({ fontStyle = 'normal' }) =>
    fontStyle};
  font-weight: ${(props) =>
    fontWeightMapper[
      props.fontWeight || 'regular'
    ]};
  text-align: ${({ textAlign }) =>
    textAlign || 'left'};
  text-decoration: ${({ textDecoration }) =>
    textDecoration || 'none'};
  text-transform: ${({ textTransform }) =>
    textTransform || 'none'};
`;

const Typography = (props: TextProps) => {
  //FIXME: fix eslint for destructuring-assignmen
  const { style, ...restProps } = props;
  return (
    <StyledText
      allowFontScaling={false}
      {...restProps}
      style={{
        ...(style as Record<string, unknown>),
        includeFontPadding: false
      }}
    >
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.label}
    </StyledText>
  );
};

export default Typography;
