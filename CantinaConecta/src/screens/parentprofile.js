import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from "../stylesScreen/stylesParentprofile";
import { API_URL } from '@env';

const Parent = () => {
	const navigation = useNavigation();
	const [perfil, setPerfil] = useState(null);

	// Função para buscar o perfil
	const fetchPerfil = async () => {
		try {
			const response = await fetch(`${API_URL}/profile`);
			if (!response.ok) {
				throw new Error('Erro ao buscar perfil: ' + response.statusText);
			}
			const data = await response.json();
			setPerfil(data);
		} catch (error) {
			console.error(error);
		}
	};

	// Chama fetchPerfil sempre que a tela for focada
	useFocusEffect(
		React.useCallback(() => {
			fetchPerfil();
		}, [])
	);

	if (!perfil) {
		return <Text>Carregando...</Text>;
	}

	const handleLogout = async () => {
		try {
			const response = await fetch(`${API_URL}/logout`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			if (response.ok) {
				alert(data.message);
				navigation.reset({
					index: 0,
					routes: [{ name: "Login" }],
				});
			} else {
				alert(data.message);
			}
		} catch (error) {
			alert('Erro ao fazer logout: ' + error.message);
		}
	};

	const handlePress = (dependent) => {
		navigation.navigate('Dependente', { dependent });
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.dependentContainer} onPress={() => handlePress(item)}>
			<View style={styles.iconWrapper}>
				<Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.icon} />
			</View>
			<View>
				<Text style={styles.dependentName}>{item.nome}</Text>
				<Text style={styles.dependentAmount}>R$ {item.limite}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.container}>
			<View style={styles.profileContainer}>
				<Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.profileImage} />
				<Text style={styles.profileName}>{perfil.nome}</Text>
			</View>

			<View style={styles.amountContainer}>
				<View style={styles.creditBox}>
					<Text style={styles.amountText}>R$ {perfil.credito}</Text>
				</View>
				<TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
					<Icon name="money-bill" size={24} color="#006600" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={perfil.dependentes}
				renderItem={renderItem}
				keyExtractor={item => item.id.toString()} // Certifique-se de converter o ID para string
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
