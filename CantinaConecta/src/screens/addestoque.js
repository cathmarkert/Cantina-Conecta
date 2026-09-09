import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddestoque';
import { api } from '../services/api';

const AddEstoque = () => {
    const navigation = useNavigation();
    const [isLactoseChecked, setIsLactoseChecked] = useState(false);
    const [isGlutenChecked, setIsGlutenChecked] = useState(false);
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');

    const toggleLactoseCheckbox = () => setIsLactoseChecked(!isLactoseChecked);
    const toggleGlutenCheckbox = () => setIsGlutenChecked(!isGlutenChecked);

    const handleInputChange = (value) => {
        // Permitir vírgula como separador decimal e remover caracteres não numéricos (exceto ponto e vírgula)
        const sanitizedValue = value.replace(/[^0-9.,]/g, '');
        setPreco(sanitizedValue);
    };

    const handleSubmit = async () => {
        if (!nome || !quantidade || !preco) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
            return;
        }

        const numericPreco = parseFloat(preco.replace(',', '.'));
        const numericQuantidade = parseInt(quantidade, 10);

        if (isNaN(numericPreco) || isNaN(numericQuantidade)) {
            Alert.alert('Erro', 'Quantidade e preço precisam ser números.');
            return;
        }

        try {
            await api.post('/add-estoque', {
                nome,
                quantidade: numericQuantidade,
                preco: numericPreco,
                contem_lactose: isLactoseChecked,
                contem_gluten: isGlutenChecked,
            });

            Alert.alert('Sucesso', 'Produto adicionado ao estoque com sucesso!');
            setNome('');
            setQuantidade('');
            setPreco('');
            setIsLactoseChecked(false);
            setIsGlutenChecked(false);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    return (

        <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.container}>
                <View style={styles.backgroundSection}>
                    <View style={styles.creditContainer}>
                        <Text style={styles.textText}>Nome do Produto: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Inserir Nome"
                            placeholderTextColor="#B0B0B0"
                            value={nome}
                            onChangeText={setNome}
                        />

                        <Text style={styles.textText}>Quantidade: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Inserir Quantidade"
                            placeholderTextColor="#B0B0B0"
                            value={quantidade}
                            onChangeText={setQuantidade}
                            keyboardType="numeric"
                        />

                        <Text style={styles.textText}>Preço do produto: </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Insira o valor desejado"
                            placeholderTextColor="#B0B0B0"
                            value={preco.toString()}
                            onChangeText={handleInputChange}
                            keyboardType="numeric"
                        />

                        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleLactoseCheckbox}>
                            <View style={styles.checkbox}>
                                {isLactoseChecked && <View style={styles.checked} />}
                            </View>
                            <Text style={styles.checkboxText}>Lactose</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.checkboxContainer} onPress={toggleGlutenCheckbox}>
                            <View style={styles.checkbox}>
                                {isGlutenChecked && <View style={styles.checked} />}
                            </View>
                            <Text style={styles.checkboxText}>Glúten</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </ScrollView >
    );
};

export default AddEstoque;
