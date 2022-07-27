import {useQuery} from '@apollo/client';
import React from 'react';
import {View, Text} from 'react-native';
import {GET_USER_DETAIL} from '../../utils/requests';
import {styleUserDetails} from './user-details-page.styles';

export const UserDetailsPage = (props: {id: string}) => {
  const {data} = useQuery(GET_USER_DETAIL, {
    variables: {id: props.id},
  });
  return (
    <View>
      <Text style={styleUserDetails.title}>{data?.user.name}</Text>
      <View style={styleUserDetails.content}>
        <Text style={styleUserDetails.text}>E-mail: {data?.user.email}</Text>
        <Text style={styleUserDetails.text}>Phone: {data?.user.phone}</Text>
        <Text style={styleUserDetails.text}>
          Birth Date: {data?.user.birthDate}
        </Text>
        <Text style={styleUserDetails.text}>Role: {data?.user.role}</Text>
      </View>
    </View>
  );
};

UserDetailsPage.options = {topBar: {title: {text: 'User Details'}}};
