import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import ScreenComponent from '../components/ScreenComponent';
import colors from '../config/colors';

export default function SplashScreen() {
  return (
    <ScreenComponent>
      <View style={[styles.container, {backgroundColor: colors.purple}]}>
        <Image
          source={require('../assets/Splash_Image.png')}
          style={styles.logoStyle}
        />
      </View>
    </ScreenComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoStyle: {
    width: 140,
    height: 100,
    resizeMode: 'contain',
  },
});
