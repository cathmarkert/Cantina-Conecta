import { StyleSheet, Dimensions } from 'react-native';

// Obter a largura da tela
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    titleContainer: {
        marginTop: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8, // Ajusta a largura para 80% da largura da tela
        padding: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    childrenContainer: {
        padding: 20,
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        marginHorizontal: 16,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    perfil: {
        flexDirection: 'row',
    },
    infoLanche: {
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
    name: {
        paddingHorizontal: 20,
        fontSize: 25,
        fontWeight: 'bold',
    },
    date: {
        paddingBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginTop: 10,
    },
    tipoLancheContainer: {
        width: width * 0.4, // Ajusta a largura para 40% da largura da tela
        height: 40, // Altura fixa
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1d1d1',
        borderRadius: 8,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        marginVertical: 10,
    },
    tipoLanche: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    lanche: {
        fontSize: 18,
        paddingLeft: 10,
    },
    buttons: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Ajusta o espaço entre os botões
        width: '80%', // Ajusta a largura dos botões para 80% da largura disponível
        maxWidth: 400, // Define uma largura máxima para os botões
        marginTop: 20
    },
    buttonCancel: {
        backgroundColor: '#FFFFFF', // Cor de fundo branca
        borderColor: '#C0C0C0', // Cor da borda cinza claro
        borderWidth: 1, // Largura da borda
        borderRadius: 20, // Bordas arredondadas
        paddingVertical: 12, // Espaçamento vertical interno
        paddingHorizontal: 20, // Espaçamento horizontal interno
        margin: 5, // Margem entre os botões
        flex: 1, // Faz com que o botão ocupe o máximo de espaço disponível
        alignItems: 'center', // Alinha o texto no centro horizontalmente
    },
    buttonPronto: {
        backgroundColor: '#0000FF', // Cor de fundo azul
        borderColor: '#0000CC', // Cor da borda azul escuro
        borderWidth: 1, // Largura da borda
        borderRadius: 20, // Bordas arredondadas
        paddingVertical: 12, // Espaçamento vertical interno
        paddingHorizontal: 20, // Espaçamento horizontal interno
        margin: 5, // Margem entre os botões
        flex: 1, // Faz com que o botão ocupe o máximo de espaço disponível
        alignItems: 'center', // Alinha o texto no centro horizontalmente
    },
    buttonTextCancel: {
        color: '#000000', // Cor do texto para o botão 'Cancelar'
        textAlign: 'center', // Centraliza o texto
    },
    buttonTextPronto: {
        color: '#FFFFFF', // Cor do texto para o botão 'Pronto'
        textAlign: 'center', // Centraliza o texto
    },
});

export default styles;
