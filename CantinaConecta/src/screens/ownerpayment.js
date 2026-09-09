import React, { useState, useEffect, memo } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Alert } from 'react-native';
import styles from '../stylesScreen/stylesOwnerpayment';
import { API_URL } from '@env';

const ProductScreen = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [total, setTotal] = useState(0);
    const [editingIndex, setEditingIndex] = useState(null); // Estado para controle do item sendo editado
    const [inputQuantity, setInputQuantity] = useState('0'); // Estado para quantidade do input

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/estoque`);
                const data = await response.json();

                // Converte preços para número
                const formattedData = data.map(product => ({
                    ...product,
                    preco: parseFloat(product.preco),
                }));

                if (response.ok) {
                    setProducts(formattedData);
                    setQuantities(Array(formattedData.length).fill('0'));
                } else {
                    alert('Erro', 'Não foi possível carregar os produtos.');
                }
            } catch (error) {
                alert('Erro', 'Ocorreu um erro na conexão.');
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleQuantityChange = (text) => {
        const parsedValue = parseInt(text, 10);
        const quantity = isNaN(parsedValue) || parsedValue < 0 ? '0' : parsedValue.toString();
        setInputQuantity(quantity);
    };

    const handleItemPress = (index) => {
        setEditingIndex(index); // Define o índice do item que está sendo editado
        setInputQuantity(quantities[index]); // Define a quantidade atual
    };

    const handleSaveQuantity = () => {
        if (editingIndex !== null) {
            const newQuantities = [...quantities];
            newQuantities[editingIndex] = inputQuantity;
            setQuantities(newQuantities);
            setTotal(newQuantities.reduce((sum, qty, idx) => sum + (parseInt(qty) * products[idx].preco), 0));
            setEditingIndex(null); // Reseta o índice de edição
            setInputQuantity('0'); // Reseta o valor do input
        }
    };

    const handlePayment = async () => {
        try {
            // Adiciona crédito
            const addCreditResponse = await fetch(`${API_URL}/add-credit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credito: total }),
            });

            if (!addCreditResponse.ok) {
                throw new Error('Erro ao adicionar crédito');
            }

            // Remove produtos do estoque
            const productsToRemove = products
                .map((product, index) => ({ id: product.id, quantity: quantities[index] }))
                .filter(item => parseInt(item.quantity) > 0); // Filtra apenas os que têm quantidade maior que 0

            const removeStockResponse = await fetch(`${API_URL}/remove-stock`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ products: productsToRemove }),
            });

            // Verifica se a resposta não está OK e tenta capturar a mensagem de erro
            if (!removeStockResponse.ok) {
                const errorData = await removeStockResponse.json(); // Captura os dados de erro
                throw new Error(errorData.message || 'Erro ao retirar produtos do estoque');
            }

            alert('Sucesso', 'Pagamento realizado e produtos retirados do estoque com sucesso!');
        } catch (error) {
            alert('Erro', error.message);
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => handleItemPress(index)} style={styles.listItem}>
            <Text style={styles.productName}>{item.nome}</Text>
            <Text style={styles.productPrice}>
                R$ {item.preco ? item.preco.toFixed(2).replace('.', ',') : '0,00'}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Adicionar compra</Text>
            </View>

            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.flatListContent}
            />

            {editingIndex !== null && ( // Renderiza o TextInput apenas se um item estiver sendo editado
                <View style={styles.quantityInputContainer}>
                    <TextInput
                        style={styles.quantityInput}
                        value={inputQuantity}
                        onChangeText={handleQuantityChange}
                        keyboardType="numeric"
                        placeholder="Quantidade"
                    />
                    <TouchableOpacity onPress={handleSaveQuantity} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TextInput
                style={styles.totalInput}
                value={`R$ ${total.toFixed(2).replace('.', ',')}`} // Formata o total para BRL
                editable={false}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../assets/contactless.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.paymentText}>Pagamento</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductScreen;
