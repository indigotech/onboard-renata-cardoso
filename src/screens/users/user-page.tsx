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

export const UserPage = () => {
  const {data, fetchMore} = useQuery(GET_USER, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const handleLoadMore = () => {
    fetchMore({
      variables: {
        offset: data.users.nodes.length,
      },
      updateQuery: (previousResult = {}, {fetchMoreResult = {}}) => {
        const result = fetchMoreResult?.users.nodes ?? [];
        return {
          ...previousResult,
          users: {
            ...previousResult.users,
            nodes: [...previousResult.users.nodes, ...result],
          },
        };
      },
    });
  };

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
