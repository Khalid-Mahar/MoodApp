import React from 'react';
import { View, TextInput, StyleSheet,Image } from 'react-native';


const SearchBarComponent = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
<Image source={require('../assets/search.png')} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  icon:{
    width:20,
    height:20,
    resizeMode:'contain'
  }
});

export default SearchBarComponent;
