import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const InterestTagComponent = ({
  label,
  isSelected,
  onPress,
  hobbies = false,
}) => {
  return (
    <>
      {hobbies ? (
        <TouchableOpacity
          style={[
            styles.tag,
            isSelected
              ? styles.selectedTagHobbies
              : styles.unselectedTagHobbies,
          ]}
          onPress={onPress}>
          <Text
            style={[
              styles.text,
              isSelected
                ? styles.selectedTexHobbies
                : styles.unselectedTextHobbies,
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[
            styles.tag,
            isSelected ? styles.selectedTag : styles.unselectedTag,
          ]}
          onPress={onPress}>
          <Text
            style={[
              styles.text,
              isSelected ? styles.selectedText : styles.unselectedText,
            ]}>
            {label}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#7DDD94',
    flex: 1,
    maxWidth: '28%',
    alignSelf:'center' 
  },
  selectedTag: {
    backgroundColor: '#7DDD94',
    borderColor: '#7DDD94',
  },
  unselectedTag: {
    backgroundColor: '#fff',
    borderColor: '#7DDD94',
  },
  text: {
    fontSize: 14,
  },
  selectedText: {
    color: '#333',
  },
  unselectedText: {
    color: '#7DDD94',
  },
  selectedTagHobbies: {
    backgroundColor: '#FF16B9',
    borderColor: '#FF16B9',
  },
  unselectedTagHobbies: {
    backgroundColor: '#fff',
    borderColor: '#FF16B9',
  },
  selectedTexHobbies: {
    color: 'white',
  },
  unselectedTextHobbies: {
    color: '#FF16B9',
  },
});

export default InterestTagComponent;
