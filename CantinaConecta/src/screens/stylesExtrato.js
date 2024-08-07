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
  titleContainer: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
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
    fontWeight: 'bold'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    marginBottom: 5,
    borderRadius: 5,
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  type: {
    flex: 1,
    textAlign: 'center',
  },
  value: {
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
});

export default styles;
