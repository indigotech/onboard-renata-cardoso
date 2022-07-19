import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './login-page.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength
} from './login-validation';
import {LOGIN_MUTATION} from './login-mutation'

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [login] = useMutation(LOGIN_MUTATION);

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
    if (errorMessage.length === 0) {
      const data = await login({variables: {email, password}})
      await AsyncStorage.setItem('token', data.data.login.token)
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};
