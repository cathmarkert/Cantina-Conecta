import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native';
import styles from '../stylesScreen/stylesPedidopai';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { fetchDependents } from '../utils/api'; // Import the fetch function

const Pedido = () => {
    const [comidas] = useState(['Tapioca', 'Sanduíche', 'Salgado']);
    const [bebidas] = useState(['Água', 'Achocolatado', 'Suco Natural']);

    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDependent, setSelectedDependent] = useState(null);
    const [orders, setOrders] = useState({});
    const [dependents, setDependents] = useState([]);

    // Fetch dependents when the component mounts
    useEffect(() => {
        const loadDependents = async () => {
            try {
                const data = await fetchDependents();
                setDependents(data);
            } catch (error) {
                Alert.alert('Erro', 'Falha ao carregar dependentes.');
            }
        };

        loadDependents();
    }, []);

    const selectDependent = (item) => {
        setSelectedDependent(item.id);
        if (!orders[item.id]) {
            setOrders(prevOrders => ({
                ...prevOrders,
                [item.id]: { comidas: [], bebidas: [], time: null }
            }));
        }
    };

    const selectTime = (item) => {
        setSelectedTime(item.id);
        if (selectedDependent) {
            setOrders(prevOrders => ({
                ...prevOrders,
                [selectedDependent]: {
                    ...prevOrders[selectedDependent],
                    time: item.name
                }
            }));
        }
    };

    const confirmOrder = async () => {
        if (!selectedDependent || !selectedTime) {
            Alert.alert('Erro', 'Selecione um dependente e um horário.');
            return;
        }

        const orderData = orders[selectedDependent];
        if (!orderData) {
            Alert.alert('Erro', 'Nenhuma ordem encontrada para o dependente selecionado.');
            return;
        }

        try {
            // Assume Order entity and API endpoint
            const response = await fetch('https://your-api-endpoint/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dependentId: selectedDependent,
                    comidas: orderData.comidas,
                    bebidas: orderData.bebidas,
                    time: orderData.time
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            Alert.alert('Sucesso', 'Pedido confirmado com sucesso.');
            setOrders(prevOrders => ({
                ...prevOrders,
                [selectedDependent]: { comidas: [], bebidas: [], time: null }
            }));
            setSelectedDependent(null);
            setSelectedTime(null);
        } catch (error) {
            console.error('Error confirming order:', error);
            Alert.alert('Erro', 'Falha ao confirmar o pedido.');
        }
    };

    const renderDependentItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.checkboxContainer, selectedDependent === item.id && styles.checkboxSelected]}
            onPress={() => selectDependent(item)}
        >
            <View
                style={[
                    styles.checkbox,
                    selectedDependent === item.id && styles.checkboxSelected
                ]}
            >
                {selectedDependent === item.id && (
                    <Icon name="check" size={14} color="#fff" />
                )}
            </View>
            <Text style={styles.checkboxLabel}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Text style={styles.carouselText}>{item}</Text>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Dependente:</Text>
                <FlatList
                    data={dependents}
                    renderItem={renderDependentItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Horário:</Text>
                <View style={styles.checkboxRow}>
                    {time.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.checkboxContainer}
                            onPress={() => selectTime(item)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    selectedTime === item.id && styles.checkboxSelected
                                ]}
                            >
                                {selectedTime === item.id && (
                                    <Icon name="check" size={14} color="#fff" />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.containerbox}>
                <Text style={styles.sectionTitle}>Comidas</Text>
                <FlatList
                    data={comidas}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <View style={styles.containerbox}>
                <Text style={styles.sectionTitle}>Bebidas</Text>
                <FlatList
                    data={bebidas}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={confirmOrder}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Pedido;