import EncryptedStorage from 'react-native-encrypted-storage';

export default async function setUser(dataUser: any) {
  try {
    await EncryptedStorage.setItem('user', JSON.stringify(dataUser));
    console.log('Success to save data user');

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
    console.log('Error to save :<', error);
  }
}
