import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRepository } from 'typeorm';
import { Dependent } from '../entities/Dependent';
import styles from '../stylesScreen/stylesChildchange';

const Limitchange = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dependent } = route.params || {};
    const [newLimit, setNewLimit] = useState('');

    useEffect(() => {
        if (dependent) {
            setNewLimit(dependent.amount);
        }
    }, [dependent]);

    const handleUpdateLimit = async () => {
        if (!dependent) return;

        try {
            const dependentRepository = getRepository(Dependent);
            dependent.amount = newLimit;
            await dependentRepository.save(dependent);
            Alert.alert('Success', 'Limit updated successfully');
            navigation.goBack(); // Go back to the previous screen
        } catch (error) {
            console.error('Error updating limit:', error);
            Alert.alert('Error', 'Failed to update limit');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>
                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Crédito Atual: </Text>
                    <TextInput
                        style={styles.input}
                        value={dependent ? dependent.amount : '0,00'}
                        placeholder="0,00"
                        placeholderTextColor="#B0B0B0"
                        editable={false}
                    />

                    <Text style={styles.textText}>Novo Limite: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir novo Limite"
                        placeholderTextColor="#B0B0B0"
                        value={newLimit}
                        onChangeText={setNewLimit}
                        keyboardType="numeric" // Ensures only numeric input
                    />
                    <TouchableOpacity style={styles.button} onPress={handleUpdateLimit}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Limitchange;