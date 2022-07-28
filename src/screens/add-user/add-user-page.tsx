import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';
import {ADD_USER_MUTATION} from '../../utils/requests';
import {
  isBirthDateValid,
  cpfHasValidLength,
  isEmpty,
  isEmailValid,
  isPhoneValid,
} from '../login/login-validation';
import {
  H1,
  Container,
  AddUserTextRadioButtons,
  AddUserRadioButtonsWrapper,
  TextError,
} from '../../styles/screens.styles';
import {isGraphQLError} from '../login/login-page';

export const AddUserPage = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [createUser, {loading}] = useMutation(ADD_USER_MUTATION);
  const [isValidInput, setIsValidInput] = useState(true);

  const userValidation = () => {
    if ([name, email, phone, birthDate, cpf, role].some(isEmpty)) {
      return 'Campos não devem estar vazios';
    } else if (!isPhoneValid(phone)) {
      return 'Telefone inválido';
    } else if (!isEmailValid(email)) {
      return 'Email inválido';
    } else if (!cpfHasValidLength(cpf)) {
      return 'CPF deve possuir 11 digitos';
    } else if (!isBirthDateValid(birthDate)) {
      return 'Data de Aniversário inválida';
    } else {
      return null;
    }
  };

  const handleAddUser = async () => {
    const errorAddUser = userValidation();
    if (errorAddUser) {
      setErrorMessage(errorAddUser);
      setIsValidInput(false);
    } else {
      setIsValidInput(true);
      try {
        await createUser({
          variables: {
            data: {
              name: name,
              phone: phone,
              birthDate: birthDate,
              email: email,
              role: role,
            },
          },
        });
        Navigation.pop(props.componentId);
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
    <ScrollView>
      <Container>
        <H1>Create User</H1>
        <InputComponent
          label={'Name'}
          value={name}
          onChangeText={setName}
          isValid={isValidInput}
          placeholder={'Your name'}
        />
        <InputComponent
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          isValid={isValidInput}
          placeholder={'user@email.com'}
        />
        <InputComponent
          label={'CPF'}
          value={cpf}
          onChangeText={setCpf}
          isValid={isValidInput}
          placeholder={'00000000000'}
        />
        <InputComponent
          label={'Phone'}
          value={phone}
          onChangeText={setPhone}
          isValid={isValidInput}
          placeholder={'DD000000000'}
        />
        <InputComponent
          label={'Birth Date'}
          value={birthDate}
          onChangeText={setBirthDate}
          isValid={isValidInput}
          placeholder={'YYYY-MM-DD'}
        />
        <AddUserRadioButtonsWrapper>
          <AddUserTextRadioButtons>User</AddUserTextRadioButtons>
          <RadioButton
            value="user"
            status={role === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setRole('user')}
          />
          <AddUserTextRadioButtons>Admin</AddUserTextRadioButtons>
          <RadioButton
            value="admin"
            status={role === 'admin' ? 'checked' : 'unchecked'}
            onPress={() => setRole('admin')}
          />
        </AddUserRadioButtonsWrapper>
        <ButtonComponent
          text={'Create User'}
          onPress={handleAddUser}
          loading={loading}
        />
        {errorMessage && <TextError>{errorMessage}</TextError>}
      </Container>
    </ScrollView>
  );
};

AddUserPage.options = {topBar: {title: {text: 'Add User'}}};
