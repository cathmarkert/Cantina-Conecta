import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './stylesHeader';

const HeaderHome = () => {
    const navigation = useNavigation();
    const formattedCredit = "1234.56";

    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}>

                <Text style={styles.title}>Cantina Conecta</Text>
                <Text style={styles.perfil}>
                    <Icon name="user-circle" size={30} color="#000" style={styles.icon} />
                </Text>
            </View>

        </View>
    );
};

export default HeaderHome;
