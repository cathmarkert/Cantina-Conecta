import * as React from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/native'; 
import HeaderHome from "../components/header";

import styles from "./stylesHome";

const Home = () => {
  const navigation = useNavigation(); 

  const formattedCredit = "1234.56"; 

  return (
    <View style={styles.screen}>
      <HeaderHome />

      <View style={styles.container}>
        <View style={styles.amountContainer}>
          <View style={styles.creditBox}>
            <Text style={styles.amountText}>R$ {formattedCredit.replace('.', ',')}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
            <Icon name="cash-outline" size={24} color="#006600" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.home}>
        <View style={styles.actionsContainer}>
          <View style={styles.card}>
            <Text>Extrato</Text>
            <Icon name="copy" size={60} />
          </View>
          <View style={styles.card}>
            <Text>Lanches</Text>
            <Icon name="restaurant" size={60} />
          </View>
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.statNumber}>Avisos:</Text>
          <Text>Sem avisos por enquanto</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.stat1}>
            <Text style={styles.statText}>Lanches comprados 30 dias</Text>
            <Text style={styles.statNumber}>44</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statText}>Valor gasto 30 dias</Text>
            <Text style={styles.statNumber}>R$150,45</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('Selecionar')}>
          <Icon name="brush" color="#fff" size={20} />
          <Text style={styles.selectButtonText}>Selecionar Lanche</Text>
        </TouchableOpacity>
      </View>
    </View>


  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  creditBox: {
    flex: 1,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Home;
