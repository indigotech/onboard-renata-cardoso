import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import {LOGIN_MUTATION} from '../../utils/requests';
import {emailValidation, passwordValidation} from '../../utils/validations';
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

export function isGraphQLError(error: any): error is GraphQLError {
  return Array.isArray(error?.graphQLErrors);
}

export const LoginPage = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(
    null,
  );
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<
    string | null
  >(null);

  const [isEmailInputValid, setIsEmailInputValid] = useState(true);
  const [isPasswordInputValid, setIsPasswordInputValid] = useState(true);

  const [login, {loading}] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async () => {
    const errorEmail = emailValidation(email);
    const errorPassword = passwordValidation(password);

    errorEmail
      ? (setIsEmailInputValid(false), setErrorEmailMessage(errorEmail))
      : (setIsEmailInputValid(true), setErrorEmailMessage(null));

    errorPassword
      ? (setIsPasswordInputValid(false), setErrorPasswordMessage(errorPassword))
      : (setIsPasswordInputValid(true), setErrorPasswordMessage(null));

    if (!errorEmail && !errorPassword) {
      setErrorMessage(null);
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
    <Container style={{marginTop: 32}}>
      <H1>Bem-vindo(a) à Taqtile!</H1>

      <LoginInputWrapper>
        <InputComponent
          label={'E-mail'}
          onChangeText={setEmail}
          value={email}
          errorMessage={errorEmailMessage}
          isValid={isEmailInputValid}
        />
        <InputComponent
          label={'Senha'}
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          errorMessage={errorPasswordMessage}
          isValid={isPasswordInputValid}
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
