import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {GET_USER} from '../../requests';
import {styleUser} from './user-page.styles';

interface User {
  id: string;
  name: string;
  email: string;
}

const renderUser = (item: {item: User}) => {
  return (
    <View style={styleUser.container}>
      <Text style={styleUser.text}>Name: {item.item.name}</Text>
      <Text style={styleUser.text}>Email: {item.item.email}</Text>
    </View>
  );
};

export const UserPage = () => {
  const {data} = useQuery(GET_USER);
  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
