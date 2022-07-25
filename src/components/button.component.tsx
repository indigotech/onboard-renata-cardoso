import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {StyleSheet} from 'react-native';

type Props = TouchableOpacityProps & {
  text: string;
  loading?: boolean;
};

export const ButtonComponent = ({text, loading, ...rest}: Props) => {
  return (
    <TouchableOpacity style={styles.button} {...rest}>
      {loading && <ActivityIndicator color="#FFFFFF" size="large" />}
      <Text style={styles.textButton}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
