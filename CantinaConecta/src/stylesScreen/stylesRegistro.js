import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textTitle: {
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginVertical: 10,
    },
    textSubTitle: {
        color: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    input: {
        width: 300,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        width: 200,
        height: 40,
        backgroundColor: '#050C9C',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 50,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        textAlign: 'center', // Centraliza o texto
        flexWrap: 'wrap',
        overflow: 'hidden',
        maxWidth: '100%', // Ajuste conforme necessário
    },
    buttonTextContainer: {
        flex: 1,
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
        overflow: 'hidden', // Evita overflow
        paddingHorizontal: 10, // Adiciona padding horizontal
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,

    },
    checkbox: {
        width: width * 0.05, // 5% da largura da tela
        height: width * 0.05, // Mantém a altura proporcional à largura
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        color: '#fff',
        fontSize: 16,
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#333',
        width: width * 0.5,
    },
    registerText: {
        fontSize: 16,
        color: '#007BFF',
        flexDirection: 'row',
        textAlign: 'center',
        flexWrap: 'nowrap',
        width: width
    },
});

export default styles;