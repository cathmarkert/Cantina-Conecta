import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F6F7',
        paddingHorizontal: width * 0.04,
        paddingTop: height * 0.05,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.02,
        paddingHorizontal: width * 0.02,
        marginBottom: height * 0.02,
    },
    backButton: {
        padding: width * 0.01,
    },
    backText: {
        fontSize: width * 0.045,
    },
    headerTitle: {
        fontSize: width * 0.045,
        alignItems: 'center',
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: height * 0.02,
    },
    profileImage: {
        width: width * 0.25,
        height: width * 0.25,
        borderRadius: width * 0.125,
        marginBottom: height * 0.01,
    },
    profileName: {
        fontSize: width * 0.045, // Adjusted based on screen width
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: width * 0.04, // Adjusted based on screen width
        width: width * 0.15,
        color: '#000',
        marginTop: height * 0.01,
    },
    list: {
        flex: 1,
    },
    dependentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: width * 0.04,
        borderRadius: 10,
        marginBottom: height * 0.01,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    iconWrapper: {
        marginRight: width * 0.03,
    },
    icon: {
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: width * 0.06,
        backgroundColor: '#DDD',
    },
    dependentName: {
        fontSize: width * 0.04, // Adjusted based on screen width
        fontWeight: 'bold',
    },
    dependentAmount: {
        fontSize: width * 0.035, // Adjusted based on screen width
        width: width * 0.4,
        color: '#000',
    },
    addButton: {
        backgroundColor: '#0000FF',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
    },
    logoutButton: {
        backgroundColor: '#ff0000',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.01,
    },
    addButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: width * 0.04, // Adjusted based on screen width
        width: width * 0.45,
    },
    logoutButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: width * 0.04, // Adjusted based on screen width
        width: width * 0.5,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: width * 0.04,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: height * 0.02,
    },
    creditBox: {
        flex: 1,
    },
    amountText: {
        fontSize: width * 0.045, // Adjusted based on screen width
        fontWeight: 'bold',
    },

});

export default styles;
