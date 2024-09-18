import React, { useState, useEffect } from "react";
import { SectionList, View, Text, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesScreen/stylesLanchesProgramados';
import { fetchOrdersForDependent } from '../utils/api'; // Import the fetch function

const LanchesProgramados = ({ route }) => {
    const { dependentId } = route.params || {}; // Get the dependent ID from route params

    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        if (dependentId) {
            const loadOrders = async () => {
                try {
                    const data = await fetchOrdersForDependent(dependentId);
                    // Assume that data is an array of orders
                    setOrdersData(data);
                } catch (error) {
                    Alert.alert('Erro', 'Falha ao carregar os pedidos.');
                }
            };

            loadOrders();
        }
    }, [dependentId]);

    // Function to convert date and time into a Date object
    const parseDate = (date, time) => {
        const [day, month, year] = date.split('/');
        const [hours, minutes] = time.split(':');
        return new Date(year, month - 1, day, hours, minutes);
    };

    // Sort and format the data
    const sortedData = ordersData
        .map(item => ({
            ...item,
            fullDate: parseDate(item.data, item.horario),
        }))
        .sort((a, b) => a.fullDate - b.fullDate);

    const formattedData = sortedData.reduce((acc, item) => {
        const sectionTitle = item.data;
        if (!acc[sectionTitle]) {
            acc[sectionTitle] = {
                title: "Lanches Programados",
                data: [],
            };
        }
        acc[sectionTitle].data.push(item);
        return acc;
    }, {});

    const sections = Object.values(formattedData);

    return (
        <View style={styles.screen}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lanches Programados</Text>
            </View>

            <SectionList
                style={styles.list}
                sections={sections}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.childrenContainer}>
                        <View style={styles.perfil}>
                            <Icon name="user-circle" size={70} color="#000" style={styles.icon} />
                            <View style={styles.infoLanche}>
                                <Text style={styles.name}>{item.nome}</Text>
                                <View style={styles.tipoLancheContainer}>
                                    <Text style={styles.tipoLanche}>{item.tipoLanche}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.date}>Entrega: {item.horario} - {item.data}</Text>
                        {item.itens.length > 0 && item.itens.map((lanche, idx) => (
                            <Text key={idx} style={styles.lanche}>{lanche}</Text>
                        ))}
                    </View>
                )}
            />
        </View>
    );
};

export default LanchesProgramados;
