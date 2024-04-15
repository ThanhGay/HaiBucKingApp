import { sendPostWithToken } from "@/utils";
import axios from "axios";

// ví dụ các api có dạng là
//          "https://localhost:3107/api/Auth/login",
//          "https://localhost:3107/api/Auth/logout",

export const apiLogin = async (args: { email: string, password: string },) => {

    const form = new FormData();
    form.append('email', args.email);
    form.append('password', args.password);

    const url = "https://localhost:3107/api/Auth/login"

    const { data } = await axios.post(url, form);
    return data ?? {}
}

export const apiLogout = async (args: { url: string, token: string, data?: any }) => {
    const { url = "https://localhost:3107/api/Auth/logout", token, data } = args
    return sendPostWithToken({ url, token, data })

}

// apiForgotPassword