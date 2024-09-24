import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375;

const scaleFont = (size) => Math.round(size * scale);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2EFEF',
        padding: 16,
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
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    stockHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    productRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 8,
    },
    productLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#3572EF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    circleText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    productName: {
        fontSize: 16,
        width: width * 0.4,
    },
    productIcons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    pictureIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 0.03 * width,
        padding: 0.01 * width,
    },
    iconColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 8,
        padding: 0.01 * width,
    },
    icon: {
        width: 20,
        height: 20,
        marginVertical: 4,
    },
    button: {
        backgroundColor: '#0000FF',  // Button background color
        paddingVertical: 12,         // Vertical padding
        paddingHorizontal: 40,       // Horizontal padding (reduce to make the button narrower)
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default styles;