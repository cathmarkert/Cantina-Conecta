import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal, TextInput } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import styles from '../stylesScreen/stylesPedidopai';
import { API_URL } from '@env'; // Certifique-se de configurar o API_URL

const Pedido = () => {
    const [opcoes, setOpcoes] = useState([]); // Lista unificada de produtos
    const [visibleChild, setVisibleChild] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [children, setChildren] = useState([]); // Inicialmente vazio
    const [visibleTime, setVisibleTime] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Estado para a quantidade do produto
    const [visibleQuantityModal, setVisibleQuantityModal] = useState(false); // Estado para controlar o modal de quantidade
    const [time] = useState([
        { id: 1, name: '7:00' },
        { id: 2, name: '7:30' },
        { id: 3, name: '8:00' },
        { id: 4, name: '8:30' },
        { id: 5, name: '9:00' },
        { id: 6, name: '9:30' },
        { id: 7, name: '10:00' },
        { id: 8, name: '10:30' },
        { id: 9, name: '11:00' },
        { id: 10, name: '11:30' },
        { id: 11, name: '12:00' },
        { id: 12, name: '12:30' },
        { id: 13, name: '13:00' },
        { id: 14, name: '13:30' },
        { id: 15, name: '14:00' },
        { id: 16, name: '14:30' },
        { id: 17, name: '15:00' },
        { id: 18, name: '15:30' },
        { id: 19, name: '16:00' },
        { id: 20, name: '16:30' },
        { id: 21, name: '17:00' },
        { id: 22, name: '17:30' },
        { id: 23, name: '18:00' }
    ]);

    // Função para buscar o perfil do usuário e estoque
    const fetchData = async () => {
        try {
            const profileResponse = await fetch(`${API_URL}/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const profileData = await profileResponse.json();
            setChildren(profileData.dependentes || []); // Preenche o dropdown de filhos

            const estoqueResponse = await fetch(`${API_URL}/estoque`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const estoqueData = await estoqueResponse.json();
            setOpcoes(estoqueData || []); // Preenche os itens de produtos

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Carregar dados ao montar o componente
    }, []);

    const openChildMenu = () => setVisibleChild(true);
    const closeChildMenu = () => setVisibleChild(false);

    const openTimeMenu = () => setVisibleTime(true);
    const closeTimeMenu = () => setVisibleTime(false);

    const openQuantityModal = (item) => {
        setSelectedProduct(item);
        setQuantity(1); // Reinicia a quantidade ao abrir o modal
        setVisibleQuantityModal(true);
    };

    const closeQuantityModal = () => setVisibleQuantityModal(false);

    const handleConfirmQuantity = () => {
        // Lógica para enviar dependente, horário, produto e quantidade
        console.log('Dependente:', selectedChild);
        console.log('Horário:', selectedTime);
        console.log('Produto:', selectedProduct);
        console.log('Quantidade:', quantity);

        // Aqui você pode enviar os dados para o servidor usando fetch ou outra abordagem.

        closeQuantityModal();
    };

    const toggleChildSelection = (item) => {
        setSelectedChild(selectedChild && selectedChild.id === item.id ? null : item);
        closeChildMenu();
    };

    const toggleTimeSelection = (item) => {
        setSelectedTime(selectedTime && selectedTime.id === item.id ? null : item);
        closeTimeMenu();
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => openQuantityModal(item)}>
            <View style={styles.carouselItem}>
                <Text style={styles.carouselText}>Nome: {item.nome}</Text>
                <Text style={styles.carouselText}>Preço: R$ {item.preco}</Text>
                <Text style={styles.carouselText}>Quantidade: {item.quantidade}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Dependente:</Text>
                <Menu
                    visible={visibleChild}
                    onDismiss={closeChildMenu}
                    anchor={
                        <Button mode="outlined" onPress={openChildMenu} style={styles.menuButton}>
                            <Text>{selectedChild ? selectedChild.nome : 'Selecione o filho'}</Text>
                        </Button>
                    }
                    style={styles.menu}
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {children.map((item) => (
                            <TouchableOpacity key={item.id} onPress={() => toggleChildSelection(item)}>
                                <Text style={[styles.menuItem, selectedChild && selectedChild.id === item.id ? styles.menuItemSelected : null]}>
                                    {item.nome}
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
                <Text style={styles.sectionTitle}>Produtos:</Text>
                <FlatList
                    data={opcoes}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            {/* Modal para seleção de quantidade */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleQuantityModal}
                onRequestClose={closeQuantityModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Selecionar Quantidade</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantity.toString()}
                            onChangeText={(text) => setQuantity(Number(text))} // Converte para número, garantindo que pelo menos 1
                        />
                        <Button mode="contained" onPress={handleConfirmQuantity} style={styles.confirmButton}>
                            Confirmar
                        </Button>
                        <Button mode="outlined" onPress={closeQuantityModal} style={styles.cancelButton}>
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default Pedido;
