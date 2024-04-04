import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { stylesLogin } from './stylesLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        Alert.alert(`Email: ${email}\nSenha: ${senha}`)
    }

    return <View style={stylesLogin.container}>

        <Text style={stylesLogin.textTitle}> Bem-Vindo ao Cantina Conecta! </Text>
        <Text style={stylesLogin.textSubTitle}> Insira seus dados para acessar a conta. </Text>

        <TextInput
            style={stylesLogin.input}
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
        />

        <TextInput
            style={stylesLogin.input}
            placeholder='Senha'
            value={senha}
            onChangeText={text => setSenha(text)}
        />

        <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
            <Text style={stylesLogin.buttonText}>Entrar </Text>
        </TouchableOpacity>

    </View>;
}

export default Login;