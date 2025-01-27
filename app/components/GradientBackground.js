import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={['#ffffff','#FF16B91A']}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 16,
    // justifyContent: 'center',
  },
});

export default GradientBackground;
