import {useQuery} from '@apollo/client';
import React from 'react';
import {View} from 'react-native';
import {GET_USER_DETAIL} from '../../utils/requests';
import {
  H1,
  UserDetailsInfoText,
  UserDetailsInfoWrapper,
} from '../../styles/screens.styles';

export const UserDetailsPage = (props: {id: string}) => {
  const {data} = useQuery(GET_USER_DETAIL, {
    variables: {id: props.id},
  });
  return (
    <View>
      {data && (
        <>
          <H1>{data?.user.name}</H1>
          <UserDetailsInfoWrapper>
            <UserDetailsInfoText>
              E-mail: {data?.user.email}
            </UserDetailsInfoText>
            <UserDetailsInfoText>Phone: {data?.user.phone}</UserDetailsInfoText>
            <UserDetailsInfoText>
              Birth Date: {data?.user.birthDate}
            </UserDetailsInfoText>
            <UserDetailsInfoText>Role: {data?.user.role}</UserDetailsInfoText>
          </UserDetailsInfoWrapper>
        </>
      )}
    </View>
  );
};

UserDetailsPage.options = {topBar: {title: {text: 'User Details'}}};
