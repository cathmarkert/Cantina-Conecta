import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { Container } from './styles';

const { width } = Dimensions.get('window');

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

const styles = StyleSheet.create({
    header:{
        height:90,
        width:width,
        paddingTop:45,
        backgroundColor:"#DCDCDC",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:15
    },
    title:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color:"#000"
    },
    icon:{
        padding:5,
        
    }
})

export default HeaderHome;