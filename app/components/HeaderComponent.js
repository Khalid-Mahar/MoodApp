import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const HeaderComponent = ({title, onPress, style}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <Image
          source={require('../assets/back.png')}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 25,
    height: 20,
    resizeMode: 'contain',
    marginTop: 28,
  },
  backText: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
  },
});

export default HeaderComponent;
