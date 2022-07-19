import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { styles } from './login-page.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native'
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength
} from './login-validation';
import {LOGIN_MUTATION} from './login-mutation'
import { RootStackParamList } from '../../routes/app.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

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

  const navigation = useNavigation();

  const handleSubmit = async () => {
    loginValidation();
    
    try{
     if (errorMessage.length === 0) {
       setLoading(true)
       const data = await login({variables: {email, password}})
       await AsyncStorage.setItem('token', data.data.login.token)
       navigation.navigate('Home');
    }
  }
  catch(error){
    setErrorMessage(error.message);
  } 
  finally {
    setLoading(false);
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
          {loading && <ActivityIndicator color='#FFFFFF' size='large'/>}
          <Text style={styles.textButton}>{loading ? 'Loading' : 'Entrar'}</Text>
      </TouchableOpacity> 
      {errorMessage && <Text style={styles.textError}>{errorMessage}</Text>}
    </View>
  );
};
