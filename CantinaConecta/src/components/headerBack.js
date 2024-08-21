import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './stylesHeaderBack';

const HeaderBack = () => {
  const navigation = useNavigation();
  const formattedCredit = "1234.56";

  return (
    <View style={styles.header}>
      <View style={styles.containerHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Cantina Conecta</Text>

      </View>

      <View style={styles.containerSaldo}>
        <View style={styles.amountContainer}>
          <View style={styles.creditBox}>
            <Text style={styles.amountText}>R$ {formattedCredit.replace('.', ',')}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
            <Icon name="plus" size={24} color="#0000FF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderBack;
