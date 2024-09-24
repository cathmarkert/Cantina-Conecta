import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../stylesScreen/stylesChildprofile';
import { API_URL } from '@env';

const Dependente = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dependent } = route.params || {};
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (dependent) {
            setIsChecked(dependent.lanche_avulso); // Ativa o checkbox se true
        }
    }, [dependent]); // Dependência para atualizar quando 'dependent' muda

    const updateLancheAvulso = async (newValue) => {
        try {
            const response = await fetch(`${API_URL}/dependentes/lanche/avulso/${dependent.id}`, {
                method: 'PATCH', // ou 'PUT', dependendo da sua API
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ lanche_avulso: newValue }),
            });

            if (!response.ok) {
                throw new Error('Failed to update');
            }

            // Se a atualização for bem-sucedida, atualize o estado local
            setIsChecked(newValue);
        } catch (error) {
            alert('Erro', 'Não foi possível atualizar o status do lanche avulso.');
            console.error(error);
        }
    };


    const toggleCheckbox = () => {
        const newValue = !isChecked;
        updateLancheAvulso(newValue);
    };

    if (!dependent) {
        return <Text>No data available</Text>;
    }

    return (
        <ScrollView style={styles.container}>

            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                <Text style={styles.profileName}>{dependent.nome}</Text>
            </View>


            <View style={styles.balanceSection}>
                <Text style={styles.balanceText}>R$ {dependent.limite}</Text>
                <TouchableOpacity style={styles.adjustLimitButton} onPress={() => navigation.navigate('LimitChange')}>
                    <Text style={styles.adjustLimitText}>Ajustar limite</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsSection}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.detailsText}>Matrícula: {dependent.matricula}</Text>
                    <Text style={styles.detailsText}>Cantina: Cantina Conecta</Text>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.detailsSection}>
                <View style={styles.statBox}>
                    {/* <Text style={styles.statNumber}>{dependent.lanches}</Text> */}
                    <Text style={styles.statNumber}>0</Text>
                    <Text style={styles.statLabel}>Nº de lanches 30 dias</Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{dependent.valor_gasto}</Text>
                    <Text style={styles.statLabel}>Valor gasto 30 dias</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.viewStatementButton}
                onPress={() => navigation.navigate('ExtratoChild', { transactions: dependent.transactions, name: dependent.name })}>
                <Text style={styles.viewStatementText}>Visualizar extrato</Text>
                <Icon name="arrow-right" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => { }}>
                <Text style={styles.addButtonText}>Remover Dependente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Dependente;