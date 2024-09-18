import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import styles from "../stylesScreen/stylesParentprofile";
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

const Parent = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [dependents, setDependents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRepository = getRepository(User);
        const fetchedUser = await userRepository.findOne({ id: 1 }); // Adjust as necessary to fetch the logged-in user
        setUser(fetchedUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load user.');
      }
    };

    const fetchDependents = async () => {
      try {
        const dependentRepository = getRepository(Dependent);
        const fetchedDependents = await dependentRepository.find({ relations: ["transactions"] });
        setDependents(fetchedDependents);
      } catch (error) {
        console.error('Error fetching dependents:', error);
        setError('Failed to load dependents.');
      }
    };

    fetchUser();
    fetchDependents();
  }, []);

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
        <Text style={styles.dependentAmount}>{parseFloat(item.amount).toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
        <Text style={styles.profileName}>Luísa Santos</Text>
        <Text style={styles.totalAmount}>R$ {user ? parseFloat(user.totalAmount).toFixed(2).replace('.', ',') : '0,00'}</Text>
      </View>

      <View style={styles.amountContainer}>
        <View style={styles.creditBox}>
          <Text style={styles.amountText}>R$ 1234,56</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
          <Icon name="money-bill" size={24} color="#006600" />
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <FlatList
        data={dependents}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChild')}>
        <Text style={styles.addButtonText}>Adicionar Dependente</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Parent;