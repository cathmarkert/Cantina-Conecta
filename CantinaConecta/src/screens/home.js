import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesHome';
import { api, formatarReal } from '../services/api';

const Home = () => {
    const navigation = useNavigation();
    const [avisos, setAvisos] = useState([]);
    const [resumo, setResumo] = useState({ lanches_30_dias: 0, valor_30_dias: 0 });

    useFocusEffect(
        useCallback(() => {
            api.get('/avisos')
                .then(setAvisos)
                .catch((error) => console.error('Erro ao buscar avisos:', error.message));

            api.get('/resumo')
                .then(setResumo)
                .catch((error) => console.error('Erro ao buscar resumo:', error.message));
        }, [])
    );

    return (
        <View style={styles.screen}>
            <View style={styles.mainContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.home}>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Extrato')}>
                                <Icon name="copy" size={40} color={'#0000FF'} />
                                <Text>Extrato</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('LanchesProgramados')}
                            >
                                <Icon name="restaurant" size={40} color={'#0000FF'} />
                                <Text style={styles.cartTitle}>Lanches Programados</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.hall}>
                            <View style={styles.noticeContainer}>
                                <Text style={styles.statNumber}>Avisos:</Text>
                                {avisos.length === 0 ? (
                                    <Text>Sem avisos por enquanto.</Text>
                                ) : (
                                    avisos.map((aviso) => (
                                        <Text key={aviso.id}>{aviso.data} — {aviso.mensagem}</Text>
                                    ))
                                )}
                            </View>

                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Lanches comprados 30 dias</Text>
                                    <Text style={styles.statNumber}>{resumo.lanches_30_dias}</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Valor gasto 30 dias</Text>
                                    <Text style={styles.statNumber}>{formatarReal(resumo.valor_30_dias)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footerSpacer} />
                </ScrollView>

                <View style={styles.ContainerButton}>
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => navigation.navigate('Selecionar')}
                    >
                        <Icon name="brush" color="#fff" size={20} />
                        <Text style={styles.selectButtonText}>Selecionar Lanche</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;
