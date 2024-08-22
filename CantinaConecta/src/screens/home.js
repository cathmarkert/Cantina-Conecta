import * as React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import HeaderSaldo from "../components/headerSaldo";
import styles from "./stylesHome";

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            {/* <HeaderSaldo /> */}
            <View style={styles.mainContent}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.home}>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => navigation.navigate('Extrato')}
                            >
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
                                <Text>Sem avisos por enquanto</Text>
                            </View>
                            <View style={styles.statsContainer}>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Lanches comprados 30 dias</Text>
                                    <Text style={styles.statNumber}>44</Text>
                                </View>
                                <View style={styles.stat}>
                                    <Text style={styles.statText}>Valor gasto 30 dias</Text>
                                    <Text style={styles.statNumber}>R$150,45</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.ContainerButton}>
                    <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('Selecionar')}>
                        <Icon name="brush" color="#fff" size={20} />
                        <Text style={styles.selectButtonText}>Selecionar Lanche</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default Home;
