import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	scrollViewContent: {
		// flexGrow: 1,  // Permite que a ScrollView preencha toda a tela mesmo quando o conteúdo não for suficiente para rolar
		justifyContent: 'center',  // Centraliza o conteúdo quando não há necessidade de rolagem
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		backgroundColor: '#F2EFEF',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: width * 0.03,  // Ajuste responsivo para o padding
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	backButton: {
		padding: width * 0.02,  // Ajuste responsivo para o padding
	},
	backText: {
		fontSize: width * 0.045,  // Responsivo de acordo com a largura da tela
	},
	headerTitle: {
		fontSize: width * 0.045,  // Responsivo de acordo com a largura da tela
		fontWeight: 'bold',
	},
	content: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: width * 0.04,  // Ajuste responsivo para o padding
		paddingVertical: width * 0.01,  // Ajuste responsivo para o padding
	},
	amountText: {
		fontSize: width * 0.09,  // Responsivo de acordo com a largura da tela
		fontWeight: 'bold',
		// marginBottom: height * 0.025,  // Ajuste responsivo para o margin
	},
	selectMethod: {
		backgroundColor: 'black',
		padding: width * 0.03,  // Ajuste responsivo para o padding
		borderRadius: 10,
		marginBottom: height * 0.04,  // Ajuste responsivo para o margin
	},
	selectText: {
		fontSize: width * 0.045,  // Responsivo de acordo com a largura da tela
		color: '#fff',
		backgroundColor: '#050C9C',
		padding: width * 0.025,  // Ajuste responsivo para o padding
		borderRadius: 5,
		marginVertical: height * 0.01,  // Ajuste responsivo para o margin
		width: width * 0.9,
		textAlign: 'center'
	},
	paymentButton: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		borderColor: '#3572EF',
		borderWidth: 2,
		borderRadius: 10,
		padding: width * 0.05,  // Ajuste responsivo para o padding
		marginVertical: height * 0.02,  // Ajuste responsivo para o margin
		width: '80%',  // Responsivo ao tamanho da tela
	},
	iconContainer: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	icon: {
		width: 70, height: 70
	},
	paymentText: {
		fontSize: width * 0.045,  // Responsivo de acordo com a largura da tela
		fontWeight: 'bold',
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingVertical: height * 0.015,  // Ajuste responsivo para o padding
		borderTopWidth: 1,
		borderTopColor: '#ddd',
	},
	footerButton: {
		alignItems: 'center',
	},
	footerText: {
		fontSize: width * 0.04,  // Responsivo de acordo com a largura da tela
	},
	amountContainer: {
		backgroundColor: '#3572EF',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
		padding: width * 0.03,  // Ajuste responsivo para o padding
		marginTop: height * 0.05,  // Ajuste responsivo para o margin
		margin: width * 0.04,  // Ajuste responsivo para o margin
	},
	creditBox: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'flex-start',  // Ajuste para 'flex-start' em vez de 'left'
		margin: width * 0.025,  // Ajuste responsivo para o margin
		padding: width * 0.03,  // Ajuste responsivo para o padding
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 10,
	},
	plusButton: {
		padding: width * 0.025,  // Ajuste responsivo para o padding
	},
	plusIcon: {
		width: width * 0.06,  // Ajuste responsivo para o tamanho do ícone
		height: width * 0.06,  // Ajuste responsivo para o tamanho do ícone
	},
	input: {
		height: 40,
		borderColor: '#ccc',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		width: width * 0.73,
		marginVertical: 10,
	}
});

export default styles;
