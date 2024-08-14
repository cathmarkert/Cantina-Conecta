import React from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from "./stylesParentprofile"; // Assuming you have a separate styles file

const data = [
  { id: '1', name: 'José', amount: 'R$ 0,00' },
  { id: '2', name: 'Maria', amount: 'R$ 0,00' },
];

const formattedCredit = "1234.56";

const Parent = () => {
  const navigation = useNavigation(); // Ensuring the useNavigation hook is in place

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.dependentContainer}>
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cantina Conecta</Text>
      </View>

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

      <TouchableOpacity style={styles.addButton} onPress={() => { }}>
        <Text style={styles.addButtonText}>Adicionar Dependente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Parent;
