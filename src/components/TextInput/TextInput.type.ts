import { TextInputProps } from 'react-native';

export interface TextInputInterface extends TextInputProps {
  variant?: 'primary';
  type?: 'password' | 'email' | 'date' | 'otp';
  errorValue?: string;
  prefix?: string;
}
