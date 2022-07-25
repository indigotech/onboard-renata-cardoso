import {useQuery} from '@apollo/client';
import React from 'react';
import {Text, View} from 'react-native';
import {GET_USER} from '../../requests';
import {styles} from './user-page.styles';

export const UserPage = () => {
  const {
    data: {users},
  } = useQuery(GET_USER);
  if (users) {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.text}>Name: {users.nodes.name}</Text>
          <Text style={styles.text}>Email: {users.nodes.email}</Text>
        </View>
      </View>
    );
  }
  return <View></View>;
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
