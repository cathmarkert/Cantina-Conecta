import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import HeaderHome from "../components/header";

const Home = () => {
  const navigation = useNavigation(); // Initialize navigation

  const formattedCredit = "1234.56"; // Replace this with your actual credit data

  return (
    <View style={styles.screen}>
      <HeaderHome />
      
      <View style={styles.container}>
        {/* Amount container with an icon button */}
        <View style={styles.amountContainer}>
          <View style={styles.creditBox}>
            <Text style={styles.amountText}>R$ {formattedCredit.replace('.', ',')}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
            <Icon name="cash-outline" size={24} color="#006600" />
          </TouchableOpacity>
        </View>
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
