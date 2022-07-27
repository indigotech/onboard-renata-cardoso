import React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

type Props = TouchableOpacityProps & {
  text: string;
  loading?: boolean;
  disabled?: string;
};

export const ButtonComponent = ({
  text,
  loading,
  disabled,
  ...touchableOpacityProps
}: Props) => {
  return (
    <ButtonStyled disabled={disabled || loading} {...touchableOpacityProps}>
      {loading && <ActivityIndicator color="#FFFFFF" size="large" />}
      <TextStyled>{text}</TextStyled>
    </ButtonStyled>
  );
};

const ButtonStyled = styled.TouchableOpacity`
  background-color: #6550ff;
  height: 44px;
  border-radius: 14px;
  align-self: center;
  margin-top: 32px;
  flex-direction: row;
  justify-content: center;
  padding-left: 60px;
  padding-right: 60px;
`;

const TextStyled = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  margin-top: 10px;
`;
