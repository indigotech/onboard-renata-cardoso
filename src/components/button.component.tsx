import React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import {ButtonStyled, TextStyled} from './button.component.style';

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
      <TextStyled>{text}</TextStyled>
    </ButtonStyled>
  );
};
