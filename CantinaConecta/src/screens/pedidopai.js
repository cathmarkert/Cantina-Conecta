import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList, Modal } from 'react-native';
import styles from '../stylesScreen/stylesPedidopai';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const Pedido = () => {
    const [comidas] = useState(['Tapioca', 'Sanduíche', 'Salgado']);
    const [bebidas] = useState(['Água', 'Achocolatado', 'Suco Natural']);

    const renderItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Text style={styles.carouselText}>{item}</Text>
        </View>
    );
    const [selectedTime, setSelectedTime] = useState([]);

    const time = [
        {id: 1, name: '9:00'},
        {id: 2, name: '10:30'},
        {id: 3, name: '11:00'},
    ];

    const selectTime = (item) => {
        if (selectedTime === item.id) {
            setSelectedTime(null);
        } else {
            setSelectedTime(item.id);
        }
    };

    const [selectedChild, setSelectedChild] = useState(null);

    const children = [
        { id: 1, name: 'Ana' },
        { id: 2, name: 'João' },
        { id: 3, name: 'Maria' }
    ]; 

    const selectChild = (item) => {
        if (selectedChild === item.id) {
            setSelectedChild(null); 
        } else {
            setSelectedChild(item.id); 
        }
    };


    return (
        <ScrollView style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Filho:</Text>
                <View style={styles.checkboxRow}>
                    {children.map((item) => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.checkboxContainer}
                            onPress={() => selectChild(item)}
                        >
                            <View
                                style={[
                                    styles.checkbox,
                                    selectedChild === item.id && styles.checkboxSelected
                                ]}
                            >
                                {selectedChild === item.id && (
                                    <Icon name="check" size={14} color="#fff" />
                                )}
                            </View>
                            <Text style={styles.checkboxLabel}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
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

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </ScrollView>

    );



}

export default Pedido;