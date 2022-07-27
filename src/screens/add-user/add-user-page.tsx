import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';
import {ButtonComponent} from '../../components/button.component';
import {HeaderComponent} from '../../components/header.component';
import {InputComponent} from '../../components/input.component';
import {ADD_USER_MUTATION} from '../../utils/requests';
import {
  isBirthDateValid,
  cpfHasValidLength,
  isEmpty,
  emailIsValid,
  isPhoneValid,
} from '../login/login-validation';
import {
  Container,
  WrapperRadioButtons,
  TextRadioButtons,
  TextError,
} from '../../styles/screens.styles';

export const AddUserPage = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState(['', true]);
  const [createUser, {loading, error}] = useMutation(ADD_USER_MUTATION);
  const [validateInput, setValidateInput] = useState(true);

  const userValidation = () => {
    if ([name, email, phone, birthDate, cpf, role].some(isEmpty)) {
      setErrorMessage(['Campos não devem estar vazios', false]);
    } else if (!isPhoneValid(phone)) {
      setErrorMessage(['Telefone inválido', false]);
    } else if (!emailIsValid(email)) {
      setErrorMessage(['Email inválido', false]);
    } else if (!cpfHasValidLength(cpf)) {
      setErrorMessage(['CPF deve possuir 11 digitos', false]);
    } else if (!isBirthDateValid(birthDate)) {
      setErrorMessage(['Data de Aniversário inválida', false]);
    } else {
      setErrorMessage(['', true]);
    }
  };

  const handleAddUser = async () => {
    userValidation();
    if (errorMessage[1] === true) {
      setValidateInput(true);
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
      } catch (error: any) {
        setErrorMessage([error, false]);
      }
    } else {
      setValidateInput(false);
    }
  };

  return (
    <ScrollView>
      <Container>
        <HeaderComponent title={'Create User'} />
        <InputComponent
          label={'Nome'}
          value={name}
          onChangeText={setName}
          isValid={validateInput}
          placeholder={'Your name'}
        />
        <InputComponent
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          isValid={validateInput}
          placeholder={'user@email.com'}
        />
        <InputComponent
          label={'CPF'}
          value={cpf}
          onChangeText={setCpf}
          isValid={validateInput}
          placeholder={'00000000000'}
        />
        <InputComponent
          label={'Phone'}
          value={phone}
          onChangeText={setPhone}
          isValid={validateInput}
          placeholder={'DD000000000'}
        />
        <InputComponent
          label={'Birth Date'}
          value={birthDate}
          onChangeText={setBirthDate}
          isValid={validateInput}
          placeholder={'YYYY-MM-DD'}
        />
        <WrapperRadioButtons>
          <TextRadioButtons>User</TextRadioButtons>
          <RadioButton
            value="user"
            status={role === 'user' ? 'checked' : 'unchecked'}
            onPress={() => setRole('user')}
          />
          <TextRadioButtons>Admin</TextRadioButtons>
          <RadioButton
            value="admin"
            status={role === 'admin' ? 'checked' : 'unchecked'}
            onPress={() => setRole('admin')}
          />
        </WrapperRadioButtons>
        <ButtonComponent
          text={'Create User'}
          onPress={handleAddUser}
          loading={loading}
        />
        <TextError>{error && error.toString()}</TextError>
      </Container>
    </ScrollView>
  );
};

AddUserPage.options = {topBar: {title: {text: 'Add User'}}};
