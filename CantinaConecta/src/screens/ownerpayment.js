import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import styles from '../stylesScreen/stylesOwnerpayment';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ProductScreen = () => {
    const products = ['XX', 'XX', 'XX', 'XX'];
    const [quantities, setQuantities] = useState(['00', '00', '00', '00']);

    const handleQuantityChange = (text, index) => {
        const newQuantities = [...quantities];
        newQuantities[index] = text;
        setQuantities(newQuantities);
    };

    return (
        <View style={styles.container}>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Adicionar compra</Text>
            </View>


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
                        <TextInput
                            key={index}
                            style={styles.quantityInput}
                            value={quantity}
                            onChangeText={(text) => handleQuantityChange(text, index)}
                            keyboardType="numeric"
                        />
                    ))}
                </View>
            </View>

            <TextInput
                style={styles.totalInput}
                value="R$ 34,40"
                editable={false}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.paymentButton}>
                    <View style={styles.iconContainer}>
                        <Icon name="money-bill" size={70} style={styles.icon} />
                        <Text style={styles.paymentText}>Pagamento</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductScreen;
