import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import colors from '../config/colors';


export default function MyIndicator({visible, style, size}) {
  if (!visible) {
    return null;
  }
  return (
    <View
      style={[
        styles.container,
        style,
        {opacity: 0.3, backgroundColor: 'black'},
      ]}>
      <ActivityIndicator
        style={{width: 100, height: 100}}
        size={size === '' || size === undefined ? 'large' : size}
        color={colors.purple}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.4,
    height: '100%',
    width: '120%',
    position: 'absolute',
    zIndex: 1,
  },
});
