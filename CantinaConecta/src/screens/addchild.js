import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddchild';
import { api } from '../services/api';

const AddChild = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [matricula, setMatricula] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleAddChild = async () => {
        if (!name || !matricula) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setEnviando(true);
        try {
            await api.post('/dependentes', {
                name,
                matricula,
                lanche_avulso: isChecked,
            });
            Alert.alert('Sucesso', 'Dependente adicionado com sucesso!');
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
                        value={matricula}
                        onChangeText={setMatricula}
                    />

                    <TouchableOpacity style={styles.checkboxContainer} onPress={() => setIsChecked(!isChecked)}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleAddChild} disabled={enviando}>
                        <Text style={styles.buttonText}>{enviando ? 'Adicionando...' : 'Adicionar'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddChild;
