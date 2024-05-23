import EncryptedStorage from 'react-native-encrypted-storage';

export default async function deleteUser() {
  try {
    const dataUser = await EncryptedStorage.removeItem('user');
    if (dataUser !== null) {
      // Congrats! You've just stored your first value!
      console.log('Success to delete data user');
    }
  } catch (error) {
    // There was an error on the native side
    console.log('Error to delete', error);
  }
}
