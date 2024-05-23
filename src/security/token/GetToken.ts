import EncryptedStorage from 'react-native-encrypted-storage';

export default async function getToken() {
  try {
    const session = await EncryptedStorage.getItem('userToken');
    if (session !== null) {
      // Congrats! You've just retrieved your first value!
      console.log('Success to get token');
      return session;
    } else {
      return null;
    }
  } catch (error) {
    // There was an error on the native side
    console.log('Token not found', error);
  }
}
