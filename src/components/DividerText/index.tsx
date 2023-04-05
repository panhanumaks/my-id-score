import Typography from 'components/Typography';
import { useState } from 'react';
import { View, ViewProps } from 'react-native';
import styled from 'styled-components';
import COLORS from 'utils/colors';

import { DividerTextInterface } from './DividerText.type';

const DividerText = (
  props: DividerTextInterface
) => {
  const { label } = props;
  const [widthWrapper, setWidthWrapper] =
    useState(0);
  const [widthTextWrapper, setWidthTextWrapper] =
    useState(0);

  const DividerViewStyled = styled(
    View
  )<ViewProps>`
    padding: 20px;
    width: 100%;
  `;

  const DividerStyled = styled(View)<ViewProps>`
    background-color: ${COLORS.dark};
    height: 1px;
    width: 100%;
  `;

  return (
    <DividerViewStyled
      onLayout={(event) =>
        setWidthWrapper(
          event.nativeEvent.layout.width
        )
      }
    >
      <DividerStyled />
      <View
        style={{
          backgroundColor: COLORS.white,
          position: 'absolute',
          left:
            widthWrapper / 2 -
            widthTextWrapper / 2,
          top: 10
        }}
        onLayout={(event) =>
          setWidthTextWrapper(
            event.nativeEvent.layout.width
          )
        }
      >
        <Typography
          style={{ paddingHorizontal: 5 }}
          label={label}
          color={COLORS.dark}
        />
      </View>
    </DividerViewStyled>
  );
};

export default DividerText;
