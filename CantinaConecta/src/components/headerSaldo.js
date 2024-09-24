import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesComponents/stylesHeaderSaldo';
import { API_URL } from '@env';

const HeaderSaldo = () => {
	const navigation = useNavigation();
	const [credit, setCredit] = useState(0.00);

	const fetchProfile = async () => {
		try {
			const response = await fetch(`${API_URL}/profile`);
			if (!response.ok) {
				throw new Error('Erro ao buscar perfil: ' + response.statusText);
			}
			const data = await response.json();
			setCredit(data.credito);  // Atualiza o estado do crédito
		} catch (error) {
			console.error('Erro ao buscar perfil:', error);
		}
	};

	// useFocusEffect é executado toda vez que a tela entra em foco
	useFocusEffect(
		useCallback(() => {
			fetchProfile();
		}, [])
	);


	return (
		<View style={styles.header}>
			<View style={styles.containerHeader}>
				<Text style={styles.title}>Cantina Conecta</Text>
				<TouchableOpacity onPress={() => navigation.navigate('PerfilStack')}>
					<Text style={styles.perfil}>
						<Icon name="user-circle" size={30} color="#000" style={styles.icon} />
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.containerSaldo}>
				<View style={styles.amountContainer}>
					<View style={styles.creditBox}>
						<Text style={styles.amountText}>R$ {credit}</Text>
					</View>
					<TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
						<Icon name="plus" size={24} color="#0000FF" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default HeaderSaldo;
