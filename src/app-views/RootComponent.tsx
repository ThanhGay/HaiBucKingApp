import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

interface RootProps {
  children?: React.ReactNode;
}

const RootComponent: React.FC<RootProps> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootComponent;
