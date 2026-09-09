import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal, TextInput, Alert } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../stylesScreen/stylesPedidopai';
import { api, formatarReal } from '../services/api';

// Horários de entrega oferecidos pela cantina, de meia em meia hora.
const HORARIOS = Array.from({ length: 23 }, (_, i) => {
    const minutos = 7 * 60 + i * 30;
    const hora = String(Math.floor(minutos / 60)).padStart(2, '0');
    return `${hora}:${minutos % 60 === 0 ? '00' : '30'}`;
});

const Pedido = () => {
    const navigation = useNavigation();

    const [produtos, setProdutos] = useState([]);
    const [dependentes, setDependentes] = useState([]);

    const [dependenteSelecionado, setDependenteSelecionado] = useState(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [menuDependente, setMenuDependente] = useState(false);
    const [menuHorario, setMenuHorario] = useState(false);

    // Itens escolhidos antes de confirmar: [{ produto, quantidade }]
    const [carrinho, setCarrinho] = useState([]);
    const [produtoEmEdicao, setProdutoEmEdicao] = useState(null);
    const [quantidade, setQuantidade] = useState('1');
    const [enviando, setEnviando] = useState(false);

    const carregarDados = useCallback(() => {
        api.get('/profile')
            .then((perfil) => setDependentes(perfil.dependentes || []))
            .catch((error) => Alert.alert('Erro', error.message));

        api.get('/estoque')
            .then(setProdutos)
            .catch((error) => Alert.alert('Erro', error.message));
    }, []);

    useFocusEffect(carregarDados);

    const total = carrinho.reduce(
        (soma, item) => soma + Number(item.produto.preco) * item.quantidade,
        0
    );

    const abrirModalQuantidade = (produto) => {
        setProdutoEmEdicao(produto);
        setQuantidade('1');
    };

    const adicionarAoCarrinho = () => {
        const qtd = parseInt(quantidade, 10);

        if (isNaN(qtd) || qtd <= 0) {
            Alert.alert('Erro', 'Informe uma quantidade válida.');
            return;
        }

        if (qtd > produtoEmEdicao.quantidade) {
            Alert.alert('Erro', `Restam apenas ${produtoEmEdicao.quantidade} em estoque.`);
            return;
        }

        setCarrinho((atual) => {
            const existente = atual.find((item) => item.produto.id === produtoEmEdicao.id);
            if (existente) {
                return atual.map((item) =>
                    item.produto.id === produtoEmEdicao.id ? { ...item, quantidade: qtd } : item
                );
            }
            return [...atual, { produto: produtoEmEdicao, quantidade: qtd }];
        });

        setProdutoEmEdicao(null);
    };

    const removerDoCarrinho = (produtoId) => {
        setCarrinho((atual) => atual.filter((item) => item.produto.id !== produtoId));
    };

    const confirmarPedido = async () => {
        if (!dependenteSelecionado) {
            Alert.alert('Erro', 'Selecione o dependente.');
            return;
        }

        if (!horarioSelecionado) {
            Alert.alert('Erro', 'Selecione o horário de entrega.');
            return;
        }

        if (carrinho.length === 0) {
            Alert.alert('Erro', 'Adicione ao menos um item ao pedido.');
            return;
        }

        setEnviando(true);
        try {
            await api.post('/pedidos', {
                dependente_id: dependenteSelecionado.id,
                horario: horarioSelecionado,
                itens: carrinho.map((item) => ({
                    estoque_id: item.produto.id,
                    quantidade: item.quantidade,
                })),
            });

            Alert.alert('Sucesso', 'Pedido realizado com sucesso!');
            setCarrinho([]);
            setDependenteSelecionado(null);
            setHorarioSelecionado(null);
            navigation.navigate('Inicio');
        } catch (error) {
            Alert.alert('Não foi possível concluir', error.message);
        } finally {
            setEnviando(false);
        }
    };

    const renderProduto = ({ item }) => (
        <TouchableOpacity onPress={() => abrirModalQuantidade(item)} disabled={item.quantidade === 0}>
            <View style={styles.carouselItem}>
                <Text style={styles.carouselText}>{item.nome}</Text>
                <Text style={styles.carouselText}>{formatarReal(item.preco)}</Text>
                <Text style={styles.carouselText}>
                    {item.quantidade > 0 ? `Estoque: ${item.quantidade}` : 'Esgotado'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Dependente:</Text>
                <Menu
                    visible={menuDependente}
                    onDismiss={() => setMenuDependente(false)}
                    anchor={
                        <Button mode="outlined" onPress={() => setMenuDependente(true)} style={styles.menuButton}>
                            <Text>{dependenteSelecionado ? dependenteSelecionado.nome : 'Selecione o dependente'}</Text>
                        </Button>
                    }
                    style={styles.menu}
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {dependentes.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => {
                                    setDependenteSelecionado(item);
                                    setMenuDependente(false);
                                }}
                            >
                                <Text style={styles.menuItem}>{item.nome}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.sectionTitle}>Selecionar Horário:</Text>
                <Menu
                    visible={menuHorario}
                    onDismiss={() => setMenuHorario(false)}
                    anchor={
                        <Button mode="outlined" onPress={() => setMenuHorario(true)} style={styles.menuButton}>
                            <Text>{horarioSelecionado || 'Selecione o horário'}</Text>
                        </Button>
                    }
                    style={styles.menu}
                >
                    <ScrollView style={{ maxHeight: 200 }}>
                        {HORARIOS.map((hora) => (
                            <TouchableOpacity
                                key={hora}
                                onPress={() => {
                                    setHorarioSelecionado(hora);
                                    setMenuHorario(false);
                                }}
                            >
                                <Text style={styles.menuItem}>{hora}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
            </View>

            <View style={styles.containerbox}>
                <Text style={styles.sectionTitle}>Produtos:</Text>
                <FlatList
                    data={produtos}
                    horizontal
                    renderItem={renderProduto}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={<Text style={styles.carouselText}>Nenhum produto disponível.</Text>}
                />
            </View>

            <View style={styles.containerbox}>
                <Text style={styles.sectionTitle}>Itens do pedido:</Text>
                {carrinho.length === 0 ? (
                    <Text style={styles.carouselText}>Toque num produto para adicionar.</Text>
                ) : (
                    carrinho.map((item) => (
                        <TouchableOpacity
                            key={item.produto.id}
                            onPress={() => removerDoCarrinho(item.produto.id)}
                        >
                            <Text style={styles.menuItem}>
                                {item.quantidade}x {item.produto.nome} —{' '}
                                {formatarReal(Number(item.produto.preco) * item.quantidade)}   (toque para remover)
                            </Text>
                        </TouchableOpacity>
                    ))
                )}
                <Text style={styles.sectionTitle}>Total: {formatarReal(total)}</Text>
            </View>

            <Modal
                animationType="slide"
                transparent
                visible={produtoEmEdicao !== null}
                onRequestClose={() => setProdutoEmEdicao(null)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Quantidade de {produtoEmEdicao ? produtoEmEdicao.nome : ''}
                        </Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={quantidade}
                            onChangeText={setQuantidade}
                        />
                        <Button mode="contained" onPress={adicionarAoCarrinho} style={styles.confirmButton}>
                            Adicionar
                        </Button>
                        <Button mode="outlined" onPress={() => setProdutoEmEdicao(null)} style={styles.cancelButton}>
                            Cancelar
                        </Button>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity style={styles.button} onPress={confirmarPedido} disabled={enviando}>
                <Text style={styles.buttonText}>{enviando ? 'Enviando...' : 'Confirmar'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Pedido;
