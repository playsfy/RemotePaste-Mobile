import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const GlLogo = () => (
  <Image source={require('../assets/gllogo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(GlLogo);
