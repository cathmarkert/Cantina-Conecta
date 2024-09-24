import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesComponents/stylesHeaderSaldo';
import { API_URL } from '@env';

const HeaderOwnerLogout = () => {
    const navigation = useNavigation();
    const [credit, setCredit] = useState(0.00);

    const fetchProfile = async () => {
        try {
            const response = await fetch(`${API_URL}/profile`);
            if (!response.ok) {
                throw new Error('Erro ao buscar perfil: ' + response.statusText);
            }
            const data = await response.json();
            setCredit(data.credito);  // Atualiza o estado do crédito
        } catch (error) {
            console.error('Erro ao buscar perfil:', error);
        }
    };

    // useFocusEffect é executado toda vez que a tela entra em foco
    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [])
    );

    const handleLogout = async () => {

        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (response.ok) {
                // Mostra uma mensagem de sucesso
                alert(data.message);

                // Redireciona para a tela de login após o logout
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                });
            } else {
                // Mostra a mensagem de erro
                alert(data.message);
            }
        } catch (error) {
            alert('Erro ao fazer logout: ' + error.message);
        }
    };

    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}>

                <Text style={styles.title}>Cantina Conecta</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.perfil}>
                        <Icon name="sign-out-alt" size={30} color="#000" style={styles.icon} />
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerSaldo}>
                <View style={styles.amountContainer}>
                    <View style={styles.creditBox}>
                        <Text style={styles.amountText}>R$ {credit} </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HeaderOwnerLogout;