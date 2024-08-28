import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#DCDCDC',
    },
    contentContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    sectionContainer: {
        flex: 1,
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
    listContainer: {
        paddingBottom: 20,
    },
    creditBox: {
        flex: 1,
    },
    amountText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 10, // Reduzido para ajustar o espaçamento
        backgroundColor: '#FFF',
        marginBottom: 5,
        borderRadius: 5,
        flex: 1,
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
    studentName: {
        flex: 3, // Ajustado para garantir espaço suficiente
        textAlign: 'center',
    },
    responsibleName: {
        flex: 2, // Ajustado para garantir espaço suficiente
        textAlign: 'center',
    },
    value: {
        flex: 2, // Ajustado para garantir espaço suficiente
        textAlign: 'right',
    },
    sectionHeader: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerRow: {
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        paddingVertical: 10,
        justifyContent: 'space-between',
        borderRadius: 5,
        marginTop: 30, // Adicionada a margem para ajustar a distância
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20, // Aumentado para ser um pouco maior que a sectionHeaderText
    },
    footerSpacer: {
        height: 50,
        backgroundColor: '#DCDCDC',
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
        margin: 8,
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
});

export default styles;
