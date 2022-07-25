import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {GET_USER} from '../../utils/requests';
import {styleUser} from './user-page.styles';
import {FAB} from 'react-native-paper';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {AddUserPage} from '../add-user/add-user-page';
import {ButtonComponent} from '../../components/button.component';

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

export const UserPage = (props: NavigationComponentProps) => {
  const [count, setCount] = useState(0);
  const {data, refetch} = useQuery(GET_USER, {
    variables: {offset: count},
  });

  const handleLoadMore = () => {
    setCount(count + limit);
    refetch({offset: count});
  };

  const handleAddUser = () => {
    Navigation.push(props.componentId, {
      component: AddUserPage,
    });
  };

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderUser}
        keyExtractor={keyExtractor}
      />
      <ButtonComponent text={'Load More'} onPress={handleLoadMore} />
      <FAB icon="plus" style={styleUser.fab} onPress={handleAddUser} />
    </View>
  );
};

UserPage.options = {topBar: {title: {text: 'User List'}}};
