import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import HeaderHome from "../components/header";

import styles from "./stylesHome";

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

export default Home;
