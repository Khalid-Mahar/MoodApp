import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScreenComponent = ({children, style}) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  ) : (
    <View style={[styles.container, style]}>{children}</View>
  );
};

export default ScreenComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
