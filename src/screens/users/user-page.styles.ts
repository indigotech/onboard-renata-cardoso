import {StyleSheet} from 'react-native';

export const styleUser = StyleSheet.create({
  container: {
    padding: 8,
    margin: 2,
    borderWidth: 1,
    borderColor: '#000000',
  },
  text: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6550FF',
    height: 52,
    width: 340,
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: 32,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 14,
  },
});
