import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';
import {ADD_USER_MUTATION} from '../../utils/requests';
import {
  emailValidation,
  nameValidation,
  phoneValidation,
  cpfValidation,
  birthDateValidation,
} from '../../utils/validations';
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
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(
    null,
  );
  const [errorNameMessage, setErrorNameMessage] = useState<string | null>(null);
  const [errorPhoneMessage, setErrorPhoneMessage] = useState<string | null>(
    null,
  );
  const [errorCpfMessage, setErrorCpfMessage] = useState<string | null>(null);
  const [errorBirthDateMessage, setErrorBirthDateMessage] = useState<
    string | null
  >(null);

  const [isEmailInputValid, setIsEmailInputValid] = useState(true);
  const [isNameInputValid, setIsNameInputValid] = useState(true);
  const [isPhoneInputValid, setIsPhoneInputValid] = useState(true);
  const [isCpfInputValid, setIsCpfInputValid] = useState(true);
  const [isBirthDateInputValid, setIsBirthDateInputValid] = useState(true);

  const handleAddUser = async () => {
    const errorEmail = emailValidation(email);
    const errorName = nameValidation(name);
    const errorPhone = phoneValidation(phone);
    const errorCpf = cpfValidation(cpf);
    const errorBirthDate = birthDateValidation(birthDate);

    errorEmail
      ? (setIsEmailInputValid(false), setErrorEmailMessage(errorEmail))
      : (setIsEmailInputValid(true), setErrorEmailMessage(null));

    errorName
      ? (setIsNameInputValid(false), setErrorNameMessage(errorName))
      : (setIsNameInputValid(true), setErrorNameMessage(null));

    errorPhone
      ? (setIsPhoneInputValid(false), setErrorPhoneMessage(errorPhone))
      : (setIsPhoneInputValid(true), setErrorPhoneMessage(null));

    errorCpf
      ? (setIsCpfInputValid(false), setErrorCpfMessage(errorCpf))
      : (setIsCpfInputValid(true), setErrorCpfMessage(null));

    errorBirthDate
      ? (setIsBirthDateInputValid(false),
        setErrorBirthDateMessage(errorBirthDate))
      : (setIsBirthDateInputValid(true), setErrorBirthDateMessage(null));

    if (
      !errorEmail &&
      !errorName &&
      !errorPhone &&
      !errorCpf &&
      !errorBirthDate
    ) {
      setErrorMessage(null);
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
          isNameValid={isNameInputValid}
          errorNameMessage={errorNameMessage}
          isValid={isNameInputValid}
          placeholder={'Your name'}
        />
        <InputComponent
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          isEmailValid={isEmailInputValid}
          errorEmailMessage={errorEmailMessage}
          isValid={isEmailInputValid}
          placeholder={'user@email.com'}
        />
        <InputComponent
          label={'CPF'}
          value={cpf}
          onChangeText={setCpf}
          isCpfValid={isCpfInputValid}
          errorCpfMessage={errorCpfMessage}
          isValid={isCpfInputValid}
          placeholder={'00000000000'}
        />
        <InputComponent
          label={'Phone'}
          value={phone}
          onChangeText={setPhone}
          isPhoneValid={isPhoneInputValid}
          errorPhoneMessage={errorPhoneMessage}
          isValid={isPhoneInputValid}
          placeholder={'DD000000000'}
        />
        <InputComponent
          label={'Birth Date'}
          value={birthDate}
          onChangeText={setBirthDate}
          isBirthDateValid={isBirthDateInputValid}
          errorBirthDateMessage={errorBirthDateMessage}
          isValid={isBirthDateInputValid}
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
