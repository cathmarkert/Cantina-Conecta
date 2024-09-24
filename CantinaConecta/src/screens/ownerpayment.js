import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import styles from '../stylesScreen/stylesOwnerpayment';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProductScreen = () => {
    const products = ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4'];
    const prices = [10.00, 15.50, 7.25, 20.00]; // Exemplo de preços
    const [quantities, setQuantities] = useState(['00', '00', '00', '00']);
    const [total, setTotal] = useState(0);

    const handleQuantityChange = (text, index) => {
        const newQuantities = [...quantities];
        const parsedValue = parseInt(text, 10);

        // Validação: permite apenas inteiros não-negativos
        newQuantities[index] = isNaN(parsedValue) || parsedValue < 0 ? '0' : parsedValue.toString();
        setQuantities(newQuantities);

        // Calcula o total
        const newTotal = newQuantities.reduce((sum, qty, idx) => sum + (parseInt(qty) * prices[idx]), 0);
        setTotal(newTotal);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Adicionar compra</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.listContainer}>
                    <View style={styles.column}>
                        <Text style={styles.columnHeader}>Produto</Text>
                        {products.map((product, index) => (
                            <TouchableOpacity key={index} style={styles.productButton}>
                                <Text style={styles.buttonText}>{product}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.column}>
                        <Text style={styles.columnHeader}>Quantidade</Text>
                        {quantities.map((quantity, index) => (
                            <View key={index} style={styles.inputContainer}>
                                <TextInput
                                    style={styles.quantityInput}
                                    value={quantity}
                                    onChangeText={(text) => handleQuantityChange(text, index)}
                                    keyboardType="numeric"
                                />
                            </View>
                        ))}
                    </View>
                </View>

                <TextInput
                    style={styles.totalInput}
                    value={`R$ ${total.toFixed(2).replace('.', ',')}`} // Formata o total para BRL
                    editable={false}
                />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.paymentButton}>
                        <View style={styles.iconContainer}>
                            <Image
                                source={require('../../assets/contactless.png')} // Ajuste o caminho conforme necessário
                                style={styles.icon} // Utilize o mesmo estilo para manter a consistência
                            />
                            <Text style={styles.paymentText}>Pagamento</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductScreen;
