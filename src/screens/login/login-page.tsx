import React, { useState } from 'react';
import {  View,  Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './login-page.styles';
import { notEmpty, emailValid, passwordLength, passwordHasNumber, passwordHasLetter} from './login-validation';

export const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSubmit = ()  => {
        if (notEmpty(email, password) === false){
            setErrorMessage('Campos não devem estar vazios')
            setHasError(true)
        }

        else if (emailValid(email) === false){
            setErrorMessage('Email inválido')
            setHasError(true)
        }

        else if (passwordLength(password) === false){
            setErrorMessage('Senha deve ter pelo menos 7 dígitos')
            setHasError(true)
        }

        else if (passwordHasNumber(password) === false){
            setErrorMessage('Senha deve conter pelo menos um número')
            setHasError(true)
        }

        else if (passwordHasLetter(password) === false){
            setErrorMessage('Senha deve possuir pelo menos uma letra')
            setHasError(true)
        }

        else{
            setHasError(false)
        }
        
    }
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Bem-vindo(a) à Taqtile!</Text>

            <View style={styles.wrapperInput}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput onChangeText={setEmail} value={email} style={styles.input} />
                <Text style={styles.label}>Senha</Text>
                <TextInput onChangeText={setPassword} value={password} style={styles.input} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
             {hasError && <Text style={styles.textError}>{errorMessage}</Text>}
            
        </View>
    )
}
