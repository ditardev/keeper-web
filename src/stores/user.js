import {jwtDecode} from "jwt-decode";
import exceptionHandler from "@/components/app/ex/js/exception-handler.js";
import router from "@/router/index.js";

const USER = "user"
const GUEST = "guest"

const ACCEPT = "application/json"
const SIGNIN_PAGE = "./"

export const saveUserData = (data) => {
    let tokenData = jwtDecode(data.data.token)
    if (tokenData !== undefined) {
        let userData = {
            uuid: tokenData.uuid,
            email: tokenData.sub,
            status: tokenData.status,
            role: tokenData.role,
            token: data.data.token,
            expireAt: tokenData.exp
        }
        localStorage.setItem(USER, JSON.stringify(userData))
        return true
    }
    return false
}

export const getAuthHeader = () => {
    let user = JSON.parse(localStorage.getItem(USER));
    if (!user) {
        cleanUserData()
        router.push(SIGNIN_PAGE)
    }
    return {
        Accept: ACCEPT,
        Authorization: user.token,
        UserId: user.uuid
    };
}

export const getAuthUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}

export const cleanUserData = () => {
    localStorage.removeItem(USER)
}