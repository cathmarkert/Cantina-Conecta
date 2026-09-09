import React, { useCallback, useState } from 'react';
import { SectionList, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import styles from '../stylesScreen/stylesListaPedidos';
import { api, formatarReal } from '../services/api';

/** Agrupa os pedidos por data de entrega. */
const agruparPorData = (pedidos) => {
	const secoes = [];

	pedidos.forEach((pedido) => {
		const secao = secoes.find((s) => s.title === pedido.data);
		if (secao) {
			secao.data.push(pedido);
		} else {
			secoes.push({ title: pedido.data, data: [pedido] });
		}
	});

	return secoes;
};

const ListaPedidos = () => {
	const [pedidos, setPedidos] = useState([]);
	const [carregando, setCarregando] = useState(true);

	useFocusEffect(
		useCallback(() => {
			api.get('/pedidos')
				.then(setPedidos)
				.catch((error) => console.error('Erro ao buscar pedidos:', error.message))
				.finally(() => setCarregando(false));
		}, [])
	);

	return (
		<View style={styles.screen}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Lista de Pedidos </Text>
			</View>

			<SectionList
				style={styles.list}
				sections={agruparPorData(pedidos)}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={
					<Text style={styles.name}>
						{carregando ? 'Carregando...' : 'Nenhum pedido registrado.'}
					</Text>
				}
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
						{item.itens.map((lanche, idx) => (
							<Text key={idx} style={styles.lanche}>{lanche}</Text>
						))}
						<Text style={styles.date}>Total: {formatarReal(item.total)}</Text>
					</View>
				)}
			/>
		</View>
	);
};

export default ListaPedidos;
