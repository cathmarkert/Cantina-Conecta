import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
//import CheckBox from '@react-native-community/checkbox';
import styles from './stylesChildprofile'

const Dependente = () => {

    const navigation = useNavigation();
    const [isChecked, setIsChecked] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={20} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cantina Conecta</Text>
            </View>

            <View style={styles.profileContainer}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
                <Text style={styles.profileName}>Luísa Santos</Text>
            </View>

            <View style={styles.balanceSection}>
                <Text style={styles.balanceText}>R$ 0,00</Text>
                <TouchableOpacity style={styles.adjustLimitButton}>
                    <Text style={styles.adjustLimitText}>Ajustar limite</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsSection}>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.detailsText}>Matrícula: 10100012</Text>
                    <Text style={styles.detailsText}>Cantina: Cantina Conecta</Text>
                    <View style={styles.checkboxContainer}>
                        {/* <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            tintColors={{ true: '#000', false: '#000' }}
          /> */}
                        <Text style={styles.checkboxText}>Lanche avulso</Text>
                    </View>
                </View>
            </View>

            <View style={styles.detailsSection}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>21</Text>
                    <Text style={styles.statLabel}>Nº de lanches 30 dias</Text>
                </View>
                
                <View style={styles.verticalLine} />

                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>R$100,45</Text>
                    <Text style={styles.statLabel}>Valor gasto 30 dias</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.viewStatementButton}>
                <Text style={styles.viewStatementText}>Visualizar extrato</Text>
                <Icon name="arrow-right" size={20} color="#000" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => { }}>
                <Text style={styles.addButtonText}>Adicionar Dependente</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Dependente;