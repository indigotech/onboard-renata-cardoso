import React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import {ButtonStyled, ButtonTextStyled} from './button.component.style';

type ButtonComponentProps = TouchableOpacityProps & {
  text: string;
  loading?: boolean;
  disabled?: string;
};

export const ButtonComponent = ({
  text,
  loading,
  disabled,
  ...touchableOpacityProps
}: ButtonComponentProps) => {
  return (
    <ButtonStyled disabled={disabled || loading} {...touchableOpacityProps}>
      {loading && <ActivityIndicator color="#FFFFFF" size="large" />}
      <ButtonTextStyled>{text}</ButtonTextStyled>
    </ButtonStyled>
  );
};
