import EncryptedStorage from 'react-native-encrypted-storage';

export default async function getUser() {
  try {
    const dataUser = await EncryptedStorage.getItem('user');
    if (dataUser !== null) {
      // Congrats! You've just retrieved your first value!
      console.log('Success to get user');
      return JSON.parse(dataUser);
    } else {
      return null;
    }
  } catch (error) {
    // There was an error on the native side
    console.log('User not found', error);
  }
}
