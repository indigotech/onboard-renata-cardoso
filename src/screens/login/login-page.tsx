import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { ActivityIndicator, AsyncStorage, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { HomePage } from '../home/home-page';
import { LOGIN_MUTATION } from './login-mutation';
import { styles } from './login-page.styles';
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength
} from './login-validation';

export const LoginPage = (props: { componentId: string }) => {
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
      if (errorMessage.length === 0) {
        const data = await login({ variables: { email, password } })
        await AsyncStorage.setItem('token', data.data.login.token)
        Navigation.push(props.componentId, {
          component: {
            name: 'HomePage',
            options: {
              topBar: {
                title: {
                  text: 'HomePage',
                },
              },
            },
          },
        });
      }
    }
    catch (error) {
      setErrorMessage(error.message);
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading && <ActivityIndicator color='#FFFFFF' size='large' />}
        <Text style={styles.textButton}>{loading ? 'Loading' : 'Entrar'}</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};

Navigation.registerComponent('Login', () => LoginPage);
Navigation.registerComponent('HomePage', () => HomePage);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login'
            }
          }
        ]
      }
    }
  });
});
