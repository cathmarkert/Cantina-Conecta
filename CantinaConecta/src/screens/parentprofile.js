import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesParentprofile';
import { api, formatarReal } from '../services/api';

const Parent = () => {
	const navigation = useNavigation();
	const [perfil, setPerfil] = useState(null);

	useFocusEffect(
		useCallback(() => {
			api.get('/profile')
				.then(setPerfil)
				.catch((error) => Alert.alert('Erro', error.message));
		}, [])
	);

	const handleLogout = async () => {
		try {
			await api.post('/logout');
		} catch (error) {
			// Encerrar a sessão local é o esperado mesmo se a chamada falhar.
			console.error('Erro ao fazer logout:', error.message);
		}

		navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.dependentContainer}
			onPress={() => navigation.navigate('Dependente', { dependent: item })}
		>
			<View style={styles.iconWrapper}>
				<Icon name="user-circle" size={50} color="#8285CD" style={styles.icon} />
			</View>
			<View>
				<Text style={styles.dependentName}>{item.nome}</Text>
				<Text style={styles.dependentAmount}>Gasto: {formatarReal(item.valor_gasto)}</Text>
			</View>
		</TouchableOpacity>
	);

	if (!perfil) {
		return (
			<View style={styles.container}>
				<Text>Carregando...</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Icon name="user-circle" size={100} color="#8285CD" style={styles.profileImage} />
				<Text style={styles.profileName}>{perfil.nome}</Text>
			</View>

			<View style={styles.amountContainer}>
				<View style={styles.creditBox}>
					<Text style={styles.amountText}>{formatarReal(perfil.credito)}</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
					<Icon name="money-bill" size={24} color="#006600" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={perfil.dependentes}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={<Text style={styles.dependentName}>Nenhum dependente cadastrado.</Text>}
				style={styles.list}
			/>

			<TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddChild')}>
				<Text style={styles.addButtonText}>Adicionar Dependente</Text>
			</TouchableOpacity>

			<TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
				<Text style={styles.logoutButtonText}>Sair</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Parent;
