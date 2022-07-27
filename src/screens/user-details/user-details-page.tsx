import {useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import {HeaderComponent} from '../../components/header.component';
import {GET_USER_DETAIL} from '../../utils/requests';
import {Content, TextContent} from '../../styles/screens.styles';

export const UserDetailsPage = (props: {id: string}) => {
  const {data} = useQuery(GET_USER_DETAIL, {
    variables: {id: props.id},
  });
  return (
    <View>
      <HeaderComponent title={data?.user.name} />
      <Content>
        <TextContent>E-mail: {data?.user.email}</TextContent>
        <TextContent>Phone: {data?.user.phone}</TextContent>
        <TextContent>Birth Date: {data?.user.birthDate}</TextContent>
        <TextContent>Role: {data?.user.role}</TextContent>
      </Content>
    </View>
  );
};

UserDetailsPage.options = {topBar: {title: {text: 'User Details'}}};
