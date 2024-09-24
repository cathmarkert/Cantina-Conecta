import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../stylesScreen/stylesPagamento';
import { API_URL } from '@env';

const Pagamento = () => {
	const navigation = useNavigation();
	const [credit, setCredit] = useState(0.00);
	const [inputValue, setInputValue] = useState('');


	// Função para lidar com a mudança de texto no input
	const handleInputChange = (value) => {
		const numericValue = parseFloat(value.replace(',', '.')) || 0; // Converte a entrada em número
		setInputValue(value); // Atualiza o estado do input
		setCredit(numericValue); // Atualiza o crédito baseado no input
	};

	const handlePayment = async () => {
		if (credit <= 0) {
			alert("Valor inválido", "Insira um valor maior que zero.");
			return;
		}

		try {
			console.log(typeof (credit))
			const response = await fetch(`${API_URL}/add-credit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					credito: credit,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Atualiza o crédito localmente, caso necessário
				alert("Sucesso", `Créditos adicionados: R$ ${credit.toFixed(2)}`);
				setInputValue(''); // Limpa o campo de entrada
				setCredit(0.00); // Reseta o crédito

				navigation.navigate('Inicio')
			} else {
				// Mostra mensagem de erro se não for bem-sucedido
				alert("Erro", data.message || "Erro ao adicionar crédito.");
			}
		} catch (error) {
			alert("Erro", "Ocorreu um erro na conexão.");
			console.error(error);
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


					<TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment()}>
						<View style={styles.iconContainer}>
							<Image
								source={require('../../assets/pix_icon.png')}
								style={styles.icon}
							/>
							<Text style={styles.paymentText}>PIX</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.paymentButton} onPress={() => handlePayment()}>
						<View style={styles.iconContainer}>
							<Image
								source={require('../../assets/credit_card.png')}
								style={styles.icon}
							/>
							<Text style={styles.paymentText}>Cartão</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
};

export default Pagamento;
