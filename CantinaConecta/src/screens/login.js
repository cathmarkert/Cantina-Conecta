import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from 'react-native';

const Login = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        navigation.reset({
          index: 0,
          routes:[{name: "HomeTab"}]
        })
    }

    return <View style={stylesLogin.container}>

        <Text style={stylesLogin.textTitle}> Bem-Vindo ao Cantina Conecta! </Text>
        <Text style={stylesLogin.textSubTitle}> Insira seus dados para acessar a conta. </Text>

        <TextInput
            style={stylesLogin.input}
            placeholder='Email'
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType='email-address'
        />

        <TextInput
            style={stylesLogin.input}
            placeholder='Senha'
            value={senha}
            onChangeText={text => setSenha(text)} 
            secureTextEntry={true}
        />

        <TouchableOpacity style={stylesLogin.button} onPress={handleLogin}>
            <Text style={stylesLogin.buttonText}>Entrar </Text>
        </TouchableOpacity>

    </View>;
}

const stylesLogin = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    textTitle: {
      color: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize:20,
      marginVertical:10,
    },
    textSubTitle: {
      color: '#808080',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:50,
    },
    input: {
      width: 300,
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius:10,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    button: {
      width: 200,
      height: 40,
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 50,
      marginVertical: 10,
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
    },
  
  });

export default Login;