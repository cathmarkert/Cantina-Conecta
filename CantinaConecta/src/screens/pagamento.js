import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './stylesPagamento';

const Pagamento = () => {

	const navigation = useNavigation();
	const [credit, setCredit] = useState(0.00);

	// Function to format credit to 2 decimal places
	const formattedCredit = credit.toFixed(2);

	return (

		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<View style={styles.container}>
				<View style={styles.amountContainer}>
					<View style={styles.creditBox}>
						<Text style={styles.amountText}>R$ {formattedCredit.replace('.', ',')}</Text>
					</View>
				</View>

				<View style={styles.content}>
					<Text style={styles.selectText}>Selecione para adicionar créditos </Text>
					<TouchableOpacity style={styles.paymentButton}>
						<View style={styles.iconContainer}>
							<Icon name="cc-apple-pay" size={70} style={styles.icon} />
							<Text style={styles.paymentText}>PIX</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.paymentButton}>
						<View style={styles.iconContainer}>
							<Icon name="credit-card" size={70} style={styles.icon} />
							<Text style={styles.paymentText}>Cartão</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}

export default Pagamento;