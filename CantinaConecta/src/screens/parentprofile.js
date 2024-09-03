import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from "./stylesParentprofile";

const data = [
  {
    id: '1',
    name: 'José',
    amount: 'R$ 0,00',
    registration: '10100012',
    lanches: '21',
    valorGasto: 'R$100,45',
    transactions: [
      { id: '1', type: 'debit', description: 'Lanche', amount: 'R$ 4,50', date: '2024-08-01' },
      { id: '2', type: 'credit', description: 'Crédito', amount: 'R$ 50,00', date: '2024-08-02' },
      { id: '3', type: 'debit', description: 'Lanche', amount: 'R$ 4,50', date: '2024-08-03' },
      { id: '4', type: 'credit', description: 'Crédito', amount: 'R$ 20,00', date: '2024-08-04' },
    ],
  },
  {
    id: '2',
    name: 'Maria',
    amount: 'R$ 0,00',
    registration: '10100013',
    lanches: '15',
    valorGasto: 'R$75,30',
    transactions: [
      { id: '1', type: 'debit', description: 'Lanche', amount: 'R$ 3,50', date: '2024-08-01' },
      { id: '2', type: 'credit', description: 'Crédito', amount: 'R$ 40,00', date: '2024-08-02' },
      { id: '3', type: 'debit', description: 'Lanche', amount: 'R$ 5,00', date: '2024-08-03' },
      { id: '4', type: 'credit', description: 'Crédito', amount: 'R$ 30,00', date: '2024-08-04' },
    ],
  },
];

const formattedCredit = "1234.56";

const Parent = () => {
  const navigation = useNavigation();

  const handlePress = (dependent) => {
    navigation.navigate('Dependente', { dependent });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dependentContainer} onPress={() => handlePress(item)}>
      <View style={styles.iconWrapper}>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
      </View>
      <View>
        <Text style={styles.dependentName}>{item.name}</Text>
        <Text style={styles.dependentAmount}>{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Luísa Santos</Text>
        <Text style={styles.totalAmount}>R$ 0,00</Text>
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.creditBox}>
          <Text style={styles.amountText}>R$ {formattedCredit.replace('.', ',')}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
          <Icon name="money-bill" size={24} color="#006600" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChild')}>
        <Text style={styles.addButtonText}>Adicionar Dependente </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Parent;