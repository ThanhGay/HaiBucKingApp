import EncryptedStorage from "react-native-encrypted-storage";

export default async function getToken(token: any) {
    try {
        const session = await EncryptedStorage.getItem("userToken", token);
        if (session !== undefined) {
            // Congrats! You've just retrieved your first value!
            console.log("Success to get", token);
        }
    } catch (error) {
        // There was an error on the native side
        console.log("Token not found", error);
    }
}