import DateTimePicker from '@react-native-community/datetimepicker';
import IMAGES from 'assets/images';
import Typography from 'components/Typography';
import moment from 'moment';
import { useState } from 'react';
import {
  Image,
  Platform,
  TextInput as RNTextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native';
import styled from 'styled-components';
import COLORS from 'utils/colors';

import { TextInputInterface } from './TextInput.type';

const TextInputStyled = styled(RNTextInput)<TextInputProps>`
  border: 1px solid ${COLORS.gray};
  border-radius: 9px;
  color: ${COLORS.dark};
  background-color: ${(props) => (props.editable ? COLORS.white : COLORS.gray)}
  padding: 4px 12px;
  width: 100%;
`;

const TextInput = (props: TextInputInterface) => {
  const { type, errorValue, prefix, editable = true } = props;
  const [show, setShow] = useState(false);

  const [date, setDate] = useState<Date>(props.value as any);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);

    props.onChange && props.onChange(currentDate);
  };

  return (
    <View
      style={{
        width: '100%'
      }}
    >
      <View style={{ flexDirection: 'row', width: '100%' }}>
        {showPicker && (
          <DateTimePicker
            value={date}
            mode={'datetime'}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        {prefix && (
          <TextInputStyled
            style={{ width: 'auto', marginRight: 5 }}
            editable={false}
            value={prefix}
          />
        )}

        <TouchableOpacity
          onPressIn={() => {
            if (type === 'date') {
              setShowPicker(true);
            }
          }}
          style={{ flex: 1 }}
        >
          <TextInputStyled
            {...props}
            editable={type !== 'date' ? editable : type !== 'date'}
            placeholderTextColor={COLORS.gray}
            secureTextEntry={!show && type === 'password'}
            value={
              type === 'date' ? moment(props.value).format('L') : props.value
            }
          />
        </TouchableOpacity>
      </View>
      {errorValue && (
        <Typography
          label={errorValue}
          color={COLORS.primary}
          variant="small"
          style={{ marginTop: 3 }}
        />
      )}
      {type === 'password' && (
        <TouchableOpacity
          onPress={() => setShow(!show)}
          style={{
            position: 'absolute',
            right: 0
          }}
        >
          <Image
            source={show ? IMAGES.icons.eyeView : IMAGES.icons.eyeHide}
            style={{
              width: 20,
              height: 20,
              margin: 10,
              opacity: 0.5
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;
