import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {LOGIN_MUTATION} from '../../utils/requests';
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
import {HeaderComponent} from '../../components/header.component';
import {Container, WrapperInput, TextError} from '../../styles/screens.styles';

export const LoginPage = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(['', true]);
  const [validateInput, setValidateInput] = useState(true);

  const [login, {loading, error}] = useMutation(LOGIN_MUTATION);

  const loginValidation = () => {
    if (isEmpty(email) || isEmpty(password)) {
      setErrorMessage(['Campos não devem estar vazios', false]);
    } else if (!emailIsValid(email)) {
      setErrorMessage(['Email inválido', false]);
    } else if (!passwordHasValidLength(password)) {
      setErrorMessage(['Senha deve ter pelo menos 7 dígitos', false]);
    } else if (!passwordHasNumber(password)) {
      setErrorMessage(['Senha deve conter pelo menos um número', false]);
    } else if (!passwordHasLetter(password)) {
      setErrorMessage(['Senha deve possuir pelo menos uma letra', false]);
    } else {
      setErrorMessage(['', true]);
    }
  };

  const handleSubmit = async () => {
    loginValidation();
    if (errorMessage[1] === true) {
      setValidateInput(true);
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
    } else {
      setValidateInput(false);
    }
  };

  return (
    <Container>
      <HeaderComponent title={'Bem-vindo(a) à Taqtile!'} />

      <WrapperInput>
        <InputComponent
          label={'E-mail'}
          onChangeText={setEmail}
          value={email}
          isValid={validateInput}
        />
        <InputComponent
          label={'Senha'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          isValid={validateInput}
        />
      </WrapperInput>
      <ButtonComponent
        text={loading ? 'Loading' : 'Entrar'}
        onPress={handleSubmit}
        loading={loading}
      />
      <TextError>{error && error.toString()}</TextError>
    </Container>
  );
};
