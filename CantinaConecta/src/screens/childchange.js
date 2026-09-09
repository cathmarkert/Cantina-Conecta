import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesScreen/stylesChildchange';
import { API_URL } from '@env';

const Limitchange = () => {
    const route = useRoute();
    const { dependent } = route.params || {};
    const navigation = useNavigation();
    const [newLimit, setNewLimit] = useState('');

    // Função para atualizar o limite no backend
    const updateLimit = async () => {
        try {
            const response = await fetch(`${API_URL}/dependentes/limite/${dependent.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ limite: newLimit }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar o limite');
            }

            Alert.alert('Sucesso', 'Limite atualizado com sucesso');
            navigation.navigate('Parent');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o limite');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>
                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Crédito Atual: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={dependent.limite.toString()}
                        placeholderTextColor="#B0B0B0"
                        editable={false} // Torna o campo não editável
                    />

                    <Text style={styles.textText}>Novo Limite: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir novo Limite"
                        placeholderTextColor="#B0B0B0"
                        keyboardType="numeric"
                        value={newLimit}
                        onChangeText={setNewLimit}
                    />
                    <TouchableOpacity style={styles.button} onPress={updateLimit}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Limitchange;
