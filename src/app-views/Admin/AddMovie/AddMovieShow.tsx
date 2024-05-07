// import colors from '@/utils/colors';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   ScrollView,
// } from 'react-native';
// function AddMovieShow() {
//   const [inputData, setInputData] = useState<
//     { movieId: string; movieName: string }[]
//   >([]);

//   const handleAddInput = () => {
//     setInputData([...inputData, { movieId: '', movieName: '' }]);
//   };

//   const handleInputChange = (text: string, index: number, type: string) => {
//     const newInputs = [...inputData];
//     if (type === 'movieId') {
//       newInputs[index].movieId = text;
//     } else if (type === 'movieName') {
//       newInputs[index].movieName = text;
//     }
//     setInputData(newInputs);
//   };

//   const handleRemoveInput = (index: number) => {
//     const newInputs = [...inputData];
//     newInputs.splice(index, 1);
//     setInputData(newInputs);
//   };
//   const test = () => {
//     const newInputs = [...inputData];

//     console.log(newInputs);
//   };

//   const renderInputs = () => {
//     return inputData.map((item, index) => (
//       <View style={styles.inputContainer} key={index}>
//         <TextInput
//           style={{ ...styles.textInput, flex: 3 }}
//           placeholder={'Movie Id'}
//           placeholderTextColor={colors.grayText}
//           onChangeText={(text) => handleInputChange(text, index, 'movieId')}
//           value={item.movieId}
//         />
//         <TextInput
//           style={{ ...styles.textInput, flex: 5 }}
//           placeholder={'Movie Name'}
//           placeholderTextColor={colors.grayText}
//           onChangeText={(text) => handleInputChange(text, index, 'movieName')}
//           value={item.movieName}
//         />
//         <TouchableOpacity
//           style={{ flex: 1 }}
//           onPress={() => handleRemoveInput(index)}
//         >
//           <Text style={styles.removeButton}>X</Text>
//         </TouchableOpacity>
//       </View>
//     ));
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.textHeader}>MovieShow</Text>
//         <TouchableOpacity style={styles.addButton} onPress={handleAddInput}>
//           <Text style={styles.buttonText}>+</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView keyboardShouldPersistTaps="handled">
//         {renderInputs()}
//       </ScrollView>
//       <TouchableOpacity style={styles.handleSave} onPress={test}>
//         <Text style={styles.handleText}>Save</Text>
//       </TouchableOpacity>
//       <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.black,
//     paddingHorizontal: 20,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textHeader: {
//     fontSize: 32,
//     color: colors.primary,
//     fontWeight: '700',
//   },
//   addButton: {
//     backgroundColor: 'skyblue',
//     padding: 10,
//     borderRadius: 30,
//     height: 50,
//     width: 50,
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   textInput: {
//     borderWidth: 1,
//     borderColor: colors.whiteText,
//     borderRadius: 5,
//     padding: 10,
//     flex: 1,
//     color: colors.whiteText,
//     fontSize: 18,
//   },
//   removeButton: {
//     color: 'red',
//     marginLeft: 10,
//     fontSize: 20,
//   },
//   handleSave: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     backgroundColor: colors.primary,
//     padding: 12,
//     borderRadius: 30,
//   },
//   handleText: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: colors.blackText,
//   },
// });

// export default AddMovieShow;
