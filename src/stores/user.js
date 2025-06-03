import {jwtDecode} from "jwt-decode";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";

const USER = "user"
const GUEST = "guest"

export const saveUserData = (data) => {
    let tokenData = jwtDecode(data.accessToken)
}
export const cleanUserData = () => {
    localStorage.removeItem(USER)
}