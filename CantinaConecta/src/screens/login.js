import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../stylesScreen/stylesLogin';
import { API_URL } from '@env';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    // const [isOwner, setIsOwner] = useState(false); // Estado para o checkbox

    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: senha,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
                if (data.is_owner) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "HomeOwnerTabs" }]
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "HomeTabs" }]
                    });
                }
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert('Erro ao fazer login: ' + error.message);
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

            {/* <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsOwner(!isOwner)}>
                <View style={[styles.checkbox, { backgroundColor: isOwner ? '#050C9C' : '#fff', borderColor: isOwner ? '#050C9C' : '#ccc' }]}>
                    {isOwner && <Text style={styles.checkboxChecked}>X</Text>}
                </View>

                <Text style={styles.checkboxLabel}>Entrar como Dono</Text>

            </TouchableOpacity> */}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Não tem uma conta? Registre-se</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Login;
