import * as React from "react";
import { SectionList, View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../stylesScreen/stylesListaPedidos';

const ListaPedidos = () => {
	const lanchesData = [
		{
			title: "Lanches Programados",
			data: [
				{
					id: "1",
					data: "24/08/2024",
					nome: "José",
					responsavel: "João",
					horario: "12:00",
					itens: ["1x Sanduíche Natural", "2x Água Mineral"]
				},
			],
		},
		{
			title: "Lanches Programados",
			data: [
				{
					id: "2",
					data: "25/08/2024",
					nome: "Pedro",
					responsavel: "Maria",
					horario: "12:00",
					itens: ["1x Suco de Laranja", "1x Bolo de Cenoura"]
				},
			],
		},
		{
			title: "Lanches Programados",
			data: [
				{
					id: "3",
					data: "24/08/2024",
					nome: "Ana",
					responsavel: "Carlos",
					horario: "11:00",
					itens: ["1x Suco de Acerola", "2x Banana"]
				},
			],
		},
	];

	// Função para converter data e horário em um objeto Date
	const parseDate = (date, time) => {
		const [day, month, year] = date.split('/');
		const [hours, minutes] = time.split(':');
		return new Date(year, month - 1, day, hours, minutes);
	};

	// Função para ordenar por data e horário
	const sortedData = lanchesData.flatMap(section =>
		section.data.map(item => ({
			...item,
			fullDate: parseDate(item.data, item.horario),
		}))
	).sort((a, b) => a.fullDate - b.fullDate);

	// Reestruturando para formatar a data de volta para o formato esperado
	const formattedData = sortedData.reduce((acc, item) => {
		const sectionTitle = item.data;
		if (!acc[sectionTitle]) {
			acc[sectionTitle] = {
				title: "Lanches Programados",
				data: [],
			};
		}
		acc[sectionTitle].data.push(item);
		return acc;
	}, {});

	// Convertendo o objeto de volta para um array
	const sections = Object.values(formattedData);

	return (
		<View style={styles.screen}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Lista de Pedidos </Text>
			</View>

			<SectionList
				style={styles.list}
				sections={sections}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<View style={styles.childrenContainer}>
						<View style={styles.perfil}>
							<Icon name="user-circle" size={70} color="#000" style={styles.icon} />
							<View style={styles.infoLanche}>
								<Text style={styles.name}>{item.nome}</Text>
								<View style={styles.tipoLancheContainer}>
									<Text style={styles.tipoLanche}>Responsável: {item.responsavel}</Text>
								</View>
							</View>
						</View>
						<Text style={styles.date}>Entrega: {item.horario} - {item.data}</Text>
						{item.itens.length > 0 && item.itens.map((lanche, idx) => (
							<Text key={idx} style={styles.lanche}>{lanche}</Text>
						))}
						<View style={styles.buttons}>
							<TouchableOpacity style={styles.buttonCancel}>
								<Text style={styles.buttonTextCancel}>Cancelar </Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.buttonPronto}>
								<Text style={styles.buttonTextPronto}>Pronto </Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View >
	);
};

export default ListaPedidos;
