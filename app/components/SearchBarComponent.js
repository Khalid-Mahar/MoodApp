import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";

const SearchBarComponent = ({ value, onChangeText, placeholder, style }) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedBorderColor = new Animated.Value(0);

  const borderColorInterpolation = animatedBorderColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ddd", "#007bff"],
  });

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedBorderColor, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(animatedBorderColor, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const clearSearch = () => {
    onChangeText("");
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { borderColor: borderColorInterpolation },
        style,
      ]}
    >
      <Image source={require("../assets/search.png")} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        clearButtonMode="while-editing"
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={clearSearch}>
          <Image
            source={require("../assets/close.png")}
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    height: 50,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#888",
  },
  clearIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#888",
  },
});

export default SearchBarComponent;
