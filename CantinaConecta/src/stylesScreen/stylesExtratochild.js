import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const scale = width / 375; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2EFEF',
    paddingHorizontal: scale * 20, 
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scale * 15, 
    paddingHorizontal: scale * 10,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  transactionIcon: {
    width: scale * 20, 
    height: scale * 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionSign: {
    fontSize: scale * 16,
    fontWeight: 'bold',
  },
  transactionDescription: {
    flex: 1,
    marginLeft: scale * 10,
    fontSize: scale * 16,
  },
  transactionAmount: {
    fontSize: scale * 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: scale * 16,
    fontWeight: 'bold',
    paddingVertical: scale * 15,
    paddingHorizontal: scale * 10,
    backgroundColor: '#eee',
  },
});

export default styles;
