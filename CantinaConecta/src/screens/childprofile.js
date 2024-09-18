import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getRepository } from 'typeorm';
import { Dependent } from '../entities/Dependent';
import styles from '../stylesScreen/stylesChildprofile';

const Dependente = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dependent } = route.params || {};
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const handleDelete = async () => {
        if (!dependent) return;

        Alert.alert(
            'Confirmar Exclusão',
            'Você tem certeza que deseja remover este dependente?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: async () => {
                        try {
                            const dependentRepository = getRepository(Dependent);
                            await dependentRepository.remove(dependent);
                            Alert.alert('Sucesso', 'Dependente removido com sucesso');
                            navigation.goBack(); // Navigate back to the previous screen
                        } catch (error) {
                            console.error('Error deleting dependent:', error);
                            Alert.alert('Erro', 'Falha ao remover dependente');
                        }
                    }
                }
            ]
        );
    };

    if (!dependent) {
        return <Text>No data available</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                <Text style={styles.profileName}>{dependent.name}</Text>
            </View>

            <View style={styles.balanceSection}>
                <Text style={styles.balanceText}>R$ {parseFloat(dependent.amount).toFixed(2)}</Text>
                <TouchableOpacity style={styles.adjustLimitButton} onPress={() => navigation.navigate('LimitChange', { dependent })}>
                    <Text style={styles.adjustLimitText}>Ajustar limite</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsSection}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.detailsText}>Matrícula: {dependent.registration || 'Not available'}</Text>
                    <Text style={styles.detailsText}>Cantina: {dependent.cantina || 'Not available'}</Text>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
                        <View style={styles.checkbox}>
                            {isChecked && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.detailsSection}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{dependent.lanches}</Text>
                    <Text style={styles.statLabel}>Nº de lanches 30 dias</Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{dependent.valorGasto}</Text>
                    <Text style={styles.statLabel}>Valor gasto 30 dias</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.viewStatementButton}
                onPress={() => navigation.navigate('ExtratoChild', { transactions: dependent.transactions || [] })}>
                <Text style={styles.viewStatementText}>Visualizar extrato</Text>
                <Icon name="arrow-right" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={handleDelete}>
                <Text style={styles.addButtonText}>Remover Dependente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Dependente;