import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesScreen/stylesChildchange';
import { api, formatarReal } from '../services/api';

const Limitchange = () => {
    const route = useRoute();
    const { dependent } = route.params || {};
    const navigation = useNavigation();
    const [newLimit, setNewLimit] = useState('');

    const updateLimit = async () => {
        const limite = parseFloat(String(newLimit).replace(',', '.'));

        if (isNaN(limite) || limite < 0) {
            Alert.alert('Erro', 'Informe um limite válido.');
            return;
        }

        try {
            await api.patch(`/dependentes/limite/${dependent.id}`, { limite });
            Alert.alert('Sucesso', 'Limite atualizado com sucesso');
            navigation.navigate('Parent');
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>
                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Limite Atual: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder={formatarReal(dependent.limite)}
                        placeholderTextColor="#B0B0B0"
                        editable={false}
                    />

                    <Text style={styles.textText}>Novo Limite: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir novo limite (0 = sem limite)"
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
