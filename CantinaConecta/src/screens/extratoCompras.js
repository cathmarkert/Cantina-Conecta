import React, { useCallback, useState } from 'react';
import { SectionList, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesScreen/stylesExtratoCompras';
import { api } from '../services/api';

const agruparPorData = (compras) => {
    const secoes = [];

    compras.forEach((item) => {
        const secao = secoes.find((s) => s.date === item.date);
        if (secao) {
            secao.data.push(item);
        } else {
            secoes.push({ date: item.date, data: [item] });
        }
    });

    return secoes;
};

const ExtratoCompra = () => {
    const navigation = useNavigation();
    const [compras, setCompras] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useFocusEffect(
        useCallback(() => {
            api.get('/extrato-compras')
                .then(setCompras)
                .catch((error) => console.error('Erro ao buscar compras:', error.message))
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
            <Text style={styles.responsibleName}>{item.responsibleName}</Text>
            <Text style={styles.studentName}>{item.studentName}</Text>
            <Text style={styles.value}>{item.value}</Text>
        </View>
    );

    return (
        <View style={styles.screen}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Extrato de Compras</Text>
                </View>

                <View style={styles.headerRow}>
                    <Text style={styles.headerText}>Responsável</Text>
                    <Text style={styles.headerText}>Aluno</Text>
                    <Text style={styles.headerText}>Valor</Text>
                </View>

                <View style={styles.sectionContainer}>
                    <SectionList
                        sections={agruparPorData(compras)}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        ListEmptyComponent={
                            <Text style={styles.headerText}>
                                {carregando ? 'Carregando...' : 'Nenhuma compra registrada.'}
                            </Text>
                        }
                    />
                </View>

                <View style={styles.footerSpacer} />
            </View>

            <View style={styles.ContainerButton}>
                <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('AddCompra')}>
                    <Icon name="pencil" color="#fff" size={20} />
                    <Text style={styles.selectButtonText}>Adicionar Compra</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ExtratoCompra;
