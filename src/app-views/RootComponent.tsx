import React from 'react';
import { StyleSheet, View } from 'react-native';
import StoreProvider from './StoreProvider';
import LayoutState from '@/layouts/LayoutState';

interface RootProps {
  children?: React.ReactNode;
}

const RootComponent: React.FC<RootProps> = ({ children }) => {
  return (
    <StoreProvider>
      <LayoutState>
        <View style={styles.container}>{children}</View>
      </LayoutState>
    </StoreProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RootComponent;
