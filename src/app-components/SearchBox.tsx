import colors from '@/utils/colors';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function SearchBox({
  type,
  text,
  onChangeText,
  onSubmit,
}: {
  type: 'category' | 'movie' | 'all';
  text: string;
  onChangeText: (str: string) => void;
  onSubmit?: () => void;
}) {
  return (
    <View style={styles.searchbox}>
      <TextInput
        autoComplete="off"
        placeholder="Search..."
        placeholderTextColor="#8C8C8C"
        defaultValue={text}
        style={styles.textInput}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <TouchableOpacity onPress={onSubmit}>
        <Image
          source={require('@assets/icons/search.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    width: '100%',
    gap: 12,
    marginVertical: 12,
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
    width: '85%',
    color: colors.whiteText,
  },
});

export default SearchBox;
