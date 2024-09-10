import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Dimensions, ScrollView, FlatList, Modal } from 'react-native';
import styles from '../stylesScreen/stylesPedidopai';
import { useState } from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const Pedido = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [comidas] = useState(['Item 1', 'Item 2', 'Item 3']);
    const [bebidas] = useState(['Item 1', 'Item 2', 'Item 3']);
    const children = ['Child 1', 'Child 2', 'Child 3']; // List of children to select

    const renderItem = ({ item }) => (
        <View style={styles.carouselItem}>
            <Text style={styles.carouselText}>{item}</Text>
        </View>
    );

    const openChildModal = () => {
        setModalVisible(true);
    };

    const selectChild = (child) => {
        setSelectedChild(child);
        setModalVisible(false);
    };

    return (
        <ScrollView style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Filho:</Text>
                <TouchableOpacity onPress={openChildModal}>
                    <TextInput
                        style={[styles.input, { width: width * 0.9 }]}
                        placeholder="Selecionar Filho"
                        value={selectedChild}
                        editable={false} // Disable manual input, it's only selectable via modal
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Horário de Entrega:</Text>
                <TouchableOpacity onPress={openChildModal}>
                    <TextInput
                        style={[styles.input, { width: width * 0.9 }]}
                        placeholder="Selecionar Horário de Entrega"
                        value={selectedChild}
                        editable={false} // Disable manual input, it's only selectable via modal
                    />
                </TouchableOpacity>
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


            {/* Confirm Button */}
            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </ScrollView>

    );



}

export default Pedido;