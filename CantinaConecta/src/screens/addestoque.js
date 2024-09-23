import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesAddestoque';


const AddEstoque = () => {
    const navigation = useNavigation();
    const [isLactoseChecked, setIsLactoseChecked] = useState(false);
    const [isGlutenChecked, setIsGlutenChecked] = useState(false);

    const toggleLactoseCheckbox = () => setIsLactoseChecked(!isLactoseChecked);
    const toggleGlutenCheckbox = () => setIsGlutenChecked(!isGlutenChecked);

    return (
        <View style={styles.container}>
            <View style={styles.backgroundSection}>

                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Nome do Produto: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Nome"
                        placeholderTextColor="#B0B0B0"
                    />

                    <Text style={styles.textText}>Quantidade: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir Quantidade"
                        placeholderTextColor="#B0B0B0"
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
                        <Text style={styles.checkboxText}>Glúten </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default AddEstoque;