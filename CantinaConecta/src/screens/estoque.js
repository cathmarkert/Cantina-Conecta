import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../stylesScreen/stylesEstoque';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { api, formatarReal } from '../services/api';

const Estoque = () => {
    const navigation = useNavigation();
    const [estoque, setEstoque] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Recarrega ao focar para refletir cadastros e baixas feitas em outras telas.
    useFocusEffect(
        useCallback(() => {
            api.get('/estoque')
                .then(setEstoque)
                .catch((error) => console.error('Erro ao buscar estoque:', error.message))
                .finally(() => setCarregando(false));
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.productRow}>
            <View style={styles.productLeft}>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.quantidade}</Text>
                </View>
                <View>
                    <Text style={styles.productName}>{item.nome}</Text>
                    <Text style={styles.productName}>{formatarReal(item.preco)}</Text>
                </View>
            </View>

            <View style={styles.productIcons}>
                <View style={styles.iconColumn}>
                    {item.contem_lactose ? (
                        <Icon name="cheese" size={25} color={'#3572EF'} style={{ marginBottom: 5 }} />
                    ) : (
                        <Icon name="ban" size={25} color={'#FF0000'} style={{ marginBottom: 5 }} />
                    )}
                    {item.contem_gluten ? (
                        <Icon name="bread-slice" size={25} color={'#3572EF'} />
                    ) : (
                        <Icon name="ban" size={25} color={'#FF0000'} />
                    )}
                </View>
                <View style={styles.pictureIcon}>
                    <Icon name="box" size={40} color={'#0000FF'} />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Estoque</Text>
            </View>

            <FlatList
                data={estoque}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.stockContainer}
                ListEmptyComponent={
                    <Text style={styles.productName}>
                        {carregando ? 'Carregando estoque...' : 'Nenhum produto cadastrado.'}
                    </Text>
                }
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEstoque')}>
                <Text style={styles.buttonText}>Alterar estoque</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Estoque;
