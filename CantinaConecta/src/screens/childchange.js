import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesScreen/stylesChildchange';


const Limitchange = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>

            <View style={styles.backgroundSection}>

                <View style={styles.creditContainer}>
                    <Text style={styles.textText}>Crédito Atual: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0,00"
                        placeholderTextColor="#B0B0B0"
                        editable={false}
                    />

                    <Text style={styles.textText}>Novo Limite: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Inserir novo Limite"
                        placeholderTextColor="#B0B0B0"
                    />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Limitchange;