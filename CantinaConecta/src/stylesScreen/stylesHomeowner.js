import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#F2EFEF',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollViewContent: {
        backgroundColor: '#fff',
    },
    footerSpacer: {
        height: 80,
        backgroundColor: '#F2EFEF',
    },
    home: {
        backgroundColor: '#F2EFEF',
        flex: 1,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.03,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: height * 0.02,
    },
    card: {
        backgroundColor: '#fff',
        padding: width * 0.08,
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
        padding: width * 0.05,
        backgroundColor: '#F8F8FF',
        borderRadius: 8,
        marginHorizontal: width * 0.04,
        marginVertical: height * 0.02,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: height * 0.02,
        paddingHorizontal: width * 0.04,
    },
    stat: {
        alignItems: 'center',
        backgroundColor: '#F8F8FF',
        padding: width * 0.05,
        width: '48%',
    },
    statNumber: {
        alignItems: 'center',
        fontSize: width * 0.05,
        fontWeight: 'bold',
    },
    statText: {
        justifyContent: 'center',
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.04,
        backgroundColor: '#0000FF',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 15,
        margin: width * 0.02,
    },
    selectButtonText: {
        color: '#fff',
        fontSize: width * 0.04,
        fontWeight: 'bold',
        marginLeft: width * 0.02,
    },
    ContainerButton: {
        position: 'absolute',
        bottom: height * 0.02,
        right: width * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hall: {
        backgroundColor: '#F2EFEF',
        borderRadius: 8,
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
});

export default styles;

