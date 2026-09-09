import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesChildprofile';
import { api, formatarReal } from '../services/api';

const Dependente = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { dependent } = route.params || {};

    const [dados, setDados] = useState(dependent);
    const [pedidos, setPedidos] = useState([]);

    // Recarrega ao focar: o limite pode ter sido alterado na tela de ajuste.
    useFocusEffect(
        useCallback(() => {
            if (!dependent) return;

            api.get('/profile')
                .then((perfil) => {
                    const atualizado = perfil.dependentes.find((d) => d.id === dependent.id);
                    if (atualizado) setDados(atualizado);
                })
                .catch((error) => console.error(error.message));

            api.get('/pedidos')
                .then((lista) => setPedidos(lista.filter((p) => p.dependente_id === dependent.id)))
                .catch((error) => console.error(error.message));
        }, [dependent])
    );

    const updateLancheAvulso = async (novoValor) => {
        try {
            const resposta = await api.patch(
                `/dependentes/lanche/avulso/${dados.id}`,
                { lanche_avulso: novoValor }
            );
            setDados(resposta.dependente);
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const removerDependente = async () => {
        try {
            await api.del(`/remove-dependentes/${dados.id}`);
            Alert.alert('Sucesso', 'Dependente removido com sucesso!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', error.message);
        }
    };

    const confirmRemoval = () => {
        Alert.alert(
            'Confirmar Remoção',
            'Tem certeza que deseja remover este dependente?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Remover', onPress: removerDependente },
            ],
            { cancelable: false }
        );
    };

    if (!dados) {
        return <Text>Nenhum dependente selecionado.</Text>;
    }

    const totalLanches = pedidos.reduce((soma, pedido) => soma + pedido.itens.length, 0);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileContainer}>
                <Icon name="user-circle" size={100} color="#8285CD" style={styles.profileImage} />
                <Text style={styles.profileName}>{dados.nome}</Text>
            </View>

            <View style={styles.balanceSection}>
                <Text style={styles.balanceText}>
                    {Number(dados.limite) > 0 ? formatarReal(dados.limite) : 'Sem limite'}
                </Text>
                <TouchableOpacity
                    style={styles.adjustLimitButton}
                    onPress={() => navigation.navigate('LimitChange', { dependent: dados })}
                >
                    <Text style={styles.adjustLimitText}>Ajustar limite</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsSection}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.detailsText}>Matrícula: {dados.matricula}</Text>
                    <Text style={styles.detailsText}>Cantina: Cantina Conecta</Text>
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={() => updateLancheAvulso(!dados.lanche_avulso)}
                    >
                        <View style={styles.checkbox}>
                            {dados.lanche_avulso && <View style={styles.checked} />}
                        </View>
                        <Text style={styles.checkboxText}>Lanche avulso </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.detailsSection}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{totalLanches}</Text>
                    <Text style={styles.statLabel}>Nº de lanches</Text>
                </View>

                <View style={styles.verticalLine} />

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>{formatarReal(dados.valor_gasto)}</Text>
                    <Text style={styles.statLabel}>Valor gasto</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.adjustLimitButton}
                onPress={() => navigation.navigate('ExtratoChild', { dependent: dados })}
            >
                <Text style={styles.adjustLimitText}>Ver lanches do dependente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={confirmRemoval}>
                <Text style={styles.addButtonText}>Remover Dependente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Dependente;
