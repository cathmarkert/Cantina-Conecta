import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../stylesScreen/stylesEstoque'
import { useNavigation } from '@react-navigation/native';

const Estoque = () => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Lista de Pedidos </Text>
            </View>

            <View style={styles.stockContainer}>
                {[1, 2, 3, 4].map((item, index) => (
                    <View key={index} style={[styles.productRow, { marginBottom: index < 3 ? 8 : 0 }]}>
                        <View style={styles.productLeft}>
                            <View style={styles.circle}>
                                <Text style={styles.circleText}>{item}</Text>
                            </View>
                            <Text style={styles.productName}>Produto {item}</Text>
                        </View>

                        <View style={styles.productIcons}>
                            <View style={styles.iconColumn}>
                                <Icon name="copy" size={40} color={'#0000FF'} />
                                <Icon name="copy" size={40} color={'#0000FF'} />
                            </View>
                            <Icon name="copy" size={40} color={'#0000FF'} />
                        </View>
                    </View>
                ))}
            </View>


            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddEstoque')}>
                <Text style={styles.buttonText}>Alterar estoque</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default Estoque;