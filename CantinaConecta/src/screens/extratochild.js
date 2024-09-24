import React from 'react';
import { View, Text } from 'react-native';
import styles from '../stylesScreen/stylesExtratochild';

const ExtratoChild = ({ route }) => {
    const { name, matricula, lanche_avulso, limite, valor_gasto } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Informações do Dependente</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Nome:</Text>
                    <Text style={styles.value}>{name}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Matrícula:</Text>
                    <Text style={styles.value}>{matricula}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Lanche Avulso:</Text>
                    <Text style={styles.value}>{lanche_avulso ? 'Sim' : 'Não'}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Limite:</Text>
                    <Text style={styles.value}>R$ {limite}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.label}>Valor Gasto:</Text>
                    <Text style={styles.value}>R$ {valor_gasto}</Text>
                </View>
            </View>
        </View>
    );
};

export default ExtratoChild;
