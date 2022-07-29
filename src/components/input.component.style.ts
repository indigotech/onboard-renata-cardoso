import styled from 'styled-components/native';
import {InputComponentProps} from './input.component';

export const InputStyled = styled.TextInput<InputComponentProps>`
  border: 1px solid;
  border-color: ${props => (props.isValid ? '#777777' : '#FF0000')}
  width: 320px;
  border-radius: 14px;
  height: 50px;
`;

export const LabelStyled = styled.Text<InputComponentProps>`
  color: ${props => (props.isValid ? '#777777' : '#FF0000')};
  font-size: 12px;
  font-weight: normal;
  margin-bottom: 12px;
  margin-top: 4px;
`;

export const CaptionStyled = styled.Text`
  color: #ff0000;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
  margin-top: 8px;
`;
