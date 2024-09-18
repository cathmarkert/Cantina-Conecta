import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../stylesScreen/stylesLogin';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        if (!email || !senha) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        // Placeholder for actual login logic
        // Perform login API request here
        
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeTabs" }]
        });
    };

    const handleOwnerLogin = () => {
        if (!email || !senha) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        // Placeholder for actual owner login logic
        // Perform login API request here
        
        navigation.reset({
            index: 0,
            routes: [{ name: "HomeOwnerTabs" }]
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}>Bem-Vindo ao Cantina Conecta!</Text>
            <Text style={styles.textSubTitle}>Insira seus dados para acessar a conta.</Text>

            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={text => setEmail(text)}
                keyboardType='email-address'
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={senha}
                onChangeText={text => setSenha(text)}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleOwnerLogin}>
                <Text style={styles.buttonText}>Entrar como Dono</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;