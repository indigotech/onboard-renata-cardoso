import React from 'react';
import {  View,  Text, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './login-page.styles';

export function LoginPage(){
    return(
        <View style={styles.container}>
            <Text style={styles.header}>Bem-vindo(a) à Taqtile!</Text>

            <View style={styles.wrapperInput}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput style={styles.input} />
                <Text style={styles.label}>Senha</Text>
                <TextInput style={styles.input} />
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.textButton}>Entrar</Text>
            </TouchableOpacity>
            
        </View>
    )
}
