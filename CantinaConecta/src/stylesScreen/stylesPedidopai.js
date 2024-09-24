import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375;

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F2EFEF',
    },
    inputContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    menu: {
        width: width * 0.9, // 90% da largura da tela
        maxHeight: 200, // Defina a altura máxima que desejar
        borderRadius: 8,
        elevation: 4, // Sombra para Android
        backgroundColor: '#FFFFFF', // Cor de fundo do menu
    },
    menuButton: {
        // width: '100%', // Ocupar toda a largura do botão
        justifyContent: 'flex-start', // Alinhar o texto à esquerda
        // paddingVertical: 12, // Padding vertical para um botão mais espaçoso
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
    containerbox: {
        marginVertical: 16,
    },
    carouselItem: {
        height: height * 0.15,
        width: width * 0.5,
        padding: 12,
        marginRight: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 2,
    },
    carouselText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    confirmButton: {
        marginBottom: 10,
    },
    cancelButton: {
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15 * scale,
        backgroundColor: '#0000FF',
        borderRadius: 30 * scale,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // elevation: 15,
        margin: 8 * scale,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});