import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import styles from '../stylesComponents/stylesHeaderSaldo';
import { api, formatarReal } from '../services/api';

const HeaderSaldo = () => {
	const navigation = useNavigation();
	const [credit, setCredit] = useState(0);

	// Recarrega o saldo sempre que a tela entra em foco, para refletir uma
	// recarga ou um pedido feito em outra tela.
	useFocusEffect(
		useCallback(() => {
			api.get('/profile')
				.then((data) => setCredit(data.credito))
				.catch((error) => console.error('Erro ao buscar perfil:', error.message));
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
						<Text style={styles.amountText}>{formatarReal(credit)}</Text>
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
