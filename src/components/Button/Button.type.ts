import { ButtonProps, ImageSourcePropType } from 'react-native';

export interface ButtonInterface extends ButtonProps {
  variant: 'primary' | 'secondary';
  radius?: number | null;
  leftIcon?: ImageSourcePropType | undefined;
  loading?: boolean;
  padding?: number;
  fontSize?: number;
  width?: number;
}
