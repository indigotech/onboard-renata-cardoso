import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {GET_USER} from '../../utils/requests';
import {styleUser} from './user-page.styles';
import {FAB} from 'react-native-paper';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {AddUserPage} from '../add-user/add-user-page';

interface User {
  id: string;
  name: string;
  email: string;
}

const keyExtractor = (item: {id: string}) => item.id;

export const UserPage = (props: NavigationComponentProps) => {
  const {data, fetchMore} = useQuery(GET_USER, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const handleLoadMore = () => {
    if (data.users.pageInfo.hasNextPage) {
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
    }
  };

  const handleAddUser = () => {
    Navigation.push(props.componentId, {
      component: AddUserPage,
    });
  };

  const handleUserDetails = (id: string) => {
    Navigation.push(props.componentId, {
      component: {
        name: 'UserDetailsPage',
        passProps: {
          id: id,
        },
      },
    });
  };

  const renderUser = ({item}: {item: User}) => {
    return (
      <TouchableOpacity onPress={() => handleUserDetails(item.id)}>
        <View style={styleUser.container}>
          <Text style={styleUser.text}>Name: {item.name}</Text>
          <Text style={styleUser.text}>Email: {item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
        onEndReached={handleLoadMore}
      />
      <FAB icon="plus" style={styleUser.fab} onPress={handleAddUser} />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
