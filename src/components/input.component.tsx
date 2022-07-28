import React from 'react';
import {View, TextInputProps} from 'react-native';
import {LabelStyled, InputStyled, CaptionStyled} from './input.component.style';

export type InputComponentProps = TextInputProps & {
  label: string;
  isValid: boolean;
};

export const InputComponent = ({
  label,
  isValid,
  ...textInputProps
}: InputComponentProps) => {
  return (
    <View>
      <LabelStyled isValid={isValid}>{label}</LabelStyled>
      <InputStyled isValid={isValid} {...textInputProps} />
      <CaptionStyled>
        {!isValid && 'Dados não foram inseridos corretamente'}
      </CaptionStyled>
    </View>
  );
};
