import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../stylesScreen/stylesAddaviso';
import { API_URL } from '@env'; // Certifique-se de ter a URL da API configurada no seu ambiente

const AddAviso = () => {
    const [aviso, setAviso] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleSubmit = async () => {
        if (!aviso) {
            Alert.alert('Erro', 'Por favor, digite um aviso.');
            return;
        }

        const avisoData = {
            mensagem: aviso,
            notificar_responsaveis: isChecked,
        };

        try {
            const response = await fetch(`${API_URL}/add-aviso`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(avisoData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Aviso adicionado com sucesso!');
                setAviso(''); // Limpa o campo de aviso
                setIsChecked(false); // Reseta o checkbox
            } else {
                Alert.alert('Erro', data.message || 'Erro ao adicionar aviso.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro na conexão.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>
                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Adicionar aviso: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o aviso"
                        placeholderTextColor="#B0B0B0"
                        value={aviso}
                        onChangeText={setAviso}
                        editable={true}
                    />

                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}> Notificar responsáveis </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddAviso;
