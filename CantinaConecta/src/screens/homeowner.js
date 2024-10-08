import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from "../stylesScreen/stylesHomeowner";

const HomeOwner = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <View style={styles.mainContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.home}>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('ExtratoCompras')}
                            >
                                <Icon name="copy" size={40} color={'#0000FF'} />
                                <Text>Extrato </Text>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('ListaPedidos')}
                            >
                                <Icon name="check-circle" size={40} color={'#0000FF'} />
                                <Text style={styles.cartTitle}>Pedidos </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.hall}>
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Lanches comprados 30 dias</Text>
                                    <Text style={styles.statNumber}>150</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Produto mais pedido 30 dias</Text>
                                    <Text style={styles.statNumber}>Sanduíche Natural</Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.viewStatementButton} onPress={() => navigation.navigate('Aviso')}>
                            <Text style={styles.viewStatementText}>Adicionar Aviso</Text>
                            <Icon name="arrow-right" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.footerSpacer} />
                </ScrollView>
                <View style={styles.ContainerButton}>
                    <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('AddCompra')}>
                        <Icon name="pen" color="#fff" size={20} />
                        <Text style={styles.selectButtonText}>Adicionar Compra</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    );
};

export default HomeOwner;