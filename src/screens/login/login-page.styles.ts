import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 60,
    },
    label: {
        fontSize: 18,
        color: '#000',
        marginTop: 24,
    },
    wrapperInput: {
        marginTop: 32,
    },
    input: {
        width: 340,
        height: 50,
        borderRadius: 16,
        fontSize: 13,
        marginTop: 4,
        borderWidth: 2,
        borderColor: '#cecece'
     },
    button:{
        backgroundColor: '#6550FF',
        height: 52,
        width: 340,
        borderRadius: 14,
        alignSelf: 'center',
        marginTop: 32,

    },
    textButton:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 14,
    },
    textError:{
        color: '#FF0000',
        fontSize: 14,
        marginTop: 14,
    }
});
