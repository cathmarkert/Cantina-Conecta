import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    balanceSection: {
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
    balanceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    adjustLimitButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#0000FF',
        borderRadius: 10,
    },
    adjustLimitText: {
        color: '#FFF',
        fontSize: 14,
    },
    detailsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: width * 0.03,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: height * 0.02,
    },
    detailsText: {
        fontSize: 14,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    verticalLine: {
        width: 2,
        height: '120%',
        backgroundColor: '#000',
        position: 'absolute',
        left: '55%',
        transform: [{ translateX: -0.5 }],
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#001BFF', // Border color of the checkbox
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#FFFFFF', // White background for the checkbox
    },
    checked: {
        width: 10,
        height: 10,
        backgroundColor: '#001BFF', // Checked state color
    },
    checkboxText: {
        marginLeft: 8,
        fontSize: 14,
    },
    statsSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 16,
    },
    statBox: {
        width: width * 0.45, // 45% of the screen width
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        textAlign: 'center',
        marginTop: 4,
    },
    viewStatementButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: height * 0.02,
    },
    viewStatementText: {
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#0000FF',
        padding: height * 0.02,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: height * 0.03,
        marginBottom: height * 0.04,
    },
    addButtonText: {
        color: '#FFF',
        fontSize: width * 0.04, // Adjusted based on screen width
    },
    child: {
        backgroundColor: '#F2EFEF',
    },
});

export default styles;