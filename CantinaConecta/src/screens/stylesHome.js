import { Container } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between', // Adiciona espaço entre o conteúdo e o botão
    },
    scrollViewContent: {
        flexGrow: 1, // Garante que o conteúdo ocupe toda a altura disponível
    },
    home: {
        backgroundColor: '#F2EFEF',
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: width * 0.4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 15,
    },
    noticeContainer: {
        padding: 20,
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 16,
    },
    stat: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        padding: 20,
        borderRadius: 8,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 1,
    },
    statNumber: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    statText: {
        justifyContent: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: '#0000FF',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 15,
        margin: 16,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    ContainerButton: {
        position: 'absolute',
        bottom: 5,
        right: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hall: {
        backgroundColor: '#87CEFA',
        borderRadius: 8,
    },
});

export default styles;
