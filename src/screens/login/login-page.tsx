import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {LOGIN_MUTATION} from '../../utils/requests';
import {styles} from './login-page.styles';
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength,
} from './login-validation';
import {NavigationComponentProps} from 'react-native-navigation';
import {UserPage} from '../users/user-page';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';

export const LoginPage = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login, {loading}] = useMutation(LOGIN_MUTATION);

  const loginValidation = () => {
    if (isEmpty(email) || isEmpty(password)) {
      setErrorMessage('Campos não devem estar vazios');
    } else if (!emailIsValid(email)) {
      setErrorMessage('Email inválido');
    } else if (!passwordHasValidLength(password)) {
      setErrorMessage('Senha deve ter pelo menos 7 dígitos');
    } else if (!passwordHasNumber(password)) {
      setErrorMessage('Senha deve conter pelo menos um número');
    } else if (!passwordHasLetter(password)) {
      setErrorMessage('Senha deve possuir pelo menos uma letra');
    }
  };

  const handleSubmit = async () => {
    loginValidation();
    try {
      const result = await login({
        variables: {email: email, password: password},
      });
      await AsyncStorage.setItem('token', result.data.login.token);
      Navigation.push(props.componentId, {
        component: UserPage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo(a) à Taqtile!</Text>

      <View style={styles.wrapperInput}>
        <InputComponent
          label={'E-mail'}
          onChangeText={setEmail}
          value={email}
        />
        <InputComponent
          label={'Senha'}
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <ButtonComponent
        text={loading ? 'Loading' : 'Entrar'}
        onPress={handleSubmit}
        loading={loading}
      />
      <Text style={styles.textError}>{errorMessage}</Text>
    </View>
  );
};
