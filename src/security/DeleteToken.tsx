import EncryptedStorage from "react-native-encrypted-storage";

export default async function deleteToken(token: any) {
    try {
        const session = await EncryptedStorage.removeItem("userToken", token);
        if (session !== undefined) {
            // Congrats! You've just stored your first value!
            console.log("Success to delete token:", token);
        }
    } catch (error) {
        // There was an error on the native side
        console.log("Error to delete", error);
    }
}