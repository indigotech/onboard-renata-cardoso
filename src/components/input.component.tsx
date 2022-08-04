import React from 'react';
import {View, TextInputProps} from 'react-native';
import {LabelStyled, InputStyled, CaptionStyled} from './input.component.style';

export type InputComponentProps = TextInputProps & {
  label: string;
  errorMessage?: string | null;
  isValid?: boolean;
};

export const InputComponent = ({
  label,
  errorMessage,
  isValid,
  ...textInputProps
}: InputComponentProps) => {
  return (
    <View>
      <LabelStyled isValid={isValid}>{label}</LabelStyled>
      <InputStyled isValid={isValid} {...textInputProps} />
      <CaptionStyled>{!isValid && errorMessage}</CaptionStyled>
    </View>
  );
};
