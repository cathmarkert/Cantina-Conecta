import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    header: {
        paddingVertical: 15,
        backgroundColor: "#FFFFFF",
    },
    title: {
        flex: 1,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#000",
    },
    backButton: {
        padding: 5,
    },
    containerHeader: {
        width: width,
        paddingTop: 45,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    containerSaldo: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 30,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderColor: '#E0E0E0',
        borderWidth: 1,
        shadowColor: '#bbb',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
        marginVertical: 10,
    },
    creditBox: {
        flex: 1,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
