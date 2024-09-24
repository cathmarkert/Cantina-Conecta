import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList, Modal } from 'react-native';
import styles from '../stylesScreen/stylesPedidopai';
import { Menu, Button } from 'react-native-paper';
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

    const [visibleChild, setVisibleChild] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [children] = useState([
        { id: 1, name: 'Ana' },
        { id: 2, name: 'João' },
        { id: 3, name: 'Maria' },
        { id: 4, name: 'Pedro' },
        { id: 5, name: 'Luísa' },
        { id: 6, name: 'Carlos' },
    ]);

    const [visibleTime, setVisibleTime] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [time] = useState([
        { id: 1, name: '9:00' },
        { id: 2, name: '10:30' },
        { id: 3, name: '11:00' },
        { id: 4, name: '12:00' },
        { id: 5, name: '13:00' },
        { id: 6, name: '14:00' },

    ]);

    const openChildMenu = () => setVisibleChild(true);
    const closeChildMenu = () => setVisibleChild(false);

    const openTimeMenu = () => setVisibleTime(true);
    const closeTimeMenu = () => setVisibleTime(false);

    const toggleChildSelection = (item) => {
        setSelectedChild(selectedChild && selectedChild.id === item.id ? null : item);
        closeChildMenu();
    };

    const toggleTimeSelection = (item) => {
        setSelectedTime(selectedTime && selectedTime.id === item.id ? null : item);
        closeTimeMenu();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Filho:</Text>
                <Menu
                    visible={visibleChild}
                    onDismiss={closeChildMenu}
                    anchor={
                        <Button mode="outlined" onPress={openChildMenu} style={styles.menuButton}>
                            <Text>{selectedChild ? selectedChild.name : 'Selecione o filho'}</Text>
                        </Button>
                    }
                    style={styles.menu}
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {children.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => toggleChildSelection(item)}>
                                <Text style={[styles.menuItem, selectedChild && selectedChild.id === item.id ? styles.menuItemSelected : null]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Horário:</Text>
                <Menu
                    visible={visibleTime}
                    onDismiss={closeTimeMenu}
                    anchor={
                        <Button mode="outlined" onPress={openTimeMenu} style={styles.menuButton}>
                            <Text>{selectedTime ? selectedTime.name : 'Selecione o horário'}</Text>
                        </Button>
                    }
                    style={styles.menu}
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {time.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => toggleTimeSelection(item)}>
                                <Text style={[styles.menuItem, selectedTime && selectedTime.id === item.id ? styles.menuItemSelected : null]}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
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