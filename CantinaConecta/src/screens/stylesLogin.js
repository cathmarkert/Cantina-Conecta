import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textTitle: {
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize:20,
    marginVertical:10,
  },
  textSubTitle: {
    color: '#808080',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:50,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: 200,
    height: 40,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },

});
