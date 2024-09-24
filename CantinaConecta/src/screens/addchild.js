import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddchild';
import { API_URL } from '@env';


const AddChild = () => {
    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [matricula, setMatricula] = useState('');

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleAddChild = async () => {
        if (!name || !matricula) {
            alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/dependentes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    matricula,
                    lanche_avulso: isChecked,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sucesso', 'Dependente adicionado com sucesso!');
                navigation.goBack(); // Volta para a tela anterior
            } else {
                alert('Erro', data.message || 'Erro ao adicionar dependente.');
            }
        } catch (error) {
            alert('Erro', 'Erro ao adicionar dependente: ' + error.message);
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

                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleAddChild}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddChild;