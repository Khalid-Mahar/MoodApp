import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ImagePickerComponent = ({ imageUri, onPickImage }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={onPickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Image source={require('../assets/userPlaceholder.png')} style={styles.image} /> 
          </View>
        )}
        <View style={styles.editIconContainer}>
          <Image source={require('../assets/selectImage.png')} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    // overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode:'cover',
    // alignSelf:'center',
    borderRadius:50
  },
  // placeholder: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  // },
  editIconContainer: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    backgroundColor: '#ff00ff',
    borderRadius: 25,
    padding: 10,
  },
  icon:{
    width:15,
    height:15,
    resizeMode:'contain',
    flex:1,
    alignSelf:'center'
  }
});

export default ImagePickerComponent;
