import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GET_USER} from '../../utils/requests';
import {styleUser} from './user-page.styles';

interface User {
  id: string;
  name: string;
  email: string;
}

const renderUser = ({item}: {item: User}) => {
  return (
    <View style={styleUser.container}>
      <Text style={styleUser.text}>Name: {item.name}</Text>
      <Text style={styleUser.text}>Email: {item.email}</Text>
    </View>
  );
};

const keyExtractor = (item: {id: string}) => item.id;

export const UserPage = () => {
  const {data} = useQuery(GET_USER);
  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
