import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {LOGIN_MUTATION} from '../../utils/requests';
import {
  isEmailValid,
  isEmpty,
  passwordHasLetter,
  passwordHasNumber,
  passwordHasValidLength,
} from './login-validation';
import {NavigationComponentProps} from 'react-native-navigation';
import {UserPage} from '../users/user-page';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';
import {
  H1,
  Container,
  LoginInputWrapper,
  TextError,
} from '../../styles/screens.styles';

interface GraphQLError {
  graphQLErrors: Array<{
    message: string;
  }>;
}

export function isGraphQLError(error: unknown): error is GraphQLError {
  return Array.isArray((error as any)?.graphQLErrors);
}

export const LoginPage = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidInput, setIsValidInput] = useState(true);

  const [login, {loading}] = useMutation(LOGIN_MUTATION);

  const loginValidation = () => {
    if (isEmpty(email) || isEmpty(password)) {
      return 'Campos não devem estar vazios';
    } else if (!isEmailValid(email)) {
      return 'Email inválido';
    } else if (!passwordHasValidLength(password)) {
      return 'Senha deve ter pelo menos 7 dígitos';
    } else if (!passwordHasNumber(password)) {
      return 'Senha deve conter pelo menos um número';
    } else if (!passwordHasLetter(password)) {
      return 'Senha deve possuir pelo menos uma letra';
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    const errorLogin = loginValidation();
    if (errorLogin) {
      setErrorMessage(errorLogin);
      setIsValidInput(false);
    } else {
      setIsValidInput(true);
      try {
        const result = await login({
          variables: {email: email, password: password},
        });
        await AsyncStorage.setItem('token', result.data.login.token);
        Navigation.push(props.componentId, {
          component: UserPage,
        });
      } catch (error: unknown) {
        if (isGraphQLError(error)) {
          setErrorMessage(error.graphQLErrors[0].message);
        } else {
          setErrorMessage('Algo deu errado');
        }
      }
    }
  };

  return (
    <Container>
      <H1>Bem-vindo(a) à Taqtile!</H1>

      <LoginInputWrapper>
        <InputComponent
          label={'E-mail'}
          onChangeText={setEmail}
          value={email}
          isValid={isValidInput}
        />
        <InputComponent
          label={'Senha'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          isValid={isValidInput}
        />
      </LoginInputWrapper>
      <ButtonComponent
        text={loading ? 'Loading' : 'Entrar'}
        onPress={handleSubmit}
        loading={loading}
      />
      {errorMessage && <TextError>{errorMessage}</TextError>}
    </Container>
  );
};
