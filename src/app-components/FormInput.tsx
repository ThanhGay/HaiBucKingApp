import { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from '@/component/styles';

const FormInput = ({ link, title }: { link: string; title: string }) => {
  const [text, setText] = useState('');

  return (
    <View>
      <View style={styles.border}>
        <Text style={{ color: 'white', fontSize: 25 }}>C</Text>
        <TextInput
          placeholder={title}
          placeholderTextColor={'white'}
          style={{
            color: 'white',
            fontSize: 25,
            marginLeft: 20,
            opacity: text ? 1 : 0.5,
          }}
          onChangeText={setText}
          value={text}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
};

export default FormInput;
