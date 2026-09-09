import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../stylesScreen/stylesRegistro';
import { api } from '../services/api';

const Register = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [enviando, setEnviando] = useState(false);

    const handleRegister = async () => {
        if (!nome || !email || !senha) {
            Alert.alert('Erro', 'Preencha nome, email e senha.');
            return;
        }

        if (senha !== confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem!');
            return;
        }

        setEnviando(true);
        try {
            await api.post('/register', {
                email,
                password: senha,
                name: nome,
                is_owner: isOwner,
            });
            Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setEnviando(false);
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
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder='Senha'
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={true}
            />

            <TextInput
                style={styles.input}
                placeholder='Confirmar Senha'
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsOwner(!isOwner)}>
                <View style={[styles.checkbox, { backgroundColor: isOwner ? '#050C9C' : '#fff', borderColor: isOwner ? '#050C9C' : '#ccc' }]}>
                    {isOwner && <Text style={styles.checkboxChecked}>X</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Registrar como Dono </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={enviando}>
                <Text style={styles.buttonText}>{enviando ? 'Registrando...' : 'Registrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.registerText}>Já tem uma conta? Faça login </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Register;
