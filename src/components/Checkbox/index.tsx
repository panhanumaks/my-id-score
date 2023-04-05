import CheckBoxRN from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import COLORS from 'utils/colors';

import { CheckboxInterface } from './Checkbox.type';

const CheckBox = ({
  setSelection,
  isSelected,
  children,
  isError
}: CheckboxInterface) => {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBoxRN
        value={isSelected}
        onValueChange={() => setSelection(!isSelected)}
        style={[
          styles.checkbox,
          {
            borderColor: isError ? COLORS.primary : COLORS.dark
          }
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkbox: {
    alignSelf: 'center'
  },
  label: {
    margin: 8
  }
});

export default CheckBox;
