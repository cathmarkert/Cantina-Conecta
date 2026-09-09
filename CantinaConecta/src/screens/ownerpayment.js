import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, Image, Alert, ScrollView } from 'react-native';
import { Menu, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesOwnerpayment';
import { api, formatarReal } from '../services/api';

/**
 * Venda no balcão da cantina.
 *
 * A compra é vinculada a um dependente e debitada do crédito do responsável,
 * respeitando a permissão de lanche avulso e o limite de gasto.
 */
const ProductScreen = () => {
    const [produtos, setProdutos] = useState([]);
    const [dependentes, setDependentes] = useState([]);

    const [dependenteSelecionado, setDependenteSelecionado] = useState(null);
    const [menuAberto, setMenuAberto] = useState(false);

    const [carrinho, setCarrinho] = useState({});
    const [editando, setEditando] = useState(null);
    const [quantidade, setQuantidade] = useState('0');
    const [enviando, setEnviando] = useState(false);

    const carregar = useCallback(() => {
        api.get('/estoque')
            .then(setProdutos)
            .catch((error) => Alert.alert('Erro', error.message));

        api.get('/dependentes')
            .then(setDependentes)
            .catch((error) => Alert.alert('Erro', error.message));
    }, []);

    useFocusEffect(carregar);

    const total = produtos.reduce(
        (soma, produto) => soma + (carrinho[produto.id] || 0) * Number(produto.preco),
        0
    );

    const salvarQuantidade = () => {
        const qtd = parseInt(quantidade, 10);

        if (isNaN(qtd) || qtd < 0) {
            Alert.alert('Erro', 'Informe uma quantidade válida.');
            return;
        }

        setCarrinho((atual) => ({ ...atual, [editando.id]: qtd }));
        setEditando(null);
        setQuantidade('0');
    };

    const registrarVenda = async () => {
        if (!dependenteSelecionado) {
            Alert.alert('Erro', 'Selecione o dependente que está comprando.');
            return;
        }

        const itens = Object.entries(carrinho)
            .filter(([, qtd]) => qtd > 0)
            .map(([estoqueId, qtd]) => ({ estoque_id: Number(estoqueId), quantidade: qtd }));

        if (itens.length === 0) {
            Alert.alert('Erro', 'Selecione ao menos um produto.');
            return;
        }

        setEnviando(true);
        try {
            await api.post('/venda-balcao', {
                dependente_id: dependenteSelecionado.id,
                itens,
            });

            Alert.alert('Sucesso', 'Venda registrada e estoque atualizado!');
            setCarrinho({});
            setDependenteSelecionado(null);
            carregar();
        } catch (error) {
            Alert.alert('Não foi possível concluir', error.message);
        } finally {
            setEnviando(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setEditando(item);
                setQuantidade(String(carrinho[item.id] || 0));
            }}
            style={styles.listItem}
        >
            <Text style={styles.productName}>
                {item.nome} {carrinho[item.id] ? `(${carrinho[item.id]}x)` : ''}
            </Text>
            <Text style={styles.productPrice}>{formatarReal(item.preco)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Adicionar compra</Text>
            </View>

            <View style={styles.inputContainer}>
                <Menu
                    visible={menuAberto}
                    onDismiss={() => setMenuAberto(false)}
                    anchor={
                        <Button mode="outlined" onPress={() => setMenuAberto(true)}>
                            <Text>
                                {dependenteSelecionado
                                    ? `${dependenteSelecionado.nome} (${dependenteSelecionado.responsavel})`
                                    : 'Selecione o dependente'}
                            </Text>
                        </Button>
                    }
                >
                    <ScrollView style={{ maxHeight: 240 }}>
                        {dependentes.map((dep) => (
                            <TouchableOpacity
                                key={dep.id}
                                onPress={() => {
                                    setDependenteSelecionado(dep);
                                    setMenuAberto(false);
                                }}
                            >
                                <Text style={styles.productName}>
                                    {dep.nome} — {dep.responsavel}
                                    {dep.lanche_avulso ? '' : ' (sem lanche avulso)'}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Menu>
            </View>

            <FlatList
                data={produtos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.productName}>Nenhum produto no estoque.</Text>}
            />

            {editando !== null && (
                <View style={styles.quantityInputContainer}>
                    <TextInput
                        style={styles.quantityInput}
                        value={quantidade}
                        onChangeText={setQuantidade}
                        keyboardType="numeric"
                        placeholder="Quantidade"
                    />
                    <TouchableOpacity onPress={salvarQuantidade} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TextInput style={styles.totalInput} value={formatarReal(total)} editable={false} />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.paymentButton} onPress={registrarVenda} disabled={enviando}>
                    <View style={styles.iconContainer}>
                        <Image source={require('../../assets/contactless.png')} style={styles.icon} />
                        <Text style={styles.paymentText}>
                            {enviando ? 'Registrando...' : 'Registrar venda'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProductScreen;
