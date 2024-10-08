import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#DCDCDC',
    },
    headerContainer: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        textAlign: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
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
        textAlign: 'center',
        width: '100%',
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: height * 0.02,
        padding: height * 0.01,
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
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: width * 0.4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    quantityButton: {
        backgroundColor: '#f1f1f1',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: width * 0.4,
        textAlign: 'center',
    },
    quantityText: {
        fontSize: 16,
        textAlign: 'center',
    },
    totalInput: {
        backgroundColor: '#f1f1f1',
        padding: height * 0.013,
        borderRadius: 8,
        marginBottom: 20,
        fontWeight: 'bold',
        fontSize: 16,
        width: '100%',
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
    paymentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        alignItems: 'center',  // Centers horizontally
        marginBottom: 20,
    },
    titleContainer: {
        paddingHorizontal: 20,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        padding: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    quantityInput: {
        backgroundColor: '#f1f1f1',
        padding: width * 0.027,
        borderRadius: 8,
        marginBottom: 10,
        width: width * 0.2,
        textAlign: 'center',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    paymentText: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
    },
    icon: {
        // Responsivo ao tamanho da tela (exemplo comentado)
    },
});