import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRepository } from 'typeorm';
import { Dependent } from '../entities/Dependent';
import styles from '../stylesScreen/stylesAddchild';

const AddChild = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [registration, setRegistration] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleAddDependent = async () => {
        if (!name || !registration) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        try {
            const dependentRepository = getRepository(Dependent);
            const newDependent = dependentRepository.create({
                name,
                registration,
                amount: '0,00', // Default value for amount
                lanches: '0', // Default value for lanches
                valorGasto: '0,00', // Default value for valorGasto
                transactions: [], // Default value for transactions
            });
            await dependentRepository.save(newDependent);
            Alert.alert('Sucesso', 'Dependente adicionado com sucesso');
            navigation.goBack(); // Navigate back to the previous screen
        } catch (error) {
            console.error('Error adding dependent:', error);
            Alert.alert('Erro', 'Falha ao adicionar dependente');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>
                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Nome Completo: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Nome"
                        placeholderTextColor="#B0B0B0"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.textText}>Matrícula: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Matrícula"
                        placeholderTextColor="#B0B0B0"
                        value={registration}
                        onChangeText={setRegistration}
                    />

                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleAddDependent}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddChild;