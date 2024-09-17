import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../stylesScreen/stylesEstoque'
import { useNavigation } from '@react-navigation/native';

const Estoque = () => {
    const navigation = useNavigation();
    const stockValues = [3, 2, 0, 4];
    const iconSets = [
        ['seedling', 'seedling', 'hamburger'],     
        ['pizza-slice', 'seedling', 'ice-cream'], 
        ['seedling', 'bread-slice', 'hotdog'], 
        ['pizza-slice', 'bread-slice', 'lemon']     
    ];

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
                                <Text style={styles.circleText}>{stockValues[index]}</Text>
                            </View>
                            <Text style={styles.productName}>Produto {item}</Text>
                        </View>

                        <View style={styles.productIcons}>
                            <View style={styles.iconColumn}>
                                <Icon name={iconSets[index][0]} size={25} color={'#3572EF'}  style={{ marginBottom: 5 }} />
                                <Icon name={iconSets[index][1]} size={25} color={'#3572EF'} />
                            </View>
                            <View style={styles.pictureIcon}>
                                {typeof iconSets[index][2] === 'string' ? (
                                    <Icon name={iconSets[index][2]} size={40} color={'#0000FF'} />
                                ) : (
                                    <Text>Invalid Icon</Text>
                                )}
                            </View>
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