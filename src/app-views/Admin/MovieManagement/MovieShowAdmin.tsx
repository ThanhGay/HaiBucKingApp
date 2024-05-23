import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import BottomTabAdmin from '@app-navigation/BottomTabs/BottomTabsAdmin';

import colors from '@/utils/colors';
import { useAppSelector } from '@/redux/hooks';
import { apiAddMovieshow } from '@/api/admin';

function MovieShowAdmin() {
  const { token } = useAppSelector((state) => state.authState);
  const [first, setFirst] = useState(false);

  const [inputData, setInputData] = useState<
    { StartTime: string; Movie_Id: string; Room_Id: string; TypeShow: string }[]
  >([]);

  const handleAddInput = () => {
    setInputData([
      ...inputData,
      { StartTime: '', Movie_Id: '', Room_Id: '', TypeShow: '' },
    ]);
    setFirst(true);
  };

  const handleInputChange = (text: string, index: number, type: string) => {
    const newInputs = [...inputData];
    if (type === 'StartTime') {
      newInputs[index].StartTime = text;
    } else if (type === 'Movie_Id') {
      newInputs[index].Movie_Id = text.toUpperCase();
    } else if (type === 'Room_Id') {
      newInputs[index].Room_Id = text.toUpperCase();
    } else if (type === 'TypeShow') {
      newInputs[index].TypeShow = text.toUpperCase();
    }
    setInputData(newInputs);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs = [...inputData];
    newInputs.splice(index, 1);
    setInputData(newInputs);
    if (newInputs.length == 0) {
      setFirst(false);
    }
  };
  const handleAdd = async () => {
    const newInputs = [...inputData];
    const dataRes = await apiAddMovieshow({ token, data: newInputs });
    if (dataRes.status) {
      console.log(newInputs);
      Alert.alert('Notice', dataRes.msg);
    } else {
      Alert.alert('Notice', dataRes.msg);
    }
    setInputData([]);
  };

  const renderInputs = () => {
    return inputData.map((item, index) => (
      <View key={index}>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
          <View style={{ flex: 5, gap: 12 }}>
            <View style={styles.inputContainer}>
              <TextInput
                style={{ ...styles.textInput, flex: 6 }}
                placeholder={'Start Time'}
                placeholderTextColor={colors.grayText}
                onChangeText={(text) =>
                  handleInputChange(text, index, 'StartTime')
                }
                value={item.StartTime}
              />
              <TextInput
                style={{ ...styles.textInput, flex: 3 }}
                placeholder={'Movie Id'}
                placeholderTextColor={colors.grayText}
                onChangeText={(text) =>
                  handleInputChange(text, index, 'Movie_Id')
                }
                value={item.Movie_Id}
              />
            </View>
            <View style={styles.inputContainer} key={index}>
              <TextInput
                style={{ ...styles.textInput, flex: 1 }}
                placeholder={'Room Id'}
                placeholderTextColor={colors.grayText}
                onChangeText={(text) =>
                  handleInputChange(text, index, 'Room_Id')
                }
                value={item.Room_Id}
              />
              <TextInput
                style={{ ...styles.textInput, flex: 1 }}
                placeholder={'Type Show'}
                placeholderTextColor={colors.grayText}
                onChangeText={(text) =>
                  handleInputChange(text, index, 'TypeShow')
                }
                value={item.TypeShow}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'red',
              borderRadius: 60,
              justifyContent: 'center',
            }}
            onPress={() => handleRemoveInput(index)}
          >
            <Text style={styles.removeButton}>Del</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 3,
            backgroundColor: colors.primary,
            marginTop: 15,
            marginHorizontal: 30,
          }}
        ></View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>MovieShow</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddInput}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView keyboardShouldPersistTaps="handled">
        {renderInputs()}
      </ScrollView>
      {first && (
        <TouchableOpacity style={styles.handleSave} onPress={handleAdd}>
          <Text style={styles.handleText}>Save</Text>
        </TouchableOpacity>
      )}
      <BottomTabAdmin />
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textHeader: {
    fontSize: 32,
    color: colors.primary,
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 30,
    height: 50,
    width: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.whiteText,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    color: colors.whiteText,
    fontSize: 18,
  },
  removeButton: {
    color: colors.black,
    fontSize: 20,
    textAlign: 'center',
  },
  handleSave: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
  },
  handleText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.blackText,
  },
});

export default MovieShowAdmin;
