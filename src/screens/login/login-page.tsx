import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {HomePage} from '../home/home-page';
import {LOGIN_MUTATION} from './login-mutation';
import {styles} from './login-page.styles';
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength,
} from './login-validation';
import {NavigationComponentProps} from 'react-native-navigation';

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
      const result = await login({variables: {email, password}});
      await AsyncStorage.setItem('token', result.data.login.token);
      Navigation.push(props.componentId, {
        component: HomePage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bem-vindo(a) à Taqtile!</Text>

      <View style={styles.wrapperInput}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput onChangeText={setEmail} value={email} style={styles.input} />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={loading}>
        {loading && <ActivityIndicator color="#FFFFFF" size="large" />}
        <Text style={styles.textButton}>{loading ? 'Loading' : 'Entrar'}</Text>
      </TouchableOpacity>
      <Text style={styles.textError}>{errorMessage}</Text>
    </View>
  );
};
