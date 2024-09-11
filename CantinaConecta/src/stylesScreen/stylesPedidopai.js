import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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
        marginTop: 5,
        marginBottom: 25,
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
});