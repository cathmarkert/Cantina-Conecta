import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddaviso';
import { api } from '../services/api';

const AddAviso = () => {
    const navigation = useNavigation();
    const [aviso, setAviso] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleSubmit = async () => {
        if (!aviso) {
            Alert.alert('Erro', 'Por favor, digite um aviso.');
            return;
        }

        setEnviando(true);
        try {
            await api.post('/add-aviso', { mensagem: aviso });
            Alert.alert('Sucesso', 'Aviso adicionado com sucesso!');
            setAviso('');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setEnviando(false);
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
                        multiline
                    />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={enviando}>
                        <Text style={styles.buttonText}>{enviando ? 'Enviando...' : 'Adicionar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddAviso;
