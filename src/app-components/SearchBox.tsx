import colors from '@/utils/colors';
import { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';

function SearchBox() {
  const [textValue, setTextValue] = useState<string>('');

  const onFinish = () => {
    // Call API search global in here

    console.log(textValue);
  };

  return (
    <View style={styles.searchbox}>
      <Image source={require('@assets/icons/search.png')} style={styles.icon} />
      <TextInput
        autoComplete="off"
        placeholder="Search"
        placeholderTextColor="#8C8C8C"
        defaultValue={textValue}
        style={styles.textInput}
        onChangeText={(newText) => setTextValue(newText)}
        onSubmitEditing={onFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    gap: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.blackOpacity,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textInput: {
    width: '100%',
    color: colors.whiteText,
  },
});

export default SearchBox;
