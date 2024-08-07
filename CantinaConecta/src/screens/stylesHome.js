import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#DCDCDC',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: 16,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    creditBox: {
      flex: 1,
    },
    amountText: {
      fontSize: 18,
      fontWeight: 'bold',
    }
  });


  export default styles;