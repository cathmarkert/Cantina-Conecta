import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './stylesHeader';

const HeaderHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View style={styles.containerHeader}>

        <Text style={styles.title}>Cantina Conecta</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Parent')}>
          <Text>
            <Icon name="user-circle" size={30} color="#000" style={styles.icon} /> {/* Ícone de perfil */}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


export default HeaderHome;
