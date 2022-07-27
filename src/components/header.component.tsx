import React from 'react';
import styled from 'styled-components/native';

type Props = {
  title: string;
};

export const HeaderComponent = ({title}: Props) => {
  return <H1>{title}</H1>;
};

const H1 = styled.Text`
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  text-align: center;
`;
