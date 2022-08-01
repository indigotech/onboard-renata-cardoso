import React from 'react';
import {View, TextInputProps} from 'react-native';
import {LabelStyled, InputStyled, CaptionStyled} from './input.component.style';

export type InputComponentProps = TextInputProps & {
  label: string;
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
  isBirthDateValid?: boolean;
  isCpfValid?: boolean;
  isNameValid?: boolean;
  isPhoneValid?: boolean;
  errorEmailMessage?: string | null;
  errorPasswordMessage?: string | null;
  errorBirthDateMessage?: string | null;
  errorCpfMessage?: string | null;
  errorNameMessage?: string | null;
  errorPhoneMessage?: string | null;
};

export const InputComponent = ({
  label,
  isEmailValid,
  isPasswordValid,
  isBirthDateValid,
  isNameValid,
  isCpfValid,
  isPhoneValid,
  errorEmailMessage,
  errorPasswordMessage,
  errorBirthDateMessage,
  errorCpfMessage,
  errorNameMessage,
  errorPhoneMessage,
  ...textInputProps
}: InputComponentProps) => {
  return (
    <View>
      <LabelStyled
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        isNameValid={isNameValid}
        isBirthDateValid={isBirthDateValid}
        isCpfValid={isCpfValid}
        isPhoneValid={isPhoneValid}>
        {label}
      </LabelStyled>
      <InputStyled
        isEmailValid={isEmailValid}
        isPasswordValid={isPasswordValid}
        isNameValid={isNameValid}
        isBirthDateValid={isBirthDateValid}
        isCpfValid={isCpfValid}
        isPhoneValid={isPhoneValid}
        {...textInputProps}
      />
      <CaptionStyled>
        {!isEmailValid && errorEmailMessage}
        {!isPasswordValid && errorPasswordMessage}
        {!isNameValid && errorNameMessage}
        {!isBirthDateValid && errorBirthDateMessage}
        {!isCpfValid && errorCpfMessage}
        {!isPhoneValid && errorPhoneMessage}
      </CaptionStyled>
    </View>
  );
};
