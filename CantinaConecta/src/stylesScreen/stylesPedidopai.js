import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F2EFEF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemPlaceholder: {
        width: width * 0.9,
        height: 80,
        backgroundColor: '#ddd',
        marginBottom: 10,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#0000FF',
        padding: 15,
        marginLeft: width * 0.5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 35,
        padding: 15 * scale,
        borderRadius: 30 * scale,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    carouselItem: {
        width: width * 0.8,
        height: 150,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    carouselText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    containerbox: {
        flex: 1,
        padding: 2,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkboxSelected: {
        backgroundColor: 'blue', // Change to any color you prefer
        borderColor: 'blue',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    menu: {
        width: width * 0.9, // 90% da largura da tela
        maxHeight: 200, // Defina a altura máxima que desejar
        borderRadius: 8,
        elevation: 4, // Sombra para Android
        backgroundColor: '#FFFFFF', // Cor de fundo do menu
    },
    menuButton: {
        width: '100%', // Ocupar toda a largura do botão
        justifyContent: 'flex-start', // Alinhar o texto à esquerda
        paddingVertical: 12, // Padding vertical para um botão mais espaçoso
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#CCCCCC', // Cor da borda (cinza claro)
        backgroundColor: '#FFFFFF', // Fundo do botão
    },
    menuItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0', // Cor da borda entre os itens
        backgroundColor: '#FFFFFF', // Cor de fundo dos itens
        fontSize: 16,
        color: '#333333', // Cor do texto
    },
    menuItemSelected: {
        backgroundColor: '#D9E8FF', // Cor de fundo para item selecionado
        fontWeight: 'bold', // Negrito para o texto selecionado
    },
});