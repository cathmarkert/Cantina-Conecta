import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: height * 0.08,
        paddingHorizontal: width * 0.02,
        marginBottom: height * 0.01,
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
    backgroundSection: {
      flex: 1,
      backgroundColor: '#F2EFEF',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: width * 0.05,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    creditContainer: {
      backgroundColor: '#FFFFFF',
      padding: 20,
      borderRadius: 10,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    input: {
      height: 50,
      borderColor: '#B0B0B0',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
    textText: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingVertical: 0.01 * height,

    },
    button: {
      backgroundColor: '#001BFF',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default styles;