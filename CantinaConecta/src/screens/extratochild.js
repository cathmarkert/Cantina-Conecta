import React, { useCallback, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesExtratochild';
import { api, formatarReal } from '../services/api';

const ExtratoChild = () => {
    const route = useRoute();
    const { dependent } = route.params || {};
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useFocusEffect(
        useCallback(() => {
            api.get('/pedidos')
                .then((lista) => setPedidos(lista.filter((p) => p.dependente_id === dependent.id)))
                .catch((error) => console.error(error.message))
                .finally(() => setCarregando(false));
        }, [dependent])
    );

    const renderItem = ({ item }) => (
        <View style={styles.infoContainer}>
            <View>
                <Text style={styles.label}>{item.data} às {item.horario}</Text>
                {item.itens.map((lanche, idx) => (
                    <Text key={idx} style={styles.value}>{lanche}</Text>
                ))}
            </View>
            <Text style={styles.value}>{formatarReal(item.total)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Lanches de {dependent?.nome}</Text>
                </View>

                <FlatList
                    data={pedidos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={
                        <Text style={styles.value}>
                            {carregando ? 'Carregando...' : 'Nenhum lanche registrado ainda.'}
                        </Text>
                    }
                />
            </View>
        </View>
    );
};

export default ExtratoChild;
