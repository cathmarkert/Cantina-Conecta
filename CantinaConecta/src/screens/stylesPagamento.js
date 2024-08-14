import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop:  height * 0.04,
        paddingHorizontal: width * 0.04, 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        padding: width * 0.03, 
    },
    backText: {
        fontSize: width * 0.045, 
    },
    headerTitle: {
        fontSize: width * 0.045, 
        alignItems: 'center',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: width * 0.04, 
    },
    amountText: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
    },
    selectText: {
        fontSize: width * 0.045, 
        color: '#fff',
        backgroundColor: '#050C9C',
        padding: width * 0.03, 
        borderRadius: 5,
        marginBottom: height * 0.04, 
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#3572EF',
        borderWidth: 2,
        borderRadius: 10,
        padding: width * 0.05, 
        marginVertical: height * 0.015, 
        width: '80%',
    },
    iconContainer: {
        flexDirection: 'column',
        alignItems: 'center', 
    },
    paymentText: {
        fontSize: width * 0.045, 
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: height * 0.015, 
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerText: {
        fontSize: width * 0.04, 
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: width * 0.01, 
        marginTop: height * 0.05, 
        margin: width * 0.04,
    },
    creditBox: {
        flex: 1,
        alignItems: 'flex-start',
        margin: width * 0.025, 
        padding: width * 0.03, 
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    plusButton: {
        padding: width * 0.03, 
    },
    plusIcon: {
        width: width * 0.06, 
        height: width * 0.06, 
    },
});

export default styles;
