import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#DCDCDC',
    },
    headerContainer: {
        marginBottom: height * 0.02,
        textAlign: 'center',
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: height * 0.02,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Alinha os itens verticalmente no centro
        marginVertical: height * 0.002,
        padding: 10, // Adiciona um padding para o conteúdo
        borderWidth: 1, // Adiciona uma borda
        borderColor: '#ccc', // Cor da borda
        borderRadius: 8, // Arredonda os cantos da borda
        backgroundColor: '#fff', // Cor de fundo branca
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    columnHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productButton: {
        backgroundColor: '#3572EF',
        padding: width * 0.03,
        borderRadius: 8,
        marginBottom: 10,
        width: width * 0.4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        marginBottom: 10,
        width: width * 0.4,
    },
    quantityInput: {
        backgroundColor: '#F9F9F9',
        padding: width * 0.02,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        textAlign: 'center',
        width: width * 0.1
    },
    totalInput: {
        backgroundColor: '#F9F9F9',
        padding: height * 0.013,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
    },
    buttonContainer: {
        alignItems: 'center',
        // marginBottom: 20,
    },
    paymentButton: {
        backgroundColor: '#f1f1f1',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.04,
        width: '50%',
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderRadius: 8,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    priceContainer: {
        flex: 1, // Isso faz com que a coluna de preço ocupe o espaço restante
        alignItems: 'flex-end', // Alinha o conteúdo do container à direita
        marginRight: width * 0.04
    },

    productPrice: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'right', // Alinha o texto à direita
    },

    productName: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    icon: {
        width: 70,
        height: 70,
    },
    quantityInputContainer: {
        flexDirection: 'row', // Organiza o TextInput e o botão em linha
        margin: 10, // Adiciona margem ao redor do contêiner
        width: '90%', // Ajusta a largura do contêiner
        alignSelf: 'center', // Centraliza o contêiner
    },

    quantityInput: {
        flex: 1, // O TextInput ocupa todo o espaço disponível
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#f9f9f9',
        marginRight: 10, // Espaço entre o TextInput e o botão
    },

    saveButton: {
        backgroundColor: '#007BFF', // Cor do botão de salvar
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },

    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },

});
