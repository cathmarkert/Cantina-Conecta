import React, { useCallback, useState } from 'react';
import { SectionList, View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesExtrato';
import { api } from '../services/api';

/** Agrupa os lançamentos por data, mantendo a ordem em que vieram da API. */
const agruparPorData = (lancamentos) => {
    const secoes = [];

    lancamentos.forEach((item) => {
        const secao = secoes.find((s) => s.date === item.date);
        if (secao) {
            secao.data.push(item);
        } else {
            secoes.push({ date: item.date, data: [item] });
        }
    });

    return secoes;
};

const Extrato = () => {
    const [lancamentos, setLancamentos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useFocusEffect(
        useCallback(() => {
            api.get('/extrato')
                .then(setLancamentos)
                .catch((error) => console.error('Erro ao buscar extrato:', error.message))
                .finally(() => setCarregando(false));
        }, [])
    );

    const renderSectionHeader = ({ section: { date } }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{date}</Text>
        </View>
    );

    const renderItem = ({ item, index }) => (
        <View style={[styles.item, { backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#CACACA' }]}>
            <Text style={item.sign === '+' ? styles.positive : styles.negative}>{item.sign}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.value}>{item.value}</Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Extrato</Text>
                </View>

                <View style={styles.contentContainer}>
                    <SectionList
                        sections={agruparPorData(lancamentos)}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        ListEmptyComponent={
                            <Text style={styles.type}>
                                {carregando ? 'Carregando...' : 'Nenhum lançamento ainda.'}
                            </Text>
                        }
                    />
                </View>
            </View>
        </View>
    );
};

export default Extrato;
