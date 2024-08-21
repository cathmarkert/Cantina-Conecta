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
});

export default styles;
