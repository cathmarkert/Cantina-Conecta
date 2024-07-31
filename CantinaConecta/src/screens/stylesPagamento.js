import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    backButton: {
      padding: 10,
    },
    backText: {
      fontSize: 18,
    },
    headerTitle: {
      fontSize: 18,
      alignItems: 'center',
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    amountText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    selectText: {
      fontSize: 18,
      color: '#fff',
      backgroundColor: '#050C9C',
      padding: 10,
      borderRadius: 5,
      marginBottom: 30,
    },
    paymentButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#3572EF',
      borderWidth: 2,
      borderRadius: 10,
      padding: 20,
      marginVertical: 10,
      width: '80%',
    },
    iconContainer: {
      flexDirection: 'column',
      alignItems: 'center', 
    },
    icon: {
      // width: 50,
      // height: 50,
      // marginRight: 20,

    },
    paymentText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
    },
    footerButton: {
      alignItems: 'center',
    },
    footerText: {
      fontSize: 16,
    },
    amountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      padding: 10,
      marginTop: 40,
      margin: 16,
    },
    creditBox: {
      flex: 1,
      alignItems: 'left',
      margin: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
    },
    amountText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    plusButton: {
      padding: 10,
    },
    plusIcon: {
      width: 24,
      height: 24,
    },
  });

  export default styles;