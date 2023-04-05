export interface CheckboxInterface {
  variant?: 'primary' | 'secondary';
  children: JSX.Element | Array<JSX.Element>;
  setSelection: (e: boolean) => void;
  isSelected: boolean;
  isError?: boolean | string;
}
