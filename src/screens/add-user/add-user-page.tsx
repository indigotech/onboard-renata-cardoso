import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ButtonComponent} from '../../components/button.component';
import {InputComponent} from '../../components/input.component';
import {birthDateIsValid, cpfHasValidLength} from '../login/login-validation';
import {styleAddUser} from './add-user-page.styles';

export const AddUserPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const userValidation = () => {
    if (
      name === '' ||
      email === '' ||
      phone === '' ||
      birthDate === '' ||
      cpf === '' ||
      role === ''
    ) {
      setErrorMessage('Campos não devem estar vazios');
    } else if (!birthDateIsValid) {
      setErrorMessage('Data de Aniversário inválida');
    } else if (!cpfHasValidLength) {
      setErrorMessage('CPF deve possuir 11 digitos');
    }
  };

  const handleAddUser = () => {
    userValidation();
    if (errorMessage.length === 0) {
      console.log('Usuario adicionado com sucesso');
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
      <InputComponent label={'Role'} value={role} onChangeText={setRole} />

      <ButtonComponent text={'Add User'} onPress={handleAddUser} />
      <Text style={styleAddUser.textError}>{errorMessage}</Text>
    </View>
  );
};

AddUserPage.options = {topBar: {title: {text: 'Add User'}}};
