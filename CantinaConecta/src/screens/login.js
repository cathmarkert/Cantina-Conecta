import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../stylesScreen/stylesLogin';
import { api } from '../services/api';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert('Erro', 'Preencha email e senha.');
            return;
        }

        setEnviando(true);
        try {
            const data = await api.post('/login', { email, password: senha });
            // O destino depende do perfil: dono da cantina ou responsável.
            navigation.reset({
                index: 0,
                routes: [{ name: data.is_owner ? 'HomeOwnerTabs' : 'HomeTabs' }],
            });
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textTitle}> Bem-Vindo ao Cantina Conecta! </Text>
            <Text style={styles.textSubTitle}> Insira seus dados para acessar a conta. </Text>

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

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={enviando}>
                <Text style={styles.buttonText}>{enviando ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Não tem uma conta? Registre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
