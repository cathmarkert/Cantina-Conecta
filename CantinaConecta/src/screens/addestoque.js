import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddestoque';
import { API_URL } from '@env';

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

        const numericPreco = parseFloat(preco.replace(',', '.')).toFixed(2);

        const estoqueData = {
            nome,
            quantidade: parseInt(quantidade, 10),
            preco: numericPreco,
            contem_lactose: isLactoseChecked,
            contem_gluten: isGlutenChecked,
        };

        try {
            const response = await fetch(`${API_URL}/add-estoque`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(estoqueData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Sucesso', 'Produto adicionado ao estoque com sucesso!');
                // Limpa os campos após o sucesso
                setNome('');
                setQuantidade('');
                setPreco('');
                setIsLactoseChecked(false);
                setIsGlutenChecked(false);
                // Navega para a tela anterior ou outra tela
                navigation.goBack();
            } else {
                Alert.alert('Erro', data.message || 'Erro ao adicionar produto no estoque.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro na conexão.');
            console.error(error);
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
