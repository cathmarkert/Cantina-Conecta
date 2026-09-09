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
  symbol: {
    marginLeft: scale * 10,
    fontSize: scale * 16,
    fontWeight: 'bold',
  },
  description: {
    flexDirection: 'row',
    textAlign: 'center',
    width: width * 0.4,
    marginLeft: scale * 10,
    fontSize: scale * 16,
  },
  amount: {
    marginRight: scale * 2,
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
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: width * 0.45,
    textAlign: 'center'
  },
});

export default styles;
