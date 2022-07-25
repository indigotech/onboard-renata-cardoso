import {useQuery} from '@apollo/client';
import React, {useRef, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
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
const limit = 10;

export const UserPage = () => {
  const [count, setCount] = useState(0);
  const {data, refetch} = useQuery(GET_USER, {
    variables: {offset: count},
  });

  const handleLoadMore = () => {
    setCount(count + limit);
    refetch({offset: count});
  };

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
      />
      <TouchableOpacity style={styleUser.button} onPress={handleLoadMore}>
        <Text style={styleUser.textButton}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
