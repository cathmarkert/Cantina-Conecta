import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../stylesScreen/stylesRegistro';
import { API_URL } from '@env';

const Register = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    const handleRegister = async () => {
        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: senha,
                    name: nome,
                    isOwner
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                navigation.navigate('Login');
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Erro ao registrar: ' + error.message);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}> Crie sua conta </Text>
            <Text style={styles.textSubTitle}> Preencha os dados abaixo para se registrar. </Text>

            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={text => setNome(text)}
            />

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

            <TextInput
                style={styles.input}
                placeholder='Confirmar Senha'
                value={confirmarSenha}
                onChangeText={text => setConfirmarSenha(text)}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsOwner(!isOwner)}>
                <View style={[styles.checkbox, { backgroundColor: isOwner ? '#050C9C' : '#fff', borderColor: isOwner ? '#050C9C' : '#ccc' }]}>
                    {isOwner && <Text style={styles.checkboxChecked}>✔</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Registrar como Dono </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Registrar </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerText}>Já tem uma conta? Faça login </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Register;
