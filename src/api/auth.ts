import axios from "axios";
import { sendPostWithToken } from "@/utils";
import { LOCALHOST, PORT } from "../../port";

export const apiLogin = async (args: { phoneNumber: string, password: string }): Promise<{
    status: boolean;
    data: Array<any>;
    msg: string;
}> => {
    // const form = new FormData();
    // form.append('email', args.email);
    // form.append('password', args.password);

    const form = JSON.stringify({
        PhoneNumber: args.phoneNumber,
        Password: args.password,
    });

    const url = `http://${LOCALHOST}:${PORT}/Account/SignIn`

    const data = await axios.post(url, form, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });

    return data ?? {}
}

export const apiLogout = async (args: { url: string, token: string, data?: any }) => {
    const { url = "https://localhost:3107/api/Auth/logout", token, data } = args
    return sendPostWithToken({ url, token, data })
}

// apiForgotPassword
