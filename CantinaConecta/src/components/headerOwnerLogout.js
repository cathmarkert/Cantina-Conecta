import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesComponents/stylesHeaderSaldo';
import { api } from '../services/api';

const HeaderOwnerLogout = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            // Mesmo se a chamada falhar, encerrar a sessão local é o esperado.
            console.error('Erro ao fazer logout:', error.message);
        }

        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    };

    const confirmarLogout = () => {
        Alert.alert('Sair', 'Deseja encerrar a sessão?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', onPress: handleLogout },
        ]);
    };

    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}>
                <Text style={styles.title}>Cantina Conecta</Text>
                <TouchableOpacity onPress={confirmarLogout}>
                    <Text style={styles.perfil}>
                        <Icon name="sign-out-alt" size={30} color="#000" style={styles.icon} />
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HeaderOwnerLogout;
