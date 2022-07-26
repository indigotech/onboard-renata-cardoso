import React from 'react';
import {Text, View, TextInput, TextInputProps} from 'react-native';
import {StyleSheet} from 'react-native';

type Props = TextInputProps & {
  label: string;
};

export const InputComponent = ({label, ...rest}: Props) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: '#000',
    marginTop: 24,
    marginHorizontal: 20,
  },
  input: {
    width: 340,
    height: 50,
    borderRadius: 16,
    fontSize: 13,
    marginTop: 4,
    borderWidth: 2,
    borderColor: '#cecece',
    marginHorizontal: 20,
  },
});
