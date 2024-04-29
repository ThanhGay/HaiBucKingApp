import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

import DetailTicket from '@app-components/DetailTicket';
import { Title } from '@/component/Component';
import colors from '@/utils/colors';

interface SuccessProps {
  route: any
}

const Success: React.FC<SuccessProps & { navigation: NavigationProp<any> }> = ({
  navigation, route,
}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.black,
      }}
    >
      <View style={styles.header}>
        <Title
          title="Success"
          rightIcon={
            <Image
              style={{ width: 40, height: 40 }}
              source={require('@assets/icons/tick.png')}
            />
          }
          onPressRight={() => navigation.navigate('Ticket')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DetailTicket ticket={route.params} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  title: { fontSize: 28, fontWeight: '700', color: colors.white },
});

export default Success;
