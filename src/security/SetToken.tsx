import EncryptedStorage from "react-native-encrypted-storage";

export default async function setToken(token: any) {
    try {
        await EncryptedStorage.setItem("userToken",token);
        console.log("Success to save token:", token);
        
        // Congrats! You've just stored your first value!
    } catch (error) {
        // There was an error on the native side
        console.log("Error to save :<", error);
    }
}