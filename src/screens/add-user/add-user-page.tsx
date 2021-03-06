import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';
import {ADD_USER_MUTATION} from '../../utils/requests';
import {
  isBirthDateValid,
  cpfHasValidLength,
  isEmpty,
  emailIsValid,
  isPhoneValid,
} from '../login/login-validation';
import {UserPage} from '../users/user-page';
import {styleAddUser} from './add-user-page.styles';

export const AddUserPage = (props: NavigationComponentProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [errorMessage, setErrorMessage] = useState(['', false]);
  const [createUser, {loading}] = useMutation(ADD_USER_MUTATION);

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
        Navigation.push(props.componentId, {
          component: UserPage,
        });
      } catch (error: any) {
        setErrorMessage([error, false]);
      }
    }
  };

  return (
    <View style={styleAddUser.container}>
      <InputComponent label={'Name'} value={name} onChangeText={setName} />
      <InputComponent label={'Email'} value={email} onChangeText={setEmail} />
      <InputComponent label={'CPF'} value={cpf} onChangeText={setCpf} />
      <InputComponent label={'Phone'} value={phone} onChangeText={setPhone} />
      <InputComponent
        label={'Birth Date'}
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <View style={styleAddUser.radioButtons}>
        <Text style={styleAddUser.textRadio}>User</Text>
        <RadioButton
          value="user"
          status={role === 'user' ? 'checked' : 'unchecked'}
          onPress={() => setRole('user')}
        />
        <Text style={styleAddUser.textRadio}>Admin</Text>
        <RadioButton
          value="admin"
          status={role === 'admin' ? 'checked' : 'unchecked'}
          onPress={() => setRole('admin')}
        />
      </View>
      <ButtonComponent
        text={'Create User'}
        onPress={handleAddUser}
        loading={loading}
      />
      <Text style={styleAddUser.textError}>
        {errorMessage ? errorMessage : ''}
      </Text>
    </View>
  );
};

AddUserPage.options = {topBar: {title: {text: 'Add User'}}};
