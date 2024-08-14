import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './stylesHeader';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const HeaderHome = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <Text>
        <Icon name="bars" size={30} color="#000" style={styles.icon} /> {/* Ícone do menu */}
      </Text>
      <Text style={styles.title}>Cantina Conecta</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Parent')}>
        <Text>
          <Icon name="user-circle" size={30} color="#000" style={styles.icon} /> {/* Ícone de perfil */}
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default HeaderHome;