import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from './login-page.styles';
import {
  emailIsValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasLength,
} from './login-validation';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loginValidation = () => {
    if (isEmpty(email, password)) {
      setErrorMessage('Campos não devem estar vazios');
    } else if (!emailIsValid(email)) {
      setErrorMessage('Email inválido');
    } else if (!passwordHasLength(password)) {
      setErrorMessage('Senha deve ter pelo menos 7 dígitos');
    } else if (!passwordHasNumber(password)) {
      setErrorMessage('Senha deve conter pelo menos um número');
    } else if (!passwordHasLetter(password)) {
      setErrorMessage('Senha deve possuir pelo menos uma letra');
    }
  };

  const handleSubmit = () => {
    loginValidation();
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
