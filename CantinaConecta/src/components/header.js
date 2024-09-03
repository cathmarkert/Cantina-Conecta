import React from 'react';
import { View, Text } from 'react-native';
import styles from '../stylesComponents/stylesHeader';

const Header = () => {
    return (
        <View style={styles.header}>
            <View style={styles.containerHeader}>

                <Text style={styles.title}>Cantina Conecta</Text>

            </View>
        </View>
    );
}


export default Header;
