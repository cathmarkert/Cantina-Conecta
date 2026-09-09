import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import styles from '../stylesScreen/stylesPagamento';
import { api, formatarReal } from '../services/api';

const Pagamento = () => {
	const navigation = useNavigation();
	const [credit, setCredit] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [enviando, setEnviando] = useState(false);

	const handleInputChange = (value) => {
		setInputValue(value);
		setCredit(parseFloat(value.replace(',', '.')) || 0);
	};

	// A integração real com PIX/cartão está fora do escopo do projeto: os dois
	// botões representam o meio escolhido e creditam o valor na conta.
	const handlePayment = async () => {
		if (credit <= 0) {
			Alert.alert('Valor inválido', 'Insira um valor maior que zero.');
			return;
		}

		setEnviando(true);
		try {
			await api.post('/add-credit', { credito: credit });
			Alert.alert('Sucesso', `Créditos adicionados: ${formatarReal(credit)}`);
			setInputValue('');
			setCredit(0);
			navigation.navigate('Inicio');
		} catch (error) {
			Alert.alert('Erro', error.message);
		} finally {
			setEnviando(false);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollViewContent}>
			<View style={styles.container}>
				<View style={styles.content}>
					<TextInput
						style={styles.input}
						value={inputValue}
						onChangeText={handleInputChange}
						placeholder="Insira o valor desejado"
						keyboardType="numeric"
					/>

					<Text style={styles.selectText}>Selecione o método de pagamento</Text>

					<TouchableOpacity style={styles.paymentButton} onPress={handlePayment} disabled={enviando}>
						<View style={styles.iconContainer}>
							<Image source={require('../../assets/pix_icon.png')} style={styles.icon} />
							<Text style={styles.paymentText}>PIX</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles.paymentButton} onPress={handlePayment} disabled={enviando}>
						<View style={styles.iconContainer}>
							<Image source={require('../../assets/credit_card.png')} style={styles.icon} />
							<Text style={styles.paymentText}>Cartão</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default Pagamento;
