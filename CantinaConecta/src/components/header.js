import React from 'react';
import { View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './stylesHeader';

// import { Container } from './styles';

const HeaderHome = () => {
  return (
    <View style ={styles.header}>
        <Text>
            <Icon name="bars" size={30} color="#000" style={styles.icon} /> {/* Ícone do menu */}    
        </Text>
        <Text style={styles.title}>Cantina Conecta</Text>
        <Text>
            <Icon name="user-circle" size={30} color="#000" style={styles.icon} /> {/* Ícone de perfil */}
        </Text>
    </View>
  );
}


export default HeaderHome;