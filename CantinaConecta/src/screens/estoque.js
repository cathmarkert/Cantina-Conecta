import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../stylesScreen/stylesEstoque';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { API_URL } from '@env';

const Estoque = () => {
    const navigation = useNavigation();
    const [estoque, setEstoque] = useState([]);
    const [loading, setLoading] = useState(true);

    // Função para buscar dados do estoque
    const fetchEstoque = async () => {
        try {
            const response = await fetch(`${API_URL}/estoque`);
            const data = await response.json();
            setEstoque(data); // Armazena os dados do estoque
            setLoading(false); // Finaliza o loading
        } catch (error) {
            console.error('Erro ao buscar estoque:', error);
        }
    };

    // useFocusEffect para buscar dados sempre que a tela entrar em foco
    useFocusEffect(
        useCallback(() => {
            fetchEstoque();
        }, [])
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Carregando estoque...</Text>
            </View>
        );
    }

    // Função para renderizar cada item do estoque
    const renderItem = ({ item, index }) => (
        <View key={index} style={[styles.productRow, { marginBottom: index < estoque.length - 1 ? 8 : 0 }]}>
            <View style={styles.productLeft}>
                <View style={styles.circle}>
                    <Text style={styles.circleText}>{item.quantidade}</Text>
                </View>
                <Text style={styles.productName}>{item.nome}</Text>
            </View>

            <View style={styles.productIcons}>
                <View style={styles.iconColumn}>
                    {/* Exibe um ícone com base em contém lactose e contém glúten */}
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
                <Text style={styles.title}>Lista de Pedidos</Text>
            </View>

            {/* FlatList para renderizar os itens do estoque */}
            <FlatList
                data={estoque}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()} // Chave única baseada no índice
                contentContainerStyle={styles.stockContainer} // Estilo para o conteúdo da FlatList
            />

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEstoque')}>
                <Text style={styles.buttonText}>Alterar estoque</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Estoque;
