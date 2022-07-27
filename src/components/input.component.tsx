import React from 'react';
import {View, TextInputProps} from 'react-native';
import styled from 'styled-components/native';

type Props = TextInputProps & {
  label: string;
  isValid: boolean;
};

export const InputComponent = ({label, isValid, ...TextInputProps}: Props) => {
  return (
    <View>
      <LabelStyled isValid={isValid}>{label}</LabelStyled>
      <InputStyled isValid={isValid} {...TextInputProps} />
      <CaptionStyled>
        {!isValid && 'Dados não foram inseridos corretamente'}
      </CaptionStyled>
    </View>
  );
};

const InputStyled = styled.TextInput<Props>`
  border: 1px solid;
  border-color: ${props => (props.isValid ? '#777777' : '#FF0000')}
  width: 320px;
  border-radius: 14px;
`;

const LabelStyled = styled.Text<Props>`
  color: ${props => (props.isValid ? '#777777' : '#FF0000')};
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 12px;
  margin-top: 4px;
`;

const CaptionStyled = styled.Text`
  color: #ff0000;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  margin-top: 8px;
`;
