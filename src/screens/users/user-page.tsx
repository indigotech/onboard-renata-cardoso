import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GET_USER} from '../../utils/requests';
import {UserListContainer, UserListText} from '../../styles/screens.styles';
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
      <UserListContainer>
        <UserListText>Name: {item.name}</UserListText>
        <UserListText>E-mail: {item.email}</UserListText>
        <TouchableOpacity onPress={() => handleUserDetails(item.id)}>
          <Text>Profile</Text>
        </TouchableOpacity>
      </UserListContainer>
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
      <FAB icon="plus" style={style.fab} onPress={handleAddUser} />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};

export const style = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginBottom: 20,
    marginRight: 20,
    right: 0,
    bottom: 0,
    backgroundColor: '#6550FF',
  },
});
